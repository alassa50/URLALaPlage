const express = require("express");
const router = express.Router();
var jsscompress = require("js-string-compression");
var hm = new jsscompress.Hauffman();
const zlib = require("zlib");

//  la version post
router.post("/short", async (req, res) => {
  
  console.log("--- headers");
  for (var name in req.headers)
  console.log(name + ':', req.headers[name]);
  console.log("--- body");
  for (var name in req.body)
  console.log(name + ':', req.body[name]);
  
  let url = req.body.url;
  console.log("url :", url);
  var compressed = hm.compress(url);

  try {
    res.status(200).json({
      data: compressed
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

//  la version post
router.post("/short2", async (req, res) => {
  
  console.log("--- headers");
  for (var name in req.headers)
  console.log(name + ':', req.headers[name]);
  console.log("--- body");
  for (var name in req.body)
  console.log(name + ':', req.body[name]);
  
  let url = req.body.url;
  console.log("url :", url);
  var compressed = zlib.gzipSync(url).toString('hex');

  try {
    res.status(200).json({
      data: compressed
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

// la pas short ^^
router.post("/passhort", async (req, res) => {
  
  console.log("--- headers");
  for (var name in req.headers)
  console.log(name + ':', req.headers[name]);
  console.log("--- body");
  for (var name in req.body)
  console.log(name + ':', req.body[name]);
  
  let url = req.body.url;
  console.log("url :", url);
  var decompressed = hm.decompress(url);

  try {
    res.status(200).json({
      data: decompressed
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post("/passhort2", async (req, res) => {
  
  console.log("--- headers");
  for (var name in req.headers)
  console.log(name + ':', req.headers[name]);
  console.log("--- body");
  for (var name in req.body)
  console.log(name + ':', req.body[name]);
  
  let url = req.body.url;
  console.log("url :", url);
  var decompressed = zlib.gunzipSync(new Buffer.from(url, 'hex')).toString();

  try {
    res.status(200).json({
      data: decompressed
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;