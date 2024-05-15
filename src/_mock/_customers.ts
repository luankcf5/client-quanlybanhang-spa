import { sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';

export const _customers = Array.from({ length: 40 }).map((_, index) => ({
  id: index + 1,
  name: faker.internet.displayName(),
  address: faker.commerce.productDescription(),
  phone: faker.phone.number(),
  point: faker.commerce.price({ min: 10000, max: 200000, dec: 0 }),
  is_active: sampleSize([true, false])[0],
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
}));
