const http = require("http"); //with no slash since it's global path
const routes = require("./routes"); //routes is local path

const server = http.createServer(routes);

server.listen(3000); //node js will keep this running to listen and will not exit our script
