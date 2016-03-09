const express = require('express');

var router = express.Router();

router.get('/urlpattern', function (req, res) {
  // Get stuff off req if necessary.  Often for simulators we just send a canned response

  // Could vary the timeout using random function
  var timeout = 2000;
  var jsonResponse = {
    tag: 'hello'
  };
  setTimeout(function () {
    res.status(200).send(jsonResponse);
  }, timeout);
});

router.get('/another/urlpattern', function (req, res) {
  var timeout = 1000;
  var jsonResponse = {
    tag: 'world'
  };
  setTimeout(function () {
    res.status(200).send(jsonResponse);
  }, timeout);
});

module.exports = router;