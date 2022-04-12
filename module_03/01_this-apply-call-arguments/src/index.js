'use strict';

const {
  watch,
  promises: { readFile },
} = require('fs');
const path = require('path');

class File {
  formatPath(filename) {
    return path.join(__dirname, filename);
  }

  async showContent(filename) {
    const filePath = this.formatPath(filename);

    console.log((await readFile(filePath)).toString());
  }

  watch(event, filename) {
    this.showContent(filename);
  }
}

const file = new File();

// using arrow function
watch(__filename, (event, filename) => file.watch(event, filename));

// using bind
watch(__filename, file.watch.bind(file));

// call
file.watch.call(
  { showContent: () => console.log('call: hey sinon') },
  null,
  __filename
);

// apply
file.watch.apply({ showContent: () => console.log('apply: hey sinon') }, [
  null,
  __filename,
]);
