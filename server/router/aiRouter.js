import express from 'express';
import upload from '../config/multerConfig.js';
import { analyzeResumeController } from '../controllers/aiController.js';


const router = express.Router();


router.post('/analyze-resume', upload.single('resume'), analyzeResumeController);


export default router;