# [New Light Test Task](https://new-light-test-task.vercel.app/)

Service using [Bun](https://bun.sh/), [Elysia](https://elysiajs.com/) framework and [Drizzle ORM](https://drizzle-orm.github.io/drizzle-orm/) to manage tasks, with some queue processing using [Bull](https://www.npmjs.com/package/bull). Optional usage of [Prisma ORM](https://www.prisma.io/) for database interactions.

Swagger UI documentation is available at deployed at https://new-light-test-task.vercel.app/swagger.

## Development

### Installation

To install dependencies, run:

```bash
bun install
```

### Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```bash
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/database
REDIS_URL=redis://localhost:6379
```

### Drizzle Setup

To generate the Drizzle schema, run:

```bash
bun run drizzle:generate
```

### Prisma Setup

To generate the Prisma client, run:

```bash
bun run prisma:generate
```

### Local Setup

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

Open http://localhost:3000/swagger to see the Swagger UI documentation.

Requires a local Redis server running on default port 6379 for queue processing.

### Docker Setup

To start the development server run:

```bash
docker compose up --build
```

Open http://localhost:3000/ with your browser to see the result.

## Deployment

You can also deploy the application to Vercel. Make sure to set the environment variables in the Vercel dashboard.

```bash
bun run deploy
```

## Testing

To run tests, use:

```bash
bun test
```
