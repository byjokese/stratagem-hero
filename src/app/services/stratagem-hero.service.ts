import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { Queue } from '../shared/queue';
import { IStratagem, Stratagem, StratagemType, isStratagemEqual } from '../models/stratagem.model';
import { KeyboardKeys } from '../utils/keys';
import { Stratagems } from '../data/stratagems';

export type GamePhase = 'start' | 'game' | 'end';

@Injectable({
  providedIn: 'root',
})
export class StratagemHeroService {
  private readonly INITIAL_TIME_TO_COMPLETE = 20000;
  private readonly ACTION_DELAY = 500;
  private readonly BASE_NUMBER_OF_STRATAGEMS = 7;

  /* -------------------------------- Resources ------------------------------- */
  private gameOverAudio = new Audio('assets/sounds/game-over.mp3');
  private gameStartAudio = new Audio('assets/sounds/game-start.mp3');
  private gameButtonAudio = new Audio('assets/sounds/key-press.mp3');
  private gameButtonFailAudio = new Audio('assets/sounds/key-press-fail.mp3');
  private timerInterval: NodeJS.Timeout | undefined;

  /* ------------------------------ Game Signals ------------------------------ */
  private stratagemQueueSignal: WritableSignal<Queue<IStratagem>> = signal(new Queue<IStratagem>(), {
    equal: (a: Queue<IStratagem>, b: Queue<IStratagem>) => a.size() === b.size(),
  });
  private currentStratagemSignal: WritableSignal<StratagemType> = signal(null, {
    equal: isStratagemEqual,
  });
  private currentTimeToComplete: WritableSignal<number> = signal(this.INITIAL_TIME_TO_COMPLETE);
  private timer: WritableSignal<number> = signal(this.currentTimeToComplete());

  private gamePhaseSignals: WritableSignal<GamePhase> = signal('start');
  private gameScoreSignal: WritableSignal<number> = signal(0);
  private gameRoundSignal: WritableSignal<number> = signal(0);
  private wrongKeySignal: WritableSignal<boolean> = signal(false);

  /* ----------------------------- Public Signals ----------------------------- */
  readonly stratagemQueue = this.stratagemQueueSignal.asReadonly();
  readonly currentStratagem = this.currentStratagemSignal.asReadonly();
  readonly timeLeft = this.timer.asReadonly();
  readonly currentMaxTime = this.currentTimeToComplete.asReadonly();
  readonly gamePhase = this.gamePhaseSignals.asReadonly();
  readonly gameScore = this.gameScoreSignal.asReadonly();
  readonly gameRound = this.gameRoundSignal.asReadonly();
  readonly warnTime = computed(() => this.timer() / this.currentTimeToComplete() < 0.33);
  readonly wrongKey = this.wrongKeySignal.asReadonly();

  constructor() {
    this.gameOverAudio.load();
    this.gameStartAudio.load();
    this.gameButtonAudio.load();
    this.gameButtonFailAudio.load();
  }

  /**
   * Start the game, timer, scores, and stratagems
   */
  public startGame() {
    this.gameStartAudio.play();
    setTimeout(() => {
      this.gamePhaseSignals.set('game');
      this.gameScoreSignal.set(0);
      this.gameRoundSignal.set(0);
      this.stratagemQueueSignal.set(new Queue<IStratagem>());
      this.currentStratagemSignal.set(null);
      clearInterval(this.timerInterval);
      this.newRound();
      this.resetTimer();
    }, this.ACTION_DELAY);
  }

  /**
   * Reset the game to the initial state
   */
  public resetGame(): void {
    setTimeout(() => {
      this.gamePhaseSignals.set('start');
      this.gameScoreSignal.set(0);
      this.currentStratagemSignal.set(null);
      this.timer.set(this.INITIAL_TIME_TO_COMPLETE);
    }, this.ACTION_DELAY);
  }

  /**
   * Notify the service that a key was pressed
   * @param event KeyboardEvent
   */
  public onKey(event: KeyboardEvent): void {
    const currentKey = this.currentStratagemSignal()?.keyQueue.peek();
    if (!currentKey) return;
    const currentKeyQueueSize = this.currentStratagemSignal()?.keyQueue.size();
    const keySuccess = KeyboardKeys[currentKey.key].includes(event.key);
    if (keySuccess) {
      /* -------------------------- Press the correct key ------------------------- */
      this.gameButtonAudio.play();
      this.currentStratagemSignal.update((stratagem) => {
        const completedKey = stratagem?.keyQueue.dequeue();
        const keyToComplete = stratagem?.keys.find((key) => key.guid === completedKey?.guid && !key.completed);
        if (keyToComplete) {
          keyToComplete.completed = true;
        }
        return stratagem;
      });
    } else {
      /* ---------------------- Fail to press the correct key --------------------- */
      this.gameButtonFailAudio.play();
      this.wrongKeySignal.set(true);
      setTimeout(() => {
        this.wrongKeySignal.set(false);
        this.currentStratagemSignal.update((stratagem) => {
          stratagem?.reset();
          return stratagem;
        });
      }, this.ACTION_DELAY);
    }
    /* --------------------------- Stratagem Complete? -------------------------- */
    if (currentKeyQueueSize === 1 && keySuccess) {
      this.gameScoreSignal.update((score) => score + 10);
      // this.timer.update((time) => time + 1000);
      this.nextStratagem();
    }
  }

  private newRound() {
    const queue = new Queue<IStratagem>();
    const numberOfStratagems = this.BASE_NUMBER_OF_STRATAGEMS + this.gameRoundSignal();
    Array.from({ length: numberOfStratagems }, () => Math.floor(Math.random() * Stratagems.length)).forEach((index) => queue.enqueue(Stratagems[index]));
    this.stratagemQueueSignal.set(queue);
    this.nextStratagem();
    this.resetTimer();
  }

  private gameOver() {
    this.gameOverAudio.play();
    setTimeout(() => {
      this.gamePhaseSignals.set('end');
    }, this.ACTION_DELAY);
  }

  private nextStratagem() {
    // If the queue is not empty, get the next stratagem
    if (!this.stratagemQueueSignal().isEmpty()) {
      this.stratagemQueueSignal.update((queue) => {
        const nextStratagem = queue.dequeue() ?? null;
        this.currentStratagemSignal.set(new Stratagem(nextStratagem?.name ?? '', nextStratagem?.keys.map((key) => key.key) ?? [], nextStratagem?.image ?? ''));
        return queue;
      });
    } else {
      // Start new round
      this.gameRoundSignal.update((round) => round + 1);
      this.newRound();
    }
  }

  private resetTimer() {
    // Start the timer
    this.timer.set(this.currentTimeToComplete());
    clearInterval(this.timerInterval);
    // Every 10ms decrement the timer (HTML5 ensures 4ms accuracy for setTimeout, exceot for nested that can be 10ms)
    this.timerInterval = setInterval(() => {
      this.timer.update((time) => {
        if (time < 10) {
          clearInterval(this.timerInterval);
          this.gameOver();
        }
        return time - 10;
      });
    }, 10);
  }
}
