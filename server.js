'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const msgDraftHandler = require('./modules/msgDraftHandler');
const verifyUser = require('./modules/Authorize');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongoose is connected'));

// Default route
app.get('/', (req, res) => {
  res.status(200).send('Your default route is working');
});

app.use(verifyUser); // Requires all routes below to verify user first.

// ROUTES
app.get('/message-drafts', msgDraftHandler.getDrafts);
app.post('/message-drafts', msgDraftHandler.addDraft);
app.patch('/message-drafts/:id', msgDraftHandler.editDraft);
app.delete('/message-drafts/:id', msgDraftHandler.deleteDraft);

// Handles all server errors
app.use((error, req, res, next) => {
  res.status(500).json(error.message);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


