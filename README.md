# InventoryPro 📦

A full-stack Mini Inventory Management System built for IT342 - System Integration and Architecture (G5).

> Replaces manual paper/spreadsheet-based inventory tracking with a reliable digital system accessible via web and mobile.

---

## 🚀 Features

### Web Dashboard (Admin)
- 🔐 JWT-based login and authentication
- 📋 Product management — add, edit, delete products
- 📊 Dashboard stats — total products, low stock, out of stock, total value
- 🗂️ Category management *(in progress)*
- 📈 Inventory reports *(in progress)*
- 👥 User management *(in progress)*

### Android App (Staff)
- 🔐 Staff login
- 📦 View product list with stock levels
- ➕ Stock In — increase product quantity
- ➖ Stock Out — decrease product quantity
- 📝 Transaction history / stock logs

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 21, Spring Boot 3.x, Spring Security, Spring Data JPA |
| Database | PostgreSQL 14+ (Supabase) |
| Web Frontend | React 18, JavaScript, Vite |
| Mobile | Kotlin, Jetpack Compose, Retrofit |
| Auth | JWT (JSON Web Tokens) + bcrypt |
| Build Tools | Maven (Backend), npm (Web), Gradle (Android) |

---

## 📁 Project Structure

```
IT342-Mantilla-InventoryPro/
├── backend/                  # Spring Boot REST API
│   └── src/main/java/edu/cit/mantilla/inventorypro/
│       ├── config/           # JWT, Security config
│       ├── controller/       # REST controllers
│       ├── entity/           # JPA entities
│       ├── repository/       # Spring Data repositories
│       ├── service/          # Business logic
│       └── exception/        # Global error handling
│
└── web/
    └── frontend/             # React web dashboard
        └── src/
            ├── api/          # API client & service layer
            ├── components/   # Reusable UI components
            ├── context/      # Auth context
            ├── hooks/        # Custom hooks
            └── pages/        # Dashboard, Products, Login
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Java 21+
- Node.js 18+
- Maven
- A Supabase project (PostgreSQL)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/IT342-Mantilla-InventoryPro.git
cd IT342-Mantilla-InventoryPro
```

---

### 2. Backend Setup

```bash
cd backend
```

Create `src/main/resources/application.properties`:

```properties
spring.application.name=inventorypro

# Supabase PostgreSQL
spring.datasource.url=jdbc:postgresql://YOUR_SUPABASE_HOST:6543/postgres?pgbouncer=true
spring.datasource.username=YOUR_SUPABASE_USERNAME
spring.datasource.password=YOUR_SUPABASE_PASSWORD
spring.datasource.driver-class-name=org.postgresql.Driver

# HikariCP Connection Pool
spring.datasource.hikari.maximum-pool-size=5
spring.datasource.hikari.minimum-idle=2

# JPA
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jackson.property-naming-strategy=LOWER_CAMEL_CASE

# JWT
jwt.secret=YOUR_BASE64_SECRET
jwt.expiration=86400000
jwt.refresh-expiration=604800000
```

Run the backend:

```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

---

### 3. Web Frontend Setup

```bash
cd web/frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|---------|-------------|------|
| POST | `/api/auth/register` | Register new user | None |
| POST | `/api/auth/login` | Login and get JWT token | None |

### Products
| Method | Endpoint | Description | Auth |
|--------|---------|-------------|------|
| GET | `/api/products` | Get all products | Bearer Token |
| POST | `/api/products` | Create new product | Bearer Token |
| PUT | `/api/products/{id}` | Update product | Bearer Token |
| DELETE | `/api/products/{id}` | Delete product | Bearer Token |

### Dashboard
| Method | Endpoint | Description | Auth |
|--------|---------|-------------|------|
| GET | `/api/dashboard/stats` | Get inventory stats | Bearer Token |
| GET | `/api/dashboard/trends` | Get trends data | Bearer Token |
| GET | `/api/dashboard/activities` | Get recent activities | Bearer Token |

### Stock *(coming soon)*
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/stock/in` | Record stock in transaction |
| POST | `/api/stock/out` | Record stock out transaction |
| GET | `/api/stock/logs` | Get transaction history |

---

## 🗄️ Database Schema

```
users              → admin/staff accounts + roles
products           → inventory catalog
categories         → product groupings
stock_transactions → every stock in/out movement
refresh_tokens     → JWT refresh token management
```

---

## 🔐 Environment Variables

Never commit your credentials. Make sure these are in `.gitignore`:

```
application.properties
.env
```

---

## 📌 Project Status

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 1 | Planning & Design | ✅ Complete |
| Phase 2 | Backend Development | ✅ Complete |
| Phase 3 | Web Application | 🔄 In Progress |
| Phase 4 | Mobile Application | ⏳ Not Started |
| Phase 5 | Integration & Deployment | ⏳ Not Started |

---

## 👤 Author

**Mantilla, Jhondy D.**
IT342 - G5 | Cebu Institute of Technology - University

---

## 📄 License

This project is for academic purposes only — IT342 System Integration and Architecture.
