/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname', // --ignore
      translateTime: 'SYS:standard',
    },
  },
});

logger.logHeaderPino = (req) => {
  let name;
  logger.info('--- headers ---');
  for (name in req.headers) {
    logger.info({
      name: req.headers[name],
    }, name);
  }
  logger.info('--- params ---');
  for (name in req.params) {
    logger.info({
      name: req.params[name],
    }, name);
  }
  logger.info('--- body ---');
  for (name in req.body) {
    logger.info({
      name: req.body[name],
    }, name);
  }
};

logger.logHeaderAlpha = (req) => {
  let name;
  console.log('--- headers ---');
  for (name in req.headers) console.log(`${name}:`, req.headers[name]);
  console.log('--- params ---');
  for (name in req.params) console.log(`${name}:`, req.params[name]);
  console.log('--- body ---');
  for (name in req.body) console.log(`${name}:`, req.body[name]);
};

logger.logHeader = (req) => {
  logger.logHeaderAlpha(req);
  logger.logHeaderPino(req);
};

// export module
module.exports = logger;
