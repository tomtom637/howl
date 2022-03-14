require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const categoryRoutes = require('./routes/category');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

// HIDES CERTAIN INFORMATIONS IN THE RESPONSE HEADERS
app.use(helmet());

// CORS
const whitelist = ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3002', 'http://127.0.0.1:3002'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(corsOptions));

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// PUBLIC IMG PATH
app.use('/images', express.static(path.join(__dirname, 'images')));

//ROUTES
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'it seems you hit a wrong path...' });
});


app.listen(port, () => console.log(`server started on port ${port}`));