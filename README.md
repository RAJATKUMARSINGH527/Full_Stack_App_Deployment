# Full-Stack App: Deployment & Documentation

## 🚀 Overview
This is a full-stack application with a backend built using Node.js, Express, and MongoDB, and a frontend developed using React and Vite. The application includes JWT-based authentication and CRUD operations for products.

---

## 📌 Features
✅ User Authentication (Login & Signup)  
✅ CRUD operations for products  
✅ Token-based authentication with protected routes  
✅ Responsive design using Material-UI  
✅ Role-based authorization (admin & user) *(optional)*  
✅ JWT Refresh Tokens *(optional)*  

---

## 🏗️ Frontend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/FullStackFrontEnd.git
   cd FullStackFrontEnd
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the project:
   ```sh
   npm run dev
   ```

Ensure the backend is running before using the frontend.

---

## 🏗️ Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/FullStackBackEnd.git
   cd FullStackBackEnd
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```sh
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the server:
   ```sh
   npm start
   ```

---

## 🔗 Backend API
### API Endpoints
| Method | Endpoint        | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/auth/signup` | Register a new user                 |
| POST   | `/auth/login`  | Authenticate user and return JWT    |
| GET    | `/products`    | Get all products (protected)        |
| POST   | `/products`    | Create a new product (admin only)   |

### Authentication & Authorization
- JWT-based authentication using `jsonwebtoken`.
- Middleware for role-based access (`admin`, `user`).

---

## 🚀 Deployment Instructions

### Backend Deployment
#### Deploy on Render:
1. Push the latest changes:
   ```sh
   git push origin main
   ```
2. Configure environment variables:
   - `MONGO_URI=<your-mongodb-uri>`
   - `JWT_SECRET=<your-secret-key>`
3. Deploy via Render dashboard.

#### Deploy on Railway:
1. Run the deployment command:
   ```sh
   railway up
   ```
2. Set up environment variables in the Railway dashboard.

### Frontend Deployment
1. Build the frontend:
   ```sh
   npm run build
   ```
2. Deploy to Netlify/Vercel:
   - Upload the `dist/` folder.
   - Set backend API URL in environment variables.

🌍 **Live Demo:** [Deployed App Link](https://your-app.vercel.app)

---

## 🔄 Bonus Features (Optional)
### JWT Refresh Tokens
- Access tokens expire in 15 minutes.
- Refresh tokens are stored securely and used to obtain new access tokens.
- Use `POST /auth/token` to refresh tokens.

### Role-Based Authorization
- Users have different roles (`admin`, `user`).
- Certain actions (e.g., creating a product) are restricted to admins.

---

## 📚 Additional Notes
- Ensure that CORS is properly configured if hosting frontend and backend separately.
- Use `.env` files to securely manage sensitive credentials.
- For production, use HTTPS to secure API calls.

---

### 🚀 Happy Coding! 🎉