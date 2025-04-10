import db from '../config/connection.js';
import ZombieBlog from '../models/index.js';
import { SurvivalTip, User } from '../models/index.js';
import cleanDB from './cleanDB.js';
import userData from './userData.json' with { type: 'json' };
import survivalTipData from './survivalTipData.json' with { type: 'json' };

// test purpose for blog page
import zombieblogData from './zombieblogSeeds.json' with { type: 'json' };

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await ZombieBlog.insertMany(zombieblogData);
    console.log('ZombieBlogs seeded successfully!');

    // Insert users only if they don't already exist
    for (const user of userData) {
      const existingUser = await User.findOne({ username: user.username });
      if (!existingUser) {
        await User.create(user);
      } else {
        console.log(`User with username "${user.username}" already exists. Skipping...`);
      }
    }

    // const createdUsers = await User.find(); 
    // const blogPostsWithUsers = blogPostData.map(post => ({
    //   ...post,
    //   user: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
    // }));

    await SurvivalTip.insertMany(survivalTipData);
    // await BlogPost.insertMany(blogPostsWithUsers);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
