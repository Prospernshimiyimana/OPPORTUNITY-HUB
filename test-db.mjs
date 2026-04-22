import { prisma } from './lib/prisma.js';

async function testDb() {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Basic query test passed');
    
    // Test table existence
    const tables = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table'`;
    console.log('Tables:', tables);
    
    // Test Admin table
    const adminTable = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type='table' AND name='Admin'`;
    console.log('Admin table exists:', adminTable);
    
    await prisma.$disconnect();
    console.log('Database test completed');
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDb();
