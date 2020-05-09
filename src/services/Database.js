import mongoose from 'mongoose'

export const open = ({ mongoUrl }) => {
  return new Promise((resolve, reject)=> {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true, // Build indexes
      bufferMaxEntries: 0,
      keepAlive: 1,
      poolSize: 10, // Maintain up to 10 socket connections
    }
    
    mongoose.connect(mongoUrl, options )
    
    mongoose.connection.on("error", err => {
      reject(err);
    });
    
    mongoose.connection.on("connected", err => {
      resolve();
    });
  })
}

export const close = () => {
  mongoose.disconnect();
}


