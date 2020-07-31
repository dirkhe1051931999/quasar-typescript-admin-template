const faker = require('faker');
const tableData = [];
const tableDataLength = 100;

for (let i = 0; i < tableDataLength; i++) {
  tableData.push({
    status: faker.random.arrayElement(['al', 'b', 'c']),
  });
}
const getTableData = () => {
  // const { type, title, page, limit, sort } = ctx.req.query;
  return tableData;
};
module.exports = { getTableData };
