import { faker } from "@faker-js/faker";
import type { Product, Rating } from "~/types/products";

const generateRating = (): Rating => ({
  rate: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  count: faker.number.int({ min: 10, max: 1000 }),
});

const generateProduct = (id: number): Product => ({
  id,
  title: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  image: faker.image.urlLoremFlickr({ category: "product" }),
  rating: generateRating(),
});

export default defineEventHandler(async (event) => {
  console.log("Generating products...");
  const newProducts: Product[] = [];
  for (let i = 1; i <= 200; i++) {
    newProducts.push(generateProduct(i));
  }
  console.log(`Generated ${newProducts.length} products`);
  return newProducts;
});
