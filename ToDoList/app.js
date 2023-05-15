const http = require("http");
const fs = require("fs");
const qs = require("qs");

let result = [];

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    fs.readFile("./ToDoList/todo.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.method === "POST") {
    let output = "";
    req.on("data", (chunk) => {
      output += chunk;
      output = qs.parse(output);
      result.push(output.toDoItem);
    });

    req.on("end", () => {
      fs.readFile("./ToDoList/display.html", "utf-8", (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          let toPrintOut = "";
          let counter = 1;
          result.forEach((item) => {
            toPrintOut += `<h3>${counter}. ${item}</h3>`;
            counter++;
          });
          data = data.replace("{output}", toPrintOut);
          res.write(data);
          res.end();
        }
      });
    });
  } else {
    console.log(`Out!`);
    res.end();
  }
});

server.listen(7777, "localhost", () => {
  console.log(`Server started!`);
});
