const Application = require('billy');
const configFiles = require('./config');
const strToArr = require('utils').strToArr;

const stack = new Application();
stack.registerInstance('stack', stack);
stack.registerInstance('stackConfig', configFiles);

try {

  const services = [
    ...strToArr(configFiles.CORE_SERVICES),
    ...strToArr(configFiles.SERVICES)
  ];

  for (let svc of services) {
    stack.service(require(`./services/${svc}`));
  }

  stack.start();
}
catch (err) {
  console.error('Stack boot failure!', err);
  process.exit(1);
}
