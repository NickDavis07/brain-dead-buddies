import db from '../config/connection.js';
import { SurvivalTip, User } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
import survivalTipData from './survivalTipData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await SurvivalTip.insertMany(survivalTipData);
    await User.create(userData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
