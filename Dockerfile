# Dockerfile for legacy Angular 8 project
# Use Node 10 (compatible with Angular 8)
FROM node:10.16.3

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli@8.3.14 \
    && npm install

# Copy the rest of the app
COPY . .

# Expose default Angular port
EXPOSE 4200

# Start the Angular app and listen on all interfaces
CMD ["ng", "serve", "--host", "0.0.0.0"]
