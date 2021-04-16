const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  fs = require("fs");

  const sendErrorResponse = res => {
    res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text/html"
  });
  res.write("<h1>File not Found!</h1>");
};

  http.createServer((req, res) => {
    let url = req.url;
    if (url.indexOf(".html") !== -1){
      res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
    costumReadFile(`./views${url}`, res);
  } else if (url.indexOf(".js") !== -1){
    res.writeHead(httpStatus.OK, {
    "Content-Type": "text/javascript"
    });
    costumReadFile(`./public/js${url}`, res);
  } else if (url.indexOf(".css") !== -1){
    res.writeHead(httpStatus.OK, {
    "Content-Type": "text/css"
    });
    costumReadFile(`./public/css${url}`, res);
  } else if (url.indexOf(".png") !== -1){
    res.writeHead(httpStatus.OK, {
    "Content-Type": "image/png"
    });
    costumReadFile(`./public/images${url}`, res);
  } else {
    sendErrorResponse(res);
  }
})
    .listen(port);
  console.log(`The server has started and is listening on number: ${port}`);

  const costumReadFile = (file_path, res) => {
    if (fs.existsSync(file_path)) {
      fs.readFile(file_path, (error, data) => {
        if (error) {
          console.log(error);
          sendErrorResponse(res);
          return;
        }
        res.write(data);
        res.end();
      });
    } else {
      sendErrorResponse(res);
    }
  };
