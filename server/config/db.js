const mongoose = require('mongoose');

const db_url = process.env.DB_URL ;
// || "mongodb://localhost:27017/engage"  ;


  mongoose.connect(db_url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('MongoDB Connected!')    
 

// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
