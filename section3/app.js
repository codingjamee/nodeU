const http = require("http"); //슬래시를 붙이지 않으면 글로벌 모듈을 불러오게 된다.

function rqListener(req, res) {
  //첫번째 인수 :요청에 대한 데이터, 두번째 : 응답을 보내는것을 도울것
}

// http.createServer(rqListener); //인수에 해당 함수를 전해주면 요청이 들어올 때마다 해당 함수르 실행
//익명으로도 가능
//createServer는 서버를 생성할때 필요한 메서드.
//requestListener인수 : 들어오는 모든 요청 실행

//requestListener는 응답 객체 유형의 요청을 받는데,
//incoming 메시지 타입과 응답 객체인 요청을 수신한다.
//node js는 자동으로 들어오는 요청을 보여주고 요청에서 데이터를 읽을 수 있도록 하며
//응답객체를 주는데, 요청을 보낸 사람에게 응답을 반환하는데 사용할 수 있는 객체를 준다.

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit(); //If you were to unregister use this
  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end(); //write is end. we cannot write below the lines any more.

  // res.write(); //allow us write some data to response (basically works in chunks)
}); //화살표함수 익명함수를 사용한 기본형 createServer

server.listen(3000); //node js will keep this running to listen and will not exit our script
//argument :
//* port(if it were not filled, the default of port: 80) //thousands are pretty safe
//incomming listener is one event listener we did register and never unregistered
//core node application is managed by this event roop.
//node js uses this pattern
