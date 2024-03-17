FROM node:20 as base

WORKDIR /social-vibes

FROM base as development
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE $NEXTJS_DEFAULT_PORT
CMD [ "/bin/bash", "-c", "npx prisma db push", "npm run dev"]

FROM base as production
COPY ./package.json .
RUN npm install --omit=dev
COPY . .
RUN npm run build
EXPOSE $NEXTJS_DEFAULT_PORT
CMD [ "/bin/bash", "-c", "npx prisma db push", "npm run start"]
