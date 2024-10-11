# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine

# Copy the built React files from the previous build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that Nginx will use
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
