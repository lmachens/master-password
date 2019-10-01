const http = require("http");
const url = require("url");

const { get } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  // use url.parse to seperate url to pathname and search

  if (request.url === "/favicon.ico") {
    return response.end();
  }
  if (request.url === "/") {
    return response.end("Welcome to my secrets manager");
  }

  console.log(request.url);
  try {
    const path = request.url.slice(1);
    const secret = get("asd", path);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(8080);
