export type State = 'off' | 'ready' | 'brewing' | 'error';

export class CoffeeMachine {
  waterTank: number = 1.0; // litres
  beanContainer: number = 100; // grammes
  coffeeContainer: number = 0; // litres
  temperature: number = 25; // °C
  state: State = 'off';
  balance: number = 0;

  constructor() {}
}
