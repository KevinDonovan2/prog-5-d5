export class MachineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MachineError';
  }
}