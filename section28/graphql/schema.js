const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type TestData {
    text: String!
    views: Int!
  }
  type RootQuery {
    hello: TestData! 
  }
  schema {
    query: RootQuery
  }
`);
//hello query string 뒤에 느낌표를 붙이면 string이 필수가 됨
