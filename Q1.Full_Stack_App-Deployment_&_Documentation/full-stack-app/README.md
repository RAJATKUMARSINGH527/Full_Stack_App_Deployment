# Full-Stack App: Deployment & Documentation

## Frontend (React)

### Setup Instructions
1. Clone the repository:
   ```sh
   git clone <frontend-repo-url>
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the required environment variables:
   ```sh
   VITE_API_BASE_URL=<your-backend-url>
   ```
4. Start the application:
   ```sh
   npm run dev
   ```

### Code Structure
- **Components/**: Reusable UI components.
- **Pages/**: Main views (Login, Dashboard, etc.).
- **Services/**: API interaction logic.
- **Context/**: State management using Context API.

### Usage Instructions
- **Register/Login**: Enter credentials and authenticate.
- **CRUD Operations**: Only authenticated users can perform create, read, update, and delete actions.

### API Endpoints Used
- `POST /auth/signup`: Register a user.
- `POST /auth/login`: Authenticate user.
- `GET /products`: Fetch products (protected route).
- `POST /products`: Create a new product (admin only).

### Authentication Handling
- JWT is stored in `localStorage`.
- Protected routes are implemented using React Router.

### Deployment Instructions
1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy to Vercel:
   ```sh
   vercel
   ```
   or Netlify:
   ```sh
   netlify deploy --prod
   ```

---

## Backend (Node.js, Express, MongoDB)

### Setup Instructions
1. Clone the repository:
   ```sh
   git clone <backend-repo-url>
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```sh
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the server:
   ```sh
   npm start
   ```

### API Documentation
| Method | Endpoint | Description |
|--------|------------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Authenticate user and return JWT |
| GET | `/products` | Get all products (protected) |
| POST | `/products` | Create a new product (admin only) |

### Authentication & Authorization
- JWT-based authentication using `jsonwebtoken`.
- Middleware for role-based access (`admin`, `user`).

### Deployment Instructions
1. Deploy to Render:
   ```sh
   git push origin main
   ```
   - Configure MongoDB URI and JWT secret in environment variables.

2. Deploy to Railway:
   ```sh
   railway up
   ```

### Bonus: JWT Refresh Tokens (Optional)
- Access tokens expire in 15 minutes.
- Refresh tokens are stored securely and used to obtain new access tokens.
- `POST /auth/token` is used to refresh tokens.

### Bonus: Role-Based Authorization (Optional)
- Users have different roles (`admin`, `user`).
- Certain actions (e.g., creating a product) are restricted to admins.
