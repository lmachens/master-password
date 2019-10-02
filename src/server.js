const http = require("http");
const url = require("url");
const fs = require("fs");

const { get } = require("./lib/commands");

const server = http.createServer(function(request, response) {
  const { pathname } = url.parse(request.url);

  if (pathname === "/favicon.ico") {
    response.writeHead(404);
    return response.end();
  }
  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    const content = fs.readFileSync("src/view/index.html", "utf-8");
    return response.end(content);
  }

  console.log(pathname);
  try {
    const path = pathname.slice(1);
    const secret = get("asd", path);

    response.write(secret);
  } catch (error) {
    response.write("Can not read secret");
  }

  response.end();
});

server.listen(8080, () => {
  console.log("Server listens on http://localhost:8080");
});
