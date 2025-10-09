# Dockerfile
FROM node:18-alpine

# Install fontconfig and basic fonts
RUN apk add --no-cache \
    fontconfig \
    ttf-dejavu \
    && fc-cache -fv

# Set font environment variables
ENV FONTCONFIG_PATH=/etc/fonts
ENV FONTCONFIG_FILE=/etc/fonts/fonts.conf

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy app
COPY . .

# Build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]