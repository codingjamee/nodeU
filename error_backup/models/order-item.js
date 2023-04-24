const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

//여기에는 수량은 필요없음
//동시에 두가지 주문을 할 필요가 없음
module.exports = OrderItem;
