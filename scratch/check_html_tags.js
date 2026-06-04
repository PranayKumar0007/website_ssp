const fs = require('fs');
const htmlparser = require('htmlparser2');

const html = fs.readFileSync('index.html', 'utf8');

const parser = new htmlparser.Parser({
  onopentag(name, attribs) {
    // console.log(`Open: ${name}`);
  },
  onclosetag(name) {
    // console.log(`Close: ${name}`);
  },
  onerror(err) {
    console.error('Parser Error:', err);
  }
}, { decodeEntities: true });

parser.write(html);
parser.end();
console.log('Parsed successfully!');
