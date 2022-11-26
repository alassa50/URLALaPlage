const express = require("express");
const router = express.Router();

// attention nécessite d'encoder l'url encodeURI
// http://localhost:3001/youpi/passhort/alexandreyoupi
// devient
// http%3A%2F%2Flocalhost%3A3001%2Fyoupi%2Fpasshort%2Falexandreyoupi
router.get("/short/:url", async (req, res) => {

  // Des logs pour comprendre ce que nous avons en reception
  console.log("--- headers");
  for (var name in req.headers)
  console.log(name + ':', req.headers[name]);
  console.log("--- params");
  for (var name in req.params)
  console.log(name + ':', req.params[name]);

  let { url } = req.params;
  try {
    res.status(200).json({
      data: url + "youpi"
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

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

  try {
    res.status(200).json({
      data: url + "youpi"
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

// la pas short ^^
router.get("/passhort/:url", async (req, res) => {
  for (var name in req.headers)
  console.log(name + ':', req.headers[name]);
  console.log("--- params");
  for (var name in req.params)
  console.log(name + ':', req.params[name]);

  let { url } = req.params;
  try {
    let url2 = url.replace("youpi","youpa");
    res.status(200).json({
      data: url2
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;