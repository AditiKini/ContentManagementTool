import mongoose from 'mongoose';
import grid from 'gridfs-stream';

const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const connection = mongoose.connection;
connection.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
        bucketName: 'fs'
    });
    gfs = grid(connection.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadFile = (req, res) => {
    if(!req.file){
        return res.status(404).json("File not Found!! Please Upload File Again");
    }
    const imageUrl = `${url}/file/${req.file.filename}`;

    res.status(200).json(imageUrl);    
}


export const getImage = async (req, res) => {
    try {   
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}