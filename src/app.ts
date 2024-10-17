import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';
import providerRoutes from './routes/providerRoutes';
import { setupSwagger } from './swagger';
import errorHandler from './middleware/errorHandler';

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

setupSwagger(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/api/email', emailRoutes);
app.use('/api/providers', providerRoutes);
app.use(errorHandler);

export default app;
