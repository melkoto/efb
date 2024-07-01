-- AlterTable
ALTER TABLE "User" ALTER COLUMN "login" DROP DEFAULT,
ALTER COLUMN "name" SET DEFAULT 'User name',
ALTER COLUMN "surname" SET DEFAULT 'User surname';
