const http = require("http");
const fs = require("fs");
const qs = require("qs");

const server = http.createServer((req, res) => {
  let userInput = "";
  if (req.url === "/login") {
    if (req.method === "GET") {
      fs.readFile("./Userlogin/login.html", "utf-8", (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          // userInput = data;
          // console.log(userInput);
          res.write(data);
          res.end();
        }
      });
    } else {
      req.on("data", (chunk) => {
        userInput += chunk;
      });
      req.on("end", () => {
        let result = qs.parse(userInput);
        fs.readFile("./Userlogin/result.html", "utf-8", (err, data) => {
          if (err) {
            console.log("Lỗi rồi!");
          } else {
            console.log(`123 vào rồi!`);
            data = data.replace("123", result.fullName);
            data = data.replace("234", result.userAge);
            data = data.replace("345", result.userAddress);
            res.write(data);
            res.end();
          }
        });
      });
    }
  } else {
    res.write(`Đức Anh xấu giai!`);
    res.end();
  }
  console.log(`cycled!`);
});

server.listen(2710, "localhost", () => console.log(`Dưc Anh dep trai`));
