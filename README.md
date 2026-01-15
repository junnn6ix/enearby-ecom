# eNearby - E-Commerce Platform

## Project Overview

### Introduction

eNearby is a modern, full-stack e-commerce platform built with microservices architecture. The project demonstrates a scalable approach to building online marketplace applications with real-time order processing, payment integration, and comprehensive admin management capabilities.

This platform is designed as a college project to showcase proficiency in modern web development practices, including monorepo management, event-driven architecture, and cloud-ready deployment strategies.

### Project Description

eNearby is a comprehensive e-commerce solution that enables users to browse products, manage shopping carts, process payments, and track orders. The platform consists of multiple independent services working together through an event-driven architecture, ensuring scalability and maintainability.

**Key Features:**

- **User-Facing Application**: Browse products by categories, add items to cart, and complete purchases with secure payment processing
- **Admin Dashboard**: Manage products, view orders with detailed analytics, and monitor payment events
- **Real-time Order Processing**: Event-driven architecture using Kafka for reliable order management
- **Payment Integration**: Stripe embedded checkout for secure payment processing
- **Authentication**: Clerk-based authentication system with JWT tokens
- **Product Management**: Full CRUD operations for products and categories
- **Order Analytics**: Visual representation of order data with weekly and monthly aggregations

### Architecture

The project follows a microservices architecture pattern with the following services:

**Frontend Applications:**

- **Client App**: Customer-facing e-commerce interface
- **Admin App**: Administrative dashboard for order and product management

**Backend Services:**

- **Auth Service**: Handles user authentication and authorization
- **Product Service**: Manages product catalog and categories
- **Order Service**: Processes and manages customer orders
- **Payment Service**: Integrates with Stripe for payment processing
- **Email Service**: Handles transactional email notifications

**Shared Packages:**

- **Types**: Shared TypeScript type definitions
- **Kafka**: Event streaming client configuration
- **Order DB**: MongoDB schema and models for orders
- **Product DB**: Prisma schema and client for products
- **ESLint Config**: Shared linting configurations
- **TypeScript Config**: Shared TypeScript configurations

### Technology Stack

**Frontend:**

- Next.js 14+ (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- Shadcn/ui Components
- React Hook Form with Zod validation
- Zustand for state management

**Backend:**

- Hono.js (Lightweight web framework)
- Fastify (High-performance Node.js framework)
- TypeScript

**Databases:**

- MongoDB with Mongoose (Order management)
- PostgreSQL with Prisma ORM (Product catalog)

**Authentication:**

- Clerk (User authentication)
- JWT tokens for service-to-service communication

**Payment Processing:**

- Stripe API
- Stripe Embedded Checkout
- Webhook integration for payment events

**Event Streaming:**

- Apache Kafka
- KafkaJS client library

**Monorepo Management:**

- Turborepo
- pnpm workspaces

**Development Tools:**

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

**Deployment & Infrastructure:**

- Docker support
- Environment-based configuration
- Ngrok for local webhook testing

### Project Structure

```
enearby/
├── apps/
│   ├── admin/              # Admin dashboard application
│   ├── auth-service/       # Authentication service
│   ├── client/             # Customer-facing application
│   ├── email-service/      # Email notification service
│   ├── order-service/      # Order management service
│   ├── payment-service/    # Payment processing service
│   └── product-service/    # Product catalog service
├── packages/
│   ├── eslint-config/      # Shared ESLint configurations
│   ├── kafka/              # Kafka client and utilities
│   ├── order-db/           # MongoDB order schema
│   ├── product-db/         # Prisma product schema
│   ├── types/              # Shared TypeScript types
│   └── typescript-config/  # Shared TypeScript configurations
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **MongoDB** (v6 or higher)
- **PostgreSQL** (v14 or higher)
- **Docker** (optional, for running Kafka)
- **Ngrok** (for local Stripe webhook testing)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd enearby
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create `.env` files in the respective service directories with the following configurations:

**apps/client/.env.local:**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**apps/admin/.env.local:**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

**apps/auth-service/.env:**

```env
PORT=3001
CLERK_SECRET_KEY=your_clerk_secret_key
```

**apps/product-service/.env:**

```env
PORT=3002
DATABASE_URL=postgresql://username:password@localhost:5432/product_db
CLERK_SECRET_KEY=your_clerk_secret_key
```

**apps/order-service/.env:**

```env
PORT=3003
MONGODB_URI=mongodb://localhost:27017/order_db
CLERK_SECRET_KEY=your_clerk_secret_key
```

**apps/payment-service/.env:**

```env
PORT=3004
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Set up databases:

**PostgreSQL (Product Database):**

```bash
# Navigate to product-db package
cd packages/product-db

# Run Prisma migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate

# Seed the database (optional)
pnpm prisma db seed
```

**MongoDB (Order Database):**

```bash
# MongoDB should be running on mongodb://localhost:27017
# The database and collections will be created automatically when the order service starts
```

5. Set up Kafka (Event Streaming):

Using Docker:

```bash
cd packages/kafka
docker-compose up -d
```

This will start Kafka and Zookeeper containers.

### Running the Project

#### Development Mode

Run all services concurrently:

```bash
# From the root directory
pnpm dev
```

This will start:

- Client App: http://localhost:3000
- Admin App: http://localhost:3001
- Auth Service: http://localhost:3001
- Product Service: http://localhost:3002
- Order Service: http://localhost:3003
- Payment Service: http://localhost:3004

#### Run Specific Services

Run individual services using filters:

```bash
# Run only the client app
pnpm dev --filter=client

# Run only backend services
pnpm dev --filter=auth-service --filter=product-service --filter=order-service --filter=payment-service

# Run only the admin app
pnpm dev --filter=admin
```

#### Build for Production

Build all apps and packages:

```bash
pnpm build
```

Build specific services:

```bash
pnpm build --filter=client
pnpm build --filter=admin
```

### Setting Up Stripe Webhooks

For local development, use Ngrok to expose your local payment service:

1. Start the payment service:

```bash
pnpm dev --filter=payment-service
```

2. Start Ngrok:

```bash
ngrok http 3004
```

3. Copy the Ngrok URL and configure it in your Stripe Dashboard:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add endpoint: `https://your-ngrok-url/webhooks/stripe`
   - Select events: `checkout.session.completed`
   - Copy the webhook signing secret to your `.env` file

### Database Management

**Prisma (PostgreSQL):**

```bash
# Generate Prisma client after schema changes
pnpm --filter=@repo/product-db prisma generate

# Create and apply migrations
pnpm --filter=@repo/product-db prisma migrate dev

# Open Prisma Studio (Database GUI)
pnpm --filter=@repo/product-db prisma studio

# Reset database
pnpm --filter=@repo/product-db prisma migrate reset
```

**MongoDB:**

MongoDB collections are managed through Mongoose schemas. The database structure is automatically created when the order service starts.

### Troubleshooting

**Port conflicts:**
If you encounter port conflicts, update the PORT environment variable in the respective service's `.env` file.

**Database connection errors:**

- Ensure MongoDB is running: `mongosh` or check Docker container
- Ensure PostgreSQL is running and credentials are correct
- Verify DATABASE_URL and MONGODB_URI in environment files

**Kafka connection errors:**

- Verify Kafka is running: `docker ps | grep kafka`
- Restart Kafka containers: `docker-compose restart` in packages/kafka directory

**Stripe webhook errors:**

- Ensure Ngrok is running and URL is updated in Stripe Dashboard
- Verify STRIPE_WEBHOOK_SECRET matches the one from Stripe Dashboard
- Check payment service logs for webhook verification errors
