# SOCIAL_VIBES: Next.js 14, React, Tailwind, Prisma, PostgreSQL, WebSockets, Redis, And More... ❤️

This is a repository for A Fullstack Social Media App >>> Project Status: In Progress 🚧🛠️

## How To Download The Repo locally?

- Run The Following Command In Your Terminal (Make Sure To install `git` Before This Step)

```sh
git https://github.com/moasaad107/social-vibes.git
```

- Unzip The File

## How To Run The App ?

- First, Install Prerequisites
  - ensure that you installed Docker version 25.0.3 or later on you machine >>> [Docker Link](https://docs.docker.com/engine/install/)

- Create `.env` File In The Project Root Directory And Add These Variables With Your Desired Values

```.env
NEXTJS_DEFAULT_PORT=3000
FULL_DOMAIN_URL=http://127.0.0.1
EXPOSED_PORT=80

#PostgreSQL ENV
POSTGRES_USER=root
POSTGRES_PASSWORD=
POSTGRES_PORT=5432
POSTGRES_HOST=postgres
POSTGRES_DB_NAME=social-vibes

#PGAdmin ENV
PGADMIN_PORT=8080
PGADMIN_DEFAULT_EMAIL=user@domain.com
PGADMIN_DEFAULT_PASSWORD=SuperSecret

# Prisma ENV
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB_NAME}

#NextAuth ENV
NEXTAUTH_SECRET=
NEXTAUTH_URL=${FULL_DOMAIN_URL}

#Google OAUTH ENV
CLIENT_ID=
CLIENT_SECRET=
```

- Make sure that your firewall configuration has no problems with `127.0.0.1:80` or `127.0.0.1:8080`

- Run The App By This Command

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## Finally Access The App

- The NextJS APP Is Running on >>> `http://127.0.0.1` 💥🤯
- The Administration Platform For PostgreSQL (pgadmin4) Is Running on `http://127.0.0.1:8080` 🐘
