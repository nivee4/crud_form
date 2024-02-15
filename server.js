import express from 'express';
import cors from 'cors';
import router from './routes/userroutes.js';
import router1 from './routes/deptroutes.js';
//import path from "path";

const app = express();
app.use(express.json())

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
//app.set('views', path.join(__dirname, 'views'));

//app.use(cors());

// Mount the router middleware
app.use('/users', router);
app.use('/dept',router1)

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});