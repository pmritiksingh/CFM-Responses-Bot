import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import runHandler from './api/run.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/run', runHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
