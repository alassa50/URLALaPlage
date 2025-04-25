const autocannon = require('autocannon');
const fs = require('fs');
const logger = require('../src/utils/logger');

const RESULT_PATH = './result_autocannon.csv';
fs.writeFileSync(RESULT_PATH, '');

function constructPayload() {
  return {
    url: 'http://localhost:3001/youpi/short/',
    created_at: '2022-12-27T19:07:53.585Z',
    modified_by: 'alexandre',
  };
}

/**
 * Construct an AutoCannon instance.
 * Play around with the 'amount' and 'overallRate' values.
 *
 * @param {string} title  The string title of this instance
 * @param {string} url    The string target URL for this instance
 */
function constructAutoCannonInstance(title, url) {
  return autocannon(
    {
      title,
      url,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        data: constructPayload(),
      }),
      connections: 10, // ITU-T suggests using 10 gateways (concurrent connection)
      pipelining: 1, // default
      bailout: 10000, // tolerable number of errors
      // overallRate: 6000, // rate of requests to make per second from all connections
      amount: 1500, // ITU-T suggests 15,000,000 IoT requests per day
      duration: 1,
    },
    (err, res) => {
      if (err) {
        logger.error(`Error in AutoCannon instance: ${err.message}`);
      } else {
        logger.info(`AutoCannon instance completed: ${JSON.stringify(res)}`);
      }
    },
  );
}

function startBench(path) {
  const instance = constructAutoCannonInstance('yoyo', path);

  autocannon.track(instance, {
    renderProgressBar: true,
    renderResultsTable: true,
    renderLatencyTable: false,
    progressBarString:
      'Running :percent | Elapsed :elapsed (seconds) | Rate :rate | ETA :eta (seconds)',
  });

  instance.on('tick', (counter) => {
    if (counter.counter === 0) {
      logger.warn(`${instance.opts.title} WARN! requests possibly is not being processed`);
    }
  });

  instance.on('done', (results) => {
    logger.info(`${instance.opts.title} Results:`);
    logger.info(`Avg Tput (Req/sec): ${results.requests.average}`);
    logger.info(`Avg Lat (ms): ${results.latency.average}`);

    const row = `${instance.opts.title},${results.requests.average},${results.latency.average}\r\n`;
    fs.appendFileSync(RESULT_PATH, row);
    logger.info(`AutoCannon throughput result is saved at ${RESULT_PATH}`);
  });

  // this is used to kill the instance on CTRL-C
  process.on('SIGINT', () => {
    logger.info('\nGracefully shutting down from SIGINT (Ctrl-C)');

    instance.stop();
  });
}

// function startBenchGet(path) {
//   const url = 'http://localhost:3001';

//   const numConnections = 1000;
//   const maxConnectionRequests = 1000;

//   function finishedBench(err, res) {
//     // console.log('Finished Bench', err, res);
//   }

//   const instance = autocannon(
//     {
//       url,
//       connections: numConnections,
//       duration: 10,
//       maxConnectionRequests,
//       headers: {
//         'content-type': 'application/json',
//       },
//       requests: [
//         {
//           method: 'GET',
//           path,
//         },
//       ],
//     },
//     finishedBench,
//   );

//   autocannon.track(instance);
// }

// startBenchGet('/youpi/short/alexandre');
// startBenchGet('/youpi/passhort/alexandreyoupiohoh');

startBench('http://localhost:3001/youpi/short/');
