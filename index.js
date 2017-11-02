const express = require("express")
const app = express()
const puppeteer = require('puppeteer');

app.get("/", function (req, res) {
  console.log("req", req.query);
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.goto('https://example.com');
    await page.goto(req.query.url);
    await page.screenshot({path: './public/example.png'});
    await browser.close();
  })();

  res.send("taking screenshot")
});

app.get('/file/:name', function (req, res, next) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.listen(3303, function () {
  console.log("Example app listening on port 3303!")
})
