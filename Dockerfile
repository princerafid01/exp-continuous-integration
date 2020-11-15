FROM circleci/node:15-browsers

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --unsafe-perm
COPY . .

ENV DISPLAY :99
CMD yarn mocha test/mocha.test.js