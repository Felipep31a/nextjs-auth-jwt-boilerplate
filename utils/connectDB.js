import mongoose from 'mongoose'

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    return mongoose.connect(process.env.MONGODB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }, err => {
        if(err) throw err;
    })
}

export default connectDB