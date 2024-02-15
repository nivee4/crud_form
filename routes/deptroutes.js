import express from 'express';
import deptcontroller from '../controllers/deptcontroller.js';
const {dept,insert_dept,par_dept,update_dept,del_dept}=deptcontroller;

const router1=express.Router();

router1.get('/',dept);
router1.post('/',insert_dept);
router1.get('/:dept_id',par_dept)
router1.put('/:dept_id',update_dept);
router1.delete('/:dept_id',del_dept)


export default router1;