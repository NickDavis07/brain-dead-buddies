import db from '../config/connection.js';
import { SurvivalTip, User, BlogPost } from '../models/index.js';
import cleanDB from './cleanDB.js';

import userData from './userData.json' with { type: 'json'};
import survivalTipData from './survivalTipData.json' with { type: 'json' };
import blogPostData from './blogPostData.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    const createdUsers = await User.create(userData);
    const blogPostsWithUsers = blogPostData.map(post => ({
      ...post,
      user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
    }));

    await SurvivalTip.insertMany(survivalTipData);
    await User.create(userData);
    await BlogPost.insertMany(blogPostsWithUsers);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
