import { sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';

export const _category = Array.from({ length: 40 }).map((_, index) => ({
  id: index + 1,
  name: faker.internet.userName(),
  description: faker.person.bio(),
  is_active: sampleSize([true, false])[0],
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
}));
