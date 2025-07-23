# Ecommerz Server (Fullstack Test)

## Technologies used:
[![My Skills](https://skillicons.dev/icons?i=nodejs,ts,postgresql)](https://skillicons.dev)

## Getting Started

Follow the steps below to run this project on your machine.

### Prerequisites

Make sure you have installed the following prerequisites before proceeding:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

## Installation

1. Clone this repository to your local machine:

   ```git clone https://github.com/vickyadrii/ecommerz-server.git```

2. Navigate to the project directory:

   ```cd ecommerz-server```
3. Install all the required dependencies using npm or Yarn:
   ````bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ````

## Configuration
Create a `.env` file in the root directory and add the following environment variables:

```
# App Port
PORT=3000

# PostgreSQL Configuration
DATABASE_USER=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=ecommerz

# Frontend URL (used for CORS)
FRONTEND_URL=http://localhost:5173

# Optional (if you prefer to use a single URL)
DATABASE_URL=postgres://your_db_username:your_db_password@localhost:5432/ecommerz
```
Make sure to replace `your_db_username`, `your_db_password`, and other placeholders with your actual database credentials.

## Database Setup
1. <b>Create Database Locally</b>
   - Ensure you have PostgreSQL installed and running.
   - Create a database named `ecommerz` using your preferred PostgreSQL client or command line.
   ```
   CREATE DATABASE ecommerz;
   ```
2. <b>Run Migrations</b>
   - Use the following command to run the initial migration and set up the database schema:
   ```bash
   npm run migrate
   # or
   yarn migrate
   # or
   pnpm migrate
   ```


## Usage

Start the Express server:

````bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ````

## Built With
- [Fastify](https://www.fastify.io/) - Web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [PostgreSQL](https://www.postgresql.org/) - Relational database
