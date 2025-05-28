import { MachineError } from './MachineError';

export class InvalidStateError extends MachineError {
  constructor(expected: string[], current: string) {
    super(`État invalide: attendu ${expected.join(', ')}, mais en '${current}'`);
    this.name = 'InvalidStateError';
  }
}