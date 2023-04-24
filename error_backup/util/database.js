// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   database: "node-complete",
//   //default user name은 root
//   //데이터 베이스 서버에 접근해야 하므로
//   //정확한 데이터베이스 이름을 정하기
//   //우리의 데이터베이스는 스키마
// });

// module.exports = pool.promise();
// //promise는 코드를 좀더 체계화된 방식으로
// //작성할 수 있도록 함

// //createConnection은 단일 연결이 아니라
// //커넥션 풀을 통해 실행할 쿼리가 있을 때마다
// //항상 활용할 수 있음

// //다중 연결을 관리하는 이 풀에서 새로운 연결을 받아오게 되면
// //각 쿼리마다 개별적으로 연결이 필요하므로
// //다수의 쿼리를 동시에 실행할 수 있다
// //쿼리가 완료된 다음에는 연결을 다시 풀로 돌려주게 되고
// //풀은 애플리케이션을 종료할 때 완료

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", null, {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

//dialect 는 어디에 연결할지 설정하는 것
//host명은 디폴트로 localhost
//connection pool도 자동으로 설정해줌

module.exports = sequelize;
