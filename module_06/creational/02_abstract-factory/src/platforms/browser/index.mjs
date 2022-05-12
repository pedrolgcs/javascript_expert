import IViewFactory from '../../shared/interface/IViewFactory.mjs';
import TableBrowserComponent from './table.mjs';

export default class BrowserFactory extends IViewFactory {
  createTable() {
    return new TableBrowserComponent();
  }
}
