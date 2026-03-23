# ============================================
# Stage 1: Build dependencies
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for efficient caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci --include=dev && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Prune dev dependencies after build
RUN npm prune --production


# ============================================
# Stage 2: Production image
# ============================================
FROM node:20-alpine AS production

# Set environment
ENV NODE_ENV=production

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# Copy built files and production dependencies from builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start the application
CMD ["node", "dist/server.js"]   
