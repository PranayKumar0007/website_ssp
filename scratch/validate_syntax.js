const fs = require('fs');
const vm = require('vm');

const htmlContent = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = scriptRegex.exec(htmlContent)) !== null) {
  const scriptContent = match[1];
  count++;
  try {
    // We mock DOM globals to test compilation of DOM-bound script
    const sandbox = {
      document: {
        addEventListener: () => {},
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
      },
      window: {
        addEventListener: () => {},
      },
      sessionStorage: {
        getItem: () => null,
        setItem: () => {},
      },
      setTimeout: () => {},
      console: console,
    };
    vm.createContext(sandbox);
    vm.runInContext(scriptContent, sandbox);
    console.log(`Script block ${count} compiled successfully without syntax errors!`);
  } catch (err) {
    console.error(`Syntax error in script block ${count}:`, err.message);
    process.exit(1);
  }
}

if (count === 0) {
  console.log('No script blocks found inside index.html');
  process.exit(1);
}
