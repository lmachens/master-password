const fs = require("fs");
const { initDatabase } = require("./lib/database");
const express = require("express");
const { get, set, unset } = require("./lib/commands");

const app = express();
const port = 8080;

app.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const content = fs.readFileSync("src/view/index.html", "utf-8");
  response.end(content);
});

app.get("/favicon.ico", (request, response) => {
  response.writeHead(404);
  response.end();
});

app.get("/api/:path", async (request, response) => {
  try {
    const secret = await get("asd", request.params.path);
    response.end(secret);
  } catch (error) {
    response.end("Error");
  }
});

app.post("/api/:path", async (request, response) => {
  try {
    let body = "";
    request.on("data", function(data) {
      body += data;
      console.log("Partial body: " + body);
    });
    request.on("end", async function() {
      console.log("Body: " + body);
      await set("asd", request.params.path, body);
      response.end(`Set ${request.params.path}`);
    });
  } catch (error) {
    response.end("Error");
  }
});

app.delete("/api/:path", async (request, response) => {
  await unset("asd", request.params.path);
  response.end(`Delete ${request.params.path}`);
});

initDatabase().then(() => {
  console.log("Database connected");

  app.listen(port, () => {
    console.log(`Server listens on http://localhost:${port}`);
  });
});
