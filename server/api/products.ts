import { faker } from "@faker-js/faker";
import type { Product, Rating } from "~/types/products";

const generateRating = (): Rating => ({
  rate: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  count: faker.number.int({ min: 10, max: 1000 }),
});

const generateProduct = (id: number): Product => {
  const imageUrl = faker.image.urlLoremFlickr({
    category: "product",
    width: 400,
    height: 400,
  });

  return {
    id,
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: imageUrl,
    rating: generateRating(),
  };
};

export default defineEventHandler(async (event) => {
  const newProducts: Product[] = [];
  for (let i = 1; i <= 200; i++) {
    newProducts.push(generateProduct(i));
  }
  return newProducts;
});
