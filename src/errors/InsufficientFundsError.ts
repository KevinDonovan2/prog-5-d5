import { MachineError } from './MachineError';

export class InsufficientFundsError extends MachineError {
  constructor(required: number, provided: number) {
    super(`Paiement insuffisant: besoin de ${required}, fourni ${provided}`);
    this.name = 'InsufficientFundsError';
  }
}
