const path = require("path");

// module.exports = path.dirname(process.mainModule.filename);
//mainModule이 삭제되었으므로 수정필요.

module.exports = path.dirname(process.main.filename);
