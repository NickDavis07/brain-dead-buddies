# Brain Dead Buddies

Brain Dead Buddies is a zombie survival checklist and tips forum designed to help users outsmart the brain-dead before they get your brains. This application allows users to create survival checklists, share survival tips, and engage with a community of like-minded survivors.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Description

Brain Dead Buddies is a full-stack web application that combines a survival checklist, a blog for sharing survival stories, and a daily survival tip feature. Users can create accounts, log in, and interact with the community by adding tips, comments, and blog posts.

## Live Site

https://brain-dead-buddies.onrender.com

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/brain-dead-buddies.git
   ```

2. Navigate to the project directory:
   ```bash
   cd brain-dead-buddies
   ```

3. Install server & client dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following variables:
     ```
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```
     - `MONGODB_URI`: The connection string for your MongoDB database.
     - `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWTs).

5. Seed the database (optional):
   ```bash
   npm run seed
   ```

6. Start the development servers:
   - Start the server:
     ```bash
     npm run start:dev
     ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Sign up or log in to access all features.
3. Explore the survival checklist, blog, and daily tips.

## Features

- **Survival Checklist**: Create, update, and manage tasks with priorities.
- **Daily Survival Tip**: Get a randomly selected survival tip every day.
- **Blog**: Share and read survival stories.
- **User Profiles**: View and manage your survivor profile.
- **Authentication**: Secure user login and registration.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, Apollo Server, MongoDB
- **GraphQL**: For API queries and mutations
- **State Management**: Apollo Client
- **Styling**: Tailwind CSS, custom CSS
- **Database**: MongoDB with Mongoose

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```

4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Special thanks to the team for their hard work and dedication.
- Icons and assets from [Font Awesome](https://fontawesome.com/) and other free resources.
- Background image and fonts from Google Fonts and other open resources.

---
Made with 🧠 by Group 8.