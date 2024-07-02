import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Хэширование пароля
  const passwordHash = await bcrypt.hash('password123', 10);

  // Создание пользователей
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      password: passwordHash,
      login: 'user1',
      name: 'User One',
      surname: 'One',
      role: 'USER',
    },
  });

  const moderator = await prisma.user.upsert({
    where: { email: 'moderator@example.com' },
    update: {},
    create: {
      email: 'moderator@example.com',
      password: passwordHash,
      login: 'moderator',
      name: 'Moderator User',
      surname: 'Moderator',
      role: 'MODERATOR',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: passwordHash,
      login: 'admin',
      name: 'Admin User',
      surname: 'Admin',
      role: 'ADMIN',
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      email: 'owner@example.com',
      password: passwordHash,
      login: 'owner',
      name: 'Owner User',
      surname: 'Owner',
      role: 'OWNER',
    },
  });

  console.log({ user1, moderator, admin, owner });

  // Создание фильмов
  const movie1 = await prisma.movie.create({
    data: {
      title: 'Movie One',
      description: 'Description for movie one',
      releaseDate: new Date('2022-01-01'),
      rating: 4.5,
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: 'Movie Two',
      description: 'Description for movie two',
      releaseDate: new Date('2023-01-01'),
      rating: 3.7,
    },
  });

  console.log({ movie1, movie2 });

  // Добавление избранных фильмов
  const favorite1 = await prisma.favorite.create({
    data: {
      userId: user1.id,
      movieId: movie1.id,
    },
  });

  const favorite2 = await prisma.favorite.create({
    data: {
      userId: moderator.id,
      movieId: movie2.id,
    },
  });

  console.log({ favorite1, favorite2 });

  // Создание отзывов
  const review1 = await prisma.review.create({
    data: {
      content: 'Great movie!',
      rating: 5,
      movieId: movie1.id,
      userId: user1.id,
    },
  });

  const review2 = await prisma.review.create({
    data: {
      content: 'Not bad.',
      rating: 3,
      movieId: movie2.id,
      userId: moderator.id,
    },
  });

  console.log({ review1, review2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
