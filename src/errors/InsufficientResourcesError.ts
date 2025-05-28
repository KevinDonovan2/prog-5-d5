import { MachineError } from './MachineError';

export class InsufficientResourcesError extends MachineError {
  constructor(resource: string) {
    super(`Ressource insuffisante: ${resource}`);
    this.name = 'InsufficientResourcesError';
  }
}
