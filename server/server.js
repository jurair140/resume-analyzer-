import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRouter from './router/aiRouter.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/ai', aiRouter);


app.get('/', (req, res) => {
res.send('Hello from the Resume ATS checker server!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));