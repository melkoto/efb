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

  // Добавление лайков к фильмам
  const movieLike1 = await prisma.movieLike.upsert({
    where: { movieId_userId: { movieId: movie1.id, userId: user1.id } },
    update: {},
    create: {
      movieId: movie1.id,
      userId: user1.id,
    },
  });

  const movieLike2 = await prisma.movieLike.upsert({
    where: { movieId_userId: { movieId: movie2.id, userId: moderator.id } },
    update: {},
    create: {
      movieId: movie2.id,
      userId: moderator.id,
    },
  });

  console.log({ movieLike1, movieLike2 });

  // Добавление дизлайков к фильмам
  const movieDislike1 = await prisma.movieDislike.upsert({
    where: { movieId_userId: { movieId: movie1.id, userId: moderator.id } },
    update: {},
    create: {
      movieId: movie1.id,
      userId: moderator.id,
    },
  });

  const movieDislike2 = await prisma.movieDislike.upsert({
    where: { movieId_userId: { movieId: movie2.id, userId: user1.id } },
    update: {},
    create: {
      movieId: movie2.id,
      userId: user1.id,
    },
  });

  console.log({ movieDislike1, movieDislike2 });

  // Добавление лайков и дизлайков к отзывам
  const reviewLike1 = await prisma.reviewLike.upsert({
    where: { reviewId_userId: { reviewId: review1.id, userId: user1.id } },
    update: {},
    create: {
      reviewId: review1.id,
      userId: user1.id,
    },
  });

  const reviewDislike1 = await prisma.reviewDislike.upsert({
    where: { reviewId_userId: { reviewId: review2.id, userId: user1.id } },
    update: {},
    create: {
      reviewId: review2.id,
      userId: user1.id,
    },
  });

  console.log({ reviewLike1, reviewDislike1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
