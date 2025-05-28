import { CoffeeMachine } from './models/CoffeeMachine';
import { CoffeeMachineService } from './services/CoffeeMachineService';

const machine = new CoffeeMachine();
const service = new CoffeeMachineService(machine);

try {
  service.turnOn();
  service.addWater(0.5);
  service.addBeans(50);
  service.pay(5);
  service.chooseCoffee('espresso');
  service.turnOff();
} catch (err) {
  if (err instanceof Error) {
    console.error('Erreur:', err.message);
  } else {
    console.error('Erreur inconnue');
  }
}
