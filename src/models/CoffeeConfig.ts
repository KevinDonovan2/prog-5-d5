export interface CoffeeConfig {
  price: number;
  waterNeeded: number;
  beansNeeded: number;
  minTemperature: number;
}

export const COFFEE_MENU: Record<string, CoffeeConfig> = {
  espresso: { price: 1.5, waterNeeded: 0.05, beansNeeded: 10, minTemperature: 90 },
  americano: { price: 2.0, waterNeeded: 0.15, beansNeeded: 10, minTemperature: 90 },
  latte: { price: 2.5, waterNeeded: 0.1, beansNeeded: 15, minTemperature: 90 },
};
