const http = require("http");

const server = http.createServer((req, res) => {
  let txt = "";
  if (req.url === "/login") {
    txt = "Login success!";
  } else {
    txt = "Login failed!";
  }
  res.write(txt);
  res.end();
});

server.listen(8080, "localhost", () => {
  console.log(`server started!`);
});
