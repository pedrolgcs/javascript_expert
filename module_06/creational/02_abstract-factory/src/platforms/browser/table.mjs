import ITableComponent from '../../shared/interface/ITableComponent.mjs';

export default class TableBrowserComponent extends ITableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML('afterbegin', template);
  }

  prepareData(data) {
    const [firstItem] = data;

    const tHeaders = Object.keys(firstItem).map((text) => {
      return `<th scope=col>${text}</th>`;
    });

    const tBody = data
      .map((values) => Object.values(values))
      .map((row) => row.map((item) => `<td>${item}</td>`))
      .map((tds) => `<tr>${tds.join('')}</tr>`);

    const template = `
      <div style="max-width: 1250px; margin: 0 auto;">
        <table class="table">
          <thead>
            <tr>
              ${tHeaders.join('')}
            </tr>
          </thead>
          <tbody>
            ${tBody.join('')}
          </tbody>
        </table>
      </div>
    `;

    return template;
  }
}
