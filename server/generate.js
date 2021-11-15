const faker = require("faker");

// generate bigDataSet as example
const database = { categories: [], ads: [] };

for (var i = 1; i <= 20; i++) {
  database.categories.push({
    id: i,
    title: faker.commerce.productName(),
    img: `${faker.image.food()}?random=${Math.round(Math.random() * 1000)}`,
  });
}

for (var i = 1; i <= 20; i++) {
  database.categories.push({
    id: i,
    img: `${faker.image.nightlife()}?random=${Math.round(
      Math.random() * 1000
    )}`,
  });
}

console.log(JSON.stringify(database));
