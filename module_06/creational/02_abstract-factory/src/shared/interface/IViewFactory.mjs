import NotImplementedException from '../errors/NotImplementedException.mjs';

export default class IViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name);
  }
}
