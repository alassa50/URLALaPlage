const express = require('express');

const router = express.Router();
const logger = require('./utils/logger');
const Memdb = require('./utils/mem-db');

const pathToFile = './data/db.db';
const memDB = new Memdb(pathToFile);

//  la version post
router.post('/short', async (req, res) => {
  logger.logHeader(req);
  const { url } = req.body;
  const compressed = memDB.insert({ id: 1, url });
  memDB.save(pathToFile);

  try {
    res.status(200).json({
      data: compressed,
      test: 'memoryData',
    });
  } catch (err) {
    res.status(400).json({
      message: 'Some error occured',
      err,
    });
  }
});

// la pas short ^^
router.post('/passhort', async (req, res) => {
  logger.logHeader(req);

  const { url } = req.body;
  logger.log(`xxx url :${url}`);

  const decompressed = memDB.select({ where: { memDBID: url } });
  logger.log(`xxx decompressed :${decompressed[0].url}`);
  try {
    res.status(200).json({
      data: decompressed[0].url,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Some error occured',
      err,
    });
  }
});

module.exports = router;
