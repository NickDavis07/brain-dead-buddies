import { SurvivalTip, User, TipOfTheDay, BlogPost } from '../models/index.js';
import process from 'process';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents in order of dependency
    await BlogPost.deleteMany({});
    console.log('BlogPost collection cleaned.');

    await SurvivalTip.deleteMany({});
    console.log('SurvivalTip collection cleaned.');

    await TipOfTheDay.deleteMany({});
    console.log('TipOfTheDay collection cleaned.');

    await User.deleteMany({});
    console.log('User collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:❌', err);
    process.exit(1);
  }
};

export default cleanDB;
