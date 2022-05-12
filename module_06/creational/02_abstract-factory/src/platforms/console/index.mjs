import IViewFactory from '../../shared/interface/IViewFactory.mjs';
import TableConsoleComponent from './table.mjs';

export default class ConsoleFactory extends IViewFactory {
  createTable() {
    return new TableConsoleComponent();
  }
}
