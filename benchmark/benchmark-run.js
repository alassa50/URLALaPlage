const autocannon = require('autocannon');

function startBenchGet(path) {
  const url = 'http://localhost:3001';

  const numConnections = 1000;
  const maxConnectionRequests = 1000;

  function finishedBench(err, res) {
    // console.log('Finished Bench', err, res);
  }

  const instance = autocannon(
    {
      url,
      connections: numConnections,
      duration: 10,
      maxConnectionRequests,
      headers: {
        'content-type': 'application/json',
      },
      requests: [
        {
          method: 'GET',
          path,
        },
      ],
    },
    finishedBench,
  );

  autocannon.track(instance);
}

// startBenchGet('/youpi/short/alexandre');
// startBenchGet('/youpi/passhort/alexandreyoupiohoh');

function startBenchPost() {
  const url = 'http://localhost:3001';

  const numConnections = 1000;
  const maxConnectionRequests = 1000;

  function finishedBench(err, res) {
    // console.log('Finished Bench', err, res);
  }

  const instance = autocannon(
    {
      url,
      connections: numConnections,
      duration: 10,
      maxConnectionRequests,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: 'http://localhost:3001/youpi/short/',
        created_at: '{{createdAt}}',
        modified_by: '{{modifiedBy}}',
      }),
    },
    finishedBench,
  );

  autocannon.track(instance);
}

startBenchGet('/youpi/short/alexandre');
startBenchGet('/youpi/passhort/alexandreyoupiohoh');
startBenchPost();
