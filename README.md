# DESTA B2B MARKET

A production-ready B2B marketplace platform for Ethiopia connecting shopkeepers, suppliers, delivery agents, and admins.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Product Management**: Suppliers can manage their product inventory
- **Order Management**: Shopkeepers can browse products and place orders
- **Payment System**: Telebirr-like escrow system with payment holding and release
- **Delivery Tracking**: Real-time GPS tracking with live map updates
- **OTP Verification**: Email-based delivery verification
- **Admin Dashboard**: Comprehensive analytics and user management

## 🛠 Tech Stack

### Frontend
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-hook-form
- zod
- zustand
- react-query
- lucide-react
- react-leaflet

### Backend
- Node.js
- NestJS
- REST API
- JWT Authentication
- bcrypt
- Prisma ORM

### Database
- PostgreSQL

### Infrastructure
- Docker
- Docker Compose
- GitHub
- Vercel deployment

## 📁 Project Structure

```
desta-market/
├── apps/
│   └── web/                 # Next.js frontend
│       ├── src/
│       │   ├── app/         # App router pages
│       │   ├── components/  # React components
│       │   ├── hooks/       # Custom hooks
│       │   ├── services/    # API services
│       │   ├── utils/       # Utilities
│       │   └── types/       # TypeScript types
│       └── public/          # Static assets
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── products/       # Products module
│   │   ├── orders/         # Orders module
│   │   ├── payments/       # Payments module
│   │   ├── delivery/       # Delivery module
│   │   ├── notifications/  # Notifications module
│   │   ├── admin/          # Admin module
│   │   └── prisma/         # Prisma service
│   └── prisma/             # Prisma schema
├── packages/               # Shared packages
│   ├── shared-ui/
│   ├── shared-utils/
│   └── shared-types/
├── docker/                 # Docker configurations
│   ├── docker-compose.yml
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
└── prisma/                 # Prisma schema
    └── schema.prisma
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bemnetzolabura/desta-market.git
cd desta-market
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:

Create `backend/.env`:
```env
DATABASE_URL="postgresql://desta_user:desta_password@localhost:5432/desta_market"
JWT_SECRET="your-jwt-secret-key-change-in-production"
FRONTEND_URL="http://localhost:3000"
PORT=3001
```

Create `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Setup database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Run the application:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:3001`

### Docker Setup

1. Start all services:
```bash
npm run docker:up
```

2. Stop all services:
```bash
npm run docker:down
```

## 📊 Database Schema

### Users
- id, name, email, password, role, createdAt
- Roles: SHOPKEEPER, SUPPLIER, AGENT, ADMIN

### Products
- id, name, price, stock, supplierId, imageUrl

### Orders
- id, shopkeeperId, supplierId, status, total
- Status: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED

### Payments
- id, orderId, amount, transactionId, status
- Status: PENDING, HELD_IN_ESCROW, RELEASED, FAILED

### Delivery
- id, orderId, agentId, latitude, longitude, status
- Status: ASSIGNED, PICKED_UP, IN_TRANSIT, DELIVERED, CANCELLED

### OTP
- id, email, code, expiresAt

## 🔐 User Roles

- **SHOPKEEPER**: Browse products, place orders, track deliveries
- **SUPPLIER**: Manage products, view orders, receive payments
- **AGENT**: Accept deliveries, update location, verify deliveries
- **ADMIN**: Manage users, view analytics, oversee operations

## 📝 API Documentation

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/profile` - Get user profile (protected)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (protected)
- `PUT /products/:id` - Update product (protected)
- `DELETE /products/:id` - Delete product (protected)

### Orders
- `GET /orders` - Get orders (protected)
- `GET /orders/:id` - Get order by ID (protected)
- `POST /orders` - Create order (protected)
- `PUT /orders/:id/status` - Update order status (protected)

### Payments
- `POST /payments` - Create payment (protected)
- `GET /payments/order/:orderId` - Get payments by order (protected)
- `PUT /payments/:id/status` - Update payment status (protected)
- `PUT /payments/:id/release` - Release escrow (protected)

### Delivery
- `POST /delivery` - Create delivery (protected)
- `PUT /delivery/:id/location` - Update location (protected)
- `PUT /delivery/:id/status` - Update status (protected)
- `GET /delivery/agent/:agentId` - Get deliveries by agent (protected)
- `GET /delivery/order/:orderId` - Get delivery by order (protected)

### Notifications
- `POST /notifications/otp/generate` - Generate OTP (protected)
- `POST /notifications/otp/verify` - Verify OTP (protected)

### Admin
- `GET /admin/dashboard` - Get dashboard stats (protected)
- `GET /admin/analytics/orders` - Get orders analytics (protected)
- `GET /admin/analytics/payments` - Get payments analytics (protected)
- `GET /admin/analytics/delivery` - Get delivery analytics (protected)
- `GET /admin/analytics/suppliers` - Get supplier analytics (protected)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚢 Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Production)

1. Build the backend:
```bash
cd backend
npm run build
```

2. Set production environment variables
3. Run with PM2 or similar process manager:
```bash
pm2 start dist/main.js --name desta-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

- **Bemnet Zola Abura** - Project Lead

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by Ethiopian market needs
- Focused on security and scalability
