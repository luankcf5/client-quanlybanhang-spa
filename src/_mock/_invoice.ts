import { sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';

import { _product } from './_products';

export const _invoice = Array.from({ length: 40 }).map((_, index) => ({
  id: index + 1,
  name: faker.internet.userName(),
  products: sampleSize(_product, 5),
  totalPrice: 400000,
  is_active: sampleSize([true, false])[0],
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
}));
