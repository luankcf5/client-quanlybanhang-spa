import { sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';

export const _account = Array.from({ length: 245 }).map((_, index) => ({
  id: index + 1,
  user_name: faker.internet.userName(),
  full_name: faker.finance.accountName(),
  email: faker.internet.email(),
  date_of_birth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
  avatar: faker.image.avatar(),
  bio: faker.person.bio(),
  gender: sampleSize([true, false])[0],
  address: faker.location.streetAddress(),
  phone_number: faker.phone.number(),
  is_active: sampleSize([true, false])[0],
  created_at: faker.date.anytime(),
  updated_at: faker.date.anytime(),
}));
