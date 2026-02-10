const path = require('path');
const { PrismaClient } = require('./generated/client');

const dbPath = path.join(__dirname, '../../../prisma/ai.db');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`,
    },
  },
});

module.exports = prisma;
