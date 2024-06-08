# Use a node image to build the application
FROM node:alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the frontend and shared directories
COPY ./ ./

# Build the application
RUN yarn build

# Use nginx to serve the application
FROM nginx:alpine

# Copy the build output to nginx's web directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
