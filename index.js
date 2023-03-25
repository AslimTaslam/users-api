import { config } from 'dotenv';
import express from 'express';
import userRoute from './routes/user-routes.js';

config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/user', userRoute);

app.listen(PORT, () => console.log(`Server working on PORT ${PORT}`));
