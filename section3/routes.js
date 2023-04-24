const fs = require("fs"); //allow us work with the file system

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>'
    ); //form action : the url this request will generated automatically should be sent to

    //input의 name속성은 요청을 보낼 때 함께 이것을 보낸다.
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); // listen some events //in here, we want to listen data event //data event will be fired whenever a new chunk is ready to be read,
    //second argument is function that executes every data event
    return req.on("end", () => {
      //req.on("end", ()=>{})
      //register end event //this will be fired once it's done parsing the incoming request data
      const parsedBody = Buffer.concat(body).toString();
      // Buffer
      //Buffer object is made by node js
      //now we created a new buffer and all the chunks from inside my body to it
      const message = newFunction(parsedBody);
      function newFunction(parsedBody) {
        return parsedBody.split("=")[1];
      }

      // fs.writeFileSync("message.txt", message);
      //writeFileSync
      //stands for synchronous
      //this will block code execution until file is created
      fs.writeFile("message.txt", message, (error) => {
        //third argument: function executes when it's done
        //receives error

        res.statusCode = 302; //set status code
        res.setHeader("Location", "/"); //set the location (default header that browser accepts)
        // res.writeHead(302, {}); //allow us to write some meta information
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
