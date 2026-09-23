# 💎 DP Jewellers - Online Jewellery Store

Premium Gold & Diamond Jewellery E-commerce Platform built with Spring Boot + Next.js + Razorpay.

> Live GitHub: https://github.com/priyankakommana/dpjewellers

---

### ✨ Features

**Authentication & Security:**
- ✅ User Registration with Email OTP Verification
- ✅ Secure Login with JWT Authentication
- ✅ Forgot Password & Reset Password via Email OTP
- ✅ Gmail SMTP Integration for OTP Delivery
- ✅ BCrypt Password Encryption

**Payment Integration:**
- ✅ Razorpay Payment Gateway (UPI, Credit/Debit Cards, Netbanking, Wallets, EMI)
- ✅ Order Creation & Payment Verification
- ✅ Gold-Themed Checkout UI

**other Features:**
- 🛒 Product Catalog & Cart
- 📦 Order Management
- 👤 My Account / Profile
- 🔍 Admin Dashboard

### 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Java 21, Spring Boot 3.x, Spring Security, Spring Data JPA |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Database** | MySQL |
| **Authentication** | JWT, OTP Verification |
| **Payment** | Razorpay Java SDK, Razorpay Checkout.js |
| **Tools** | Maven, Git, GitHub, Postman |

### 📁 Project Structure
dpjewellers/
├── dp-jewellers-backend/   # Spring Boot API (port 8080)
│   ├── src/main/java/com/dpjewellers/
│   └── src/main/resources/application.properties
├── dp-jewellers-frontend/  # Next.js App (port 3000)
│   ├── app/
│   ├── components/
│   └── package.json
└── README.md


### 🚀 How to Run Locally

Backend:
cd dp-jewellers-backend
# Create application.properties from application.properties.example
# Add your DB, Gmail App Password, Razorpay Keys
./mvnw spring-boot:run
Backend runs on http://localhost:8080
2. Frontend:
cd dp-jewellers-frontend
npm install
npm run devFrontend runs on http://localhost:3000

Environment Variables Needed
Create application.properties:
---------------------------------------------------
spring.datasource.url=jdbc:mysql://localhost:3306/dpjewellers
spring.datasource.username=root
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=YOUR_GMAIL_APP_PASSWORD
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

jwt.secret=YOUR_32_CHAR_SECRET_KEY
razorpay.key_id=rzp_test_YourKeyId
razorpay.key_secret=YourSecretKey



👩‍💻 AuthorPriyanka KommanaGitHub: @priyankakommanaProject: DP Jewellers E-commerce Platform
