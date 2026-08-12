# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (for caching)
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

# Expose API port
EXPOSE 5051

# Start the server
CMD ["npm", "start"]
