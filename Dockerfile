FROM node

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 3001
ENV PORT 3001
ENV HOST 0.0.0.0

CMD [ "yarn", "start" ]
