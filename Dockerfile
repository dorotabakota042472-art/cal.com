# Use a Playwright-specific base image with Node.js and pre-installed browsers
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) and install dependencies
COPY package*.json ./
RUN npm install

# Copy your Playwright tests and related files
COPY . .

# Install Playwright browsers (if not already in base image or specific versions needed)
# RUN npx playwright install --with-deps

# Set the default command to run your Playwright tests
CMD ["npx", "playwright", "test"]