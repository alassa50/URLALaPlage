const express = require('express');

const router = express.Router();
const jsscompress = require('js-string-compression');

const hm = new jsscompress.Hauffman();
const zlib = require('zlib');
const logger = require('./utils/logger');

//  la version post
router.post('/short', async (req, res) => {
  logger.logHeader(req);

  const { url } = req.body;
  logger.log('url :', url);
  const compressed = hm.compress(url);

  try {
    res.status(200).json({
      data: compressed,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Some error occured',
      err,
    });
  }
});

//  la version post
router.post('/short2', async (req, res) => {
  logger.logHeader(req);

  const { url } = req.body;
  logger.log('url :', url);
  const compressed = zlib.gzipSync(url).toString('hex');

  try {
    res.status(200).json({
      data: compressed,
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
  logger.log('url :', url);
  const decompressed = hm.decompress(url);

  try {
    res.status(200).json({
      data: decompressed,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Some error occured',
      err,
    });
  }
});

router.post('/passhort2', async (req, res) => {
  logger.logHeader(req);

  const { url } = req.body;
  logger.log('url :', url);
  const decompressed = zlib.gunzipSync(new Buffer.from(url, 'hex')).toString();

  try {
    res.status(200).json({
      data: decompressed,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Some error occured',
      err,
    });
  }
});

module.exports = router;
