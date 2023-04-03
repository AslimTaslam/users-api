import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import userRoute from './routes/user-routes.js';

config();
const app = express();
const PORT = process.env.PORT || 3000;

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

// routes
app.use('/api/user', userRoute);

app.listen(PORT, () => console.log(`Server working on PORT ${PORT}`));
