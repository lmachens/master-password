const http = require("http");
const url = require("url");
const fs = require("fs");

const { get, set } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  const { pathname } = url.parse(request.url);
  console.log(request.url, request.method);

  if (pathname === "/favicon.ico") {
    response.writeHead(404);
    return response.end();
  }
  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }

  try {
    const path = pathname.slice(1);
    if (request.method === "GET") {
      const secret = get("asd", path);
      response.end(secret);
    } else if (request.method === "POST") {
      let body = "";
      request.on("data", function(data) {
        body += data;
        console.log("Partial body: " + body);
      });
      request.on("end", function() {
        console.log("Body: " + body);
        set("asd", path, body);
        response.end(`Set ${path}`);
      });
    }
  } catch (error) {
    response.end("Can not read secret");
  }
});

server.listen(8080, () => {
  console.log("Server listens on http://localhost:8080");
});
