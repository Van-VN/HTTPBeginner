const http = require("http");
const fs = require("fs");
const qs = require("qs");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    fs.readFile("./Calculator/calculator.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.method === "POST") {
    let inputCombine = "";
    req.on("data", (chunk) => {
      inputCombine += chunk;
    });
    req.on("end", () => {
      inputCombine = qs.parse(inputCombine);
      inputCombine = Object.values(inputCombine).join("");
      inputCombine = eval(inputCombine);
      fs.readFile("./Calculator/calculator.html", "utf-8", (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          data = data.replace("{calculationResult}", inputCombine);
          res.write(data);
          res.end();
        }
      });
      console.log(`Done!`);
    });
  }
});

server.listen(7878, "localhost", () => console.log(`Calculator Started!!!`));
