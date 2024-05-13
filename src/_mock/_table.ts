import { sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';

export const _table = Array.from({ length: 18 }).map((_, index) => ({
  id: index + 1,
  name: faker.internet.userName(),
  isVip: sampleSize([true, false])[0],
  isPayment: sampleSize([true, false])[0],
  is_active: sampleSize([true, false])[0],
  totalPrice: faker.commerce.price({ min: 100000, max: 2000000, dec: 0 }),
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
}));
