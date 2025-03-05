const express = require('express'); 
const {connectToDB} = require('./config/db');
const authRoutes  = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

//middleware to pass the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to pass the form data from the frontend to the backend server 

// app.use(cors(
//     {
//         Origin:"https://full-stack-app-deployment.vercel.app/",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true,
//         allowedHeaders: ['Content-Type', 'Authorization'],
        
//     }
// ));   //to allow cross origin requests from the frontend to the backend server
//  because the frontend and backend are running on different ports so we need to allow the cross origin requests 
//  from the frontend to the backend server so that the frontend can communicate with the backend server 


// app.use(cors());   //to allow cross origin requests from the frontend to the backend server


const whitelist = [process.env.FRONTEND_URL, process.env.DEPLOYED_FE_URL];

const corsOptions = (req, callback) => {
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    callback(null, {
      origin: req.header("Origin"), //// Automatically reflects the request's origin if in the whitelist
      credentials: true,
      methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    }); // reflect (enable) the requested origin in the CORS response
  } else {
    callback(null, {origin: false}); // Deny CORS if not in whitelist
  }
};
app.use(cors(corsOptions));



app.use("/auth", authRoutes);

app.use("/products", productRoutes);



const PORT = process.env.PORT || 9999;

app.listen(PORT, async() => {
    try {
        await connectToDB();
        console.log(`Server is running on port http://localhost:${PORT}`);
    } catch (error) {   
        console.log('Error:', error);
    }
    
});