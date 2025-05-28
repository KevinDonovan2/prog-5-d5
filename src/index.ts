import { CoffeeMachine } from './CoffeeMachine';

const machine = new CoffeeMachine();

try {
  machine.turnOn();
  machine.addWater(0.5);
  machine.addBeans(50);
  machine.pay(5);
  machine.chooseCoffee('espresso');
  machine.turnOff();
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(err);
  }
}