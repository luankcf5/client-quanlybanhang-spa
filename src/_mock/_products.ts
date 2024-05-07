import { sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';

import { _category } from './_category';

export const _product = Array.from({ length: 40 }).map((_, index) => ({
  id: index + 1,
  name: faker.internet.userName(),
  category: sampleSize(_category)[0],
  image: faker.image.avatar(),
  description: faker.person.bio(),
  price: faker.commerce.price({ min: 10000, max: 200000, dec: 0 }),
  is_active: sampleSize([true, false])[0],
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
}));
