FROM node:16

WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/

RUN ls -la

# Install dependencies
RUN yarn install --frozen-lockfile

# Get all the code needed to run the app
COPY . /app/
# Expose the port the app runs in
EXPOSE 3000
 
# Serve the app
CMD ["yarn", "start"]