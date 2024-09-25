const logger = require('./utils/logger');
const config = require('./utils/config');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.set('strictQuery','false');

logger.info("Connecting to MongoDB...");

mongoose.connect(config.MONGODB_URI)
  .then(()=>{
    logger.info("Connected to MongoDB...");

    // start the server
    app.listen (config.PORT, ()=>{
      logger.info(`Server running on Port ${config.PORT}...`);
    });
  })
  .catch((error)=>{
    logger.error("Error connecting to MongoDB:",error.message);
  })