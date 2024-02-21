import express from 'express';
import controller from '../controllers/controller.js'
const con=controller;
const routers = express.Router();

routers.get('/alldetails',con.join);

export default routers