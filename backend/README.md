# kulturExplora Backend

This is the backend for the kulturExplora project, built with Node.js, Express.js, and TypeScript. It uses Prisma ORM to manage the database.

## Tech Stack

-   Node.js & Express.js – Backend framework
-   TypeScript – Strongly typed JavaScript
-   Prisma ORM – Database management
-   PostgreSQL

## Setup & Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/kulturExplora-backend.git
    cd kulturExplora-backend

    ```

2. Install dependencies:

```sh
npm install
```

3. Set up environment variables: Create a .env file in the root directory and add:

```sh
DATABASE_URL=your_database_url
```

4. Migrate the database:

```sh
npx prisma migrate dev
```

5. Run the development server with TypeScript:

```sh
npm run dev
```

## Available Scripts

-   npm run dev – Start the server in development mode with ts-node
-   npm run build – Compile TypeScript to JavaScript
-   npm start – Run the production server using the compiled JavaScript

## API Documentation

(TBD – Add endpoints as they are implemented)
