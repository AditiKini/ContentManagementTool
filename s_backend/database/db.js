import mongoose from 'mongoose';

const DBConnection = async (uname, pass) => {
    const URL = `mongodb+srv://${uname}:${pass}@blog-application.x0c2dec.mongodb.net/`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully!!');

    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default DBConnection;