-- AlterTable
ALTER TABLE "User" ADD COLUMN "login" TEXT NOT NULL DEFAULT 'default_login';
ALTER TABLE "User" ADD COLUMN "name" TEXT NOT NULL DEFAULT 'default_name';
ALTER TABLE "User" ADD COLUMN "surname" TEXT NOT NULL DEFAULT 'default_surname';

-- CreateTable
CREATE TABLE "RefreshToken" (
                                "id" SERIAL NOT NULL,
                                "token" TEXT NOT NULL,
                                "userId" INTEGER NOT NULL,
                                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                "expiresAt" TIMESTAMP(3) NOT NULL,
                                CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE INDEX "userId_index" ON "RefreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
