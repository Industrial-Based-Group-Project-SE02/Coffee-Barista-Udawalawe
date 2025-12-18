const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected, DB name:', mongoose.connection.db.databaseName);
    const count = await mongoose.connection.db.collection('blogs').countDocuments();
    console.log('Blogs count:', count);
    await mongoose.disconnect();
  } catch (err) {
    console.error('DB check failed:', err.message || err);
    process.exit(1);
  }
})();