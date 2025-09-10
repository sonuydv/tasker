# Base image
FROM node:20-slim
# Set working directory
WORKDIR /app
# Copy project files
COPY . .
# Install dependencies
RUN npm install
# Build Angular (tasker-web) and Express (tasker-api)
RUN npx nx build tasker-web && \
    npx nx build tasker-api

# Prepare backend folder & copy code
RUN mkdir -p /app/backend
RUN cp -r dist/apps/tasker-api/* /app/backend

# Copy frontend dist into backend/frontend
RUN mkdir -p /app/backend/frontend
RUN cp -r dist/apps/tasker-web/browser/* /app/backend/frontend

# Set working directory to backend
WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "main.js"]

