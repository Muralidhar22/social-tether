import { PrismaClient } from '@prisma/client';
declare global {
    var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  var prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;