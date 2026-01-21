FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev  && npm install prisma -g

# Copy source
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose Port
EXPOSE 5001

# Start
CMD ["npm", "start"]
