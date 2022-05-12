import NotImplementedException from '../errors/NotImplementedException.mjs';

export default class ITableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name);
  }
}
