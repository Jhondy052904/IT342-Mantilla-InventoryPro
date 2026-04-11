InventoryPro 📦
A full-stack Mini Inventory Management System built for IT342 - System Integration and Architecture (G5).

Replaces manual paper/spreadsheet-based inventory tracking with a reliable digital system accessible via web and mobile.


🚀 Features
Web Dashboard (Admin)

🔐 JWT-based login and authentication
📋 Product management — add, edit, delete products
📊 Dashboard stats — total products, low stock, out of stock, total value
🗂️ Category management (in progress)
📈 Inventory reports (in progress)
👥 User management (in progress)

Android App (Staff)

🔐 Staff login
📦 View product list with stock levels
➕ Stock In — increase product quantity
➖ Stock Out — decrease product quantity
📝 Transaction history / stock logs


🛠️ Tech Stack
LayerTechnologyBackendJava 21, Spring Boot 3.x, Spring Security, Spring Data JPADatabasePostgreSQL 14+ (Supabase)Web FrontendReact 18, JavaScript, ViteMobileKotlin, Jetpack Compose, RetrofitAuthJWT (JSON Web Tokens) + bcryptBuild ToolsMaven (Backend), npm (Web), Gradle (Android)

📁 Project Structure
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

⚙️ Setup & Installation
Prerequisites

Java 21+
Node.js 18+
Maven
A Supabase project (PostgreSQL)


1. Clone the Repository
bashgit clone https://github.com/YOUR_USERNAME/IT342-Mantilla-InventoryPro.git
cd IT342-Mantilla-InventoryPro

2. Backend Setup
bashcd backend
Create src/main/resources/application.properties:
propertiesspring.application.name=inventorypro

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
Run the backend:
bashmvn spring-boot:run
Backend will start on http://localhost:8080

3. Web Frontend Setup
bashcd web/frontend
npm install
npm run dev
Frontend will start on http://localhost:5173

🔌 API Endpoints
Authentication
MethodEndpointDescriptionAuthPOST/api/auth/registerRegister new userNonePOST/api/auth/loginLogin and get JWT tokenNone
Products
MethodEndpointDescriptionAuthGET/api/productsGet all productsBearer TokenPOST/api/productsCreate new productBearer TokenPUT/api/products/{id}Update productBearer TokenDELETE/api/products/{id}Delete productBearer Token
Dashboard
MethodEndpointDescriptionAuthGET/api/dashboard/statsGet inventory statsBearer TokenGET/api/dashboard/trendsGet trends dataBearer TokenGET/api/dashboard/activitiesGet recent activitiesBearer Token
Stock (coming soon)
MethodEndpointDescriptionPOST/api/stock/inRecord stock in transactionPOST/api/stock/outRecord stock out transactionGET/api/stock/logsGet transaction history

🗄️ Database Schema
users              → admin/staff accounts + roles
products           → inventory catalog
categories         → product groupings
stock_transactions → every stock in/out movement
refresh_tokens     → JWT refresh token management

🔐 Environment Variables
Never commit your credentials. Make sure these are in .gitignore:
application.properties
.env

📌 Project Status
PhaseDescriptionStatusPhase 1Planning & Design✅ CompletePhase 2Backend Development✅ CompletePhase 3Web Application🔄 In ProgressPhase 4Mobile Application⏳ Not StartedPhase 5Integration & Deployment⏳ Not Started

👤 Author
Mantilla, Jhondy D.
IT342 - G5 | Cebu Institute of Technology - University

📄 License
This project is for academic purposes only — IT342 System Integration and Architecture.
