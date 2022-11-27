const logger = {};

logger.log = (text) => {
  console.log(text);
};

logger.logHeader = (req) => {
  let name;
  console.log('--- headers ---');
  for (name in req.headers) console.log(`${name}:`, req.headers[name]);
  console.log('--- params ---');
  for (name in req.params) console.log(`${name}:`, req.params[name]);
  console.log('--- body ---');
  for (name in req.body) console.log(`${name}:`, req.body[name]);
};

// export module
module.exports = logger;
