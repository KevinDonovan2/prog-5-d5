import { CoffeeMachine } from '../models/CoffeeMachine';
import { CoffeeType } from '../models/CoffeeType';
import { COFFEE_MENU, CoffeeConfig } from '../models/CoffeeConfig';

import { InsufficientFundsError } from '../errors/InsufficientFundsError';
import { InsufficientResourcesError } from '../errors/InsufficientResourcesError';
import { InvalidStateError } from '../errors/InvalidStateError';

export class CoffeeMachineService {
  constructor(private machine: CoffeeMachine) {}

  turnOn() {
    if (this.machine.state !== 'off') throw new InvalidStateError(['off'], this.machine.state);
    this.machine.state = 'ready';
    console.log('Machine prête.');
  }

  turnOff() {
    if (this.machine.state === 'brewing') throw new InvalidStateError(['ready', 'error'], this.machine.state);
    this.machine.state = 'off';
    console.log('Machine éteinte.');
  }

  addWater(amount: number) {
    this.machine.waterTank += amount;
    console.log(`Ajouté ${amount}L d'eau.`);
  }

  addBeans(amount: number) {
    this.machine.beanContainer += amount;
    console.log(`Ajouté ${amount}g de grains.`);
  }

  pay(amount: number) {
    this.machine.balance += amount;
    console.log(`Solde actuel : ${this.machine.balance}`);
  }

  chooseCoffee(type: CoffeeType) {
    if (this.machine.state !== 'ready') throw new InvalidStateError(['ready'], this.machine.state);

    const config = COFFEE_MENU[type];
    this.checkResources(config);

    this.machine.state = 'brewing';

    this.grindBeans(config.beansNeeded);
    this.heatWater(config.minTemperature);
    this.brew(config.waterNeeded);
    this.serve();

    this.machine.state = 'ready';
    this.machine.balance -= config.price;
  }

  private checkResources(config: CoffeeConfig) {
    if (this.machine.balance < config.price)
      throw new InsufficientFundsError(config.price, this.machine.balance);

    if (this.machine.waterTank < config.waterNeeded) throw new InsufficientResourcesError('eau');

    if (this.machine.beanContainer < config.beansNeeded) throw new InsufficientResourcesError('grains');

    if (this.machine.temperature < config.minTemperature) throw new InsufficientResourcesError('température');
  }

  private grindBeans(amount: number) {
    this.machine.beanContainer -= amount;
    console.log('Mouture des grains...');
  }

  private heatWater(target: number) {
    this.machine.temperature = target;
    console.log(`Chauffage de l'eau à ${target}°C...`);
  }

  private brew(waterAmount: number) {
    this.machine.waterTank -= waterAmount;
    this.machine.coffeeContainer += waterAmount;
    console.log('Préparation en cours...');
  }

  private serve() {
    console.log('Service du café.');
    this.machine.coffeeContainer = 0;
  }

  clean() {
    this.machine.coffeeContainer = 0;
    console.log('Nettoyage effectué.');
  }
}
