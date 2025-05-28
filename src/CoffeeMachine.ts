import { InsufficientFundsError } from './errors/InsufficientFundsError';
import { InsufficientResourcesError } from './errors/InsufficientResourcesError';
import { InvalidStateError } from './errors/InvalidStateError';

type State = 'off' | 'ready' | 'brewing' | 'error';

type CoffeeType = 'espresso' | 'americano' | 'latte';

interface CoffeeConfig {
  price: number;
  waterNeeded: number;
  beansNeeded: number;
  minTemperature: number;
}

const COFFEE_MENU: Record<CoffeeType, CoffeeConfig> = {
  espresso: {
    price: 1.5,
    waterNeeded: 0.05,
    beansNeeded: 10,
    minTemperature: 90,
  },
  americano: {
    price: 2.0,
    waterNeeded: 0.15,
    beansNeeded: 10,
    minTemperature: 90,
  },
  latte: { price: 2.5, waterNeeded: 0.1, beansNeeded: 15, minTemperature: 90 },
};

export class CoffeeMachine {
  private waterTank = 1.0; // litres
  private beanContainer = 100; // grammes
  private coffeeContainer = 0.0; // litres
  private temperature = 25; // °C
  private state: State = 'off';
  private balance = 0;

  constructor(private readonly coffeeMenu = COFFEE_MENU) {}

  turnOn() {
    if (this.state !== 'off') throw new InvalidStateError(['off'], this.state);
    this.state = 'ready';
    console.log('Machine prête.');
  }

  turnOff() {
    if (this.state === 'brewing')
      throw new InvalidStateError(['ready', 'error'], this.state);
    this.state = 'off';
    console.log('Machine éteinte.');
  }

  addWater(amount: number) {
    this.waterTank += amount;
    console.log(`Ajouté ${amount}L d'eau.`);
  }

  addBeans(amount: number) {
    this.beanContainer += amount;
    console.log(`Ajouté ${amount}g de grains.`);
  }

  pay(amount: number) {
    this.balance += amount;
    console.log(`Solde actuel : ${this.balance}`);
  }

  chooseCoffee(type: CoffeeType) {
    if (this.state !== 'ready')
      throw new InvalidStateError(['ready'], this.state);

    const config = this.coffeeMenu[type];
    this.checkResources(config);
    this.state = 'brewing';

    this.grindBeans(config.beansNeeded);
    this.heatWater(config.minTemperature);
    this.brew(config.waterNeeded);
    this.serve();

    this.state = 'ready';
    this.balance -= config.price;
  }

  private checkResources(config: CoffeeConfig) {
    if (this.balance < config.price)
      throw new InsufficientFundsError(config.price, this.balance);
    if (this.waterTank < config.waterNeeded)
      throw new InsufficientResourcesError('eau');
    if (this.beanContainer < config.beansNeeded)
      throw new InsufficientResourcesError('grains');
    if (this.temperature < config.minTemperature)
      throw new InsufficientResourcesError('température');
  }

  private grindBeans(amount: number) {
    this.beanContainer -= amount;
    console.log('Mouture des grains...');
  }

  private heatWater(target: number) {
    this.temperature = target;
    console.log(`Chauffage de l'eau à ${target}°C...`);
  }

  private brew(waterAmount: number) {
    this.waterTank -= waterAmount;
    this.coffeeContainer += waterAmount;
    console.log('Préparation en cours...');
  }

  private serve() {
    console.log('Service du café.');
    this.coffeeContainer = 0;
  }

  clean() {
    this.coffeeContainer = 0;
    console.log('Nettoyage effectué.');
  }
}
