import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

const app = express();

dotenv.config({
    path: path.resolve(
        __dirname, 
        `./environments/${process.env.NODE_ENV}.env`
    )
});

app.get('/', (req, res, next) => {
    res.send("Hello");
});

app.listen(process.env.PORT, () => {
    console.log(`App server is running at port ${process.env.PORT}.`);
    console.log(`DEBUG: node_env: ${process.env.NODE_ENV}`);
});