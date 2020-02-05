import mongoose from 'mongoose';


export default function database(): void {

  mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

  const connection = mongoose.connection;

  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', function() {
    console.log(`Connected with database using the connection striong ${process.env.MONGO_CONNECTION}`);
  });
}