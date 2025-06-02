# MERN Stack eCommerce Project

A full-stack eCommerce application built with MongoDB, Express.js, React.js, and Node.js.

## Features

### Frontend (React + Vite)
- ✅ Modern React with Vite for fast development
- ✅ Tailwind CSS for responsive styling
- ✅ Framer Motion for smooth animations
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ React Hot Toast for notifications

### Backend (Node.js + Express)
- ✅ RESTful API with Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ CORS enabled

### eCommerce Features
- ✅ Product listing with DummyJSON API
- ✅ Search and filter products
- ✅ Sort by price, rating, name
- ✅ Shopping cart functionality
- ✅ User authentication (login/signup)
- ✅ Responsive design
- ✅ Cart persistence (localStorage + MongoDB)

## Project Structure

\`\`\`
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context providers
│   │   ├── pages/           # Page components
│   │   └── main.jsx         # App entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── config/              # Database config
│   ├── server.js            # Server entry point
│   └── package.json
│
└── README.md
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Backend Setup
1. Navigate to backend folder:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup
1. Navigate to frontend folder:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file:
   \`\`\`env
   VITE_API_URL=http://localhost:5000/api
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Deployment

### Frontend (Vercel)
1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy to Vercel:
   - Connect your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy automatically

### Backend (Render)
1. Create a new web service on Render
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `FRONTEND_URL`: Your deployed frontend URL
4. Deploy automatically

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `PUT /api/cart/:productId` - Update cart item quantity (protected)
- `DELETE /api/cart` - Clear cart (protected)

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- React Hot Toast
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- Express Validator

## Features in Detail

### Product Management
- Fetches products from DummyJSON API
- Displays product images, titles, prices in INR
- Product search by title and brand
- Category-based filtering
- Price sorting (low to high, high to low)
- Rating-based sorting

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Cart persistence for logged-in users
- Local storage for guest users
- Real-time cart count in navbar

### User Authentication
- Secure user registration
- JWT-based authentication
- Password hashing
- Protected routes
- Automatic login persistence

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Responsive navigation
- Mobile-optimized cart
- Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
