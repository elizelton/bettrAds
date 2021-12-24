 # Create image based on the official Node 6 image from the dockerhub
FROM node:16

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app

# Install dependecies
RUN yarn install

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["yarn", "start"]