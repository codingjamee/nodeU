const expect = require("chai").expect;

const authMiddleware = require("../middleware/is-auth");

describe("Auth middleware", function () {
  it("should throw an error if no authorization header is present", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if the authorization header is only one string", function () {
    const req = {
      get: function () {
        return "xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  it("should throw an error if the token cannot be verified", function () {
    const req = {
      get: function () {
        return "Bearer xyz";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  it("should yield a userId after decoding the token", function () {
    const req = {
      get: function () {
        return "Bearer xyz";
      },
    };
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
  });
});

//잘못된 jwt토큰이 주어졌을 때 에러//오류의 출력여부만 관심있다면 throw다음에 아무것도 주지 않아도됨
//서드파티 라이브러리의 메서드는 테스트하지 말아야 함.
