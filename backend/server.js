const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
});