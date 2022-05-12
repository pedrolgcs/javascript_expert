export default class NotImplementedException extends Error {
  constructor(message) {
    super(`the ${message} is not implemented`);
    this.name = 'NotImplementedException';
  }
}
