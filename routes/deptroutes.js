import express from 'express';
import deptcontroller from '../controllers/deptcontroller.js';
const depart=deptcontroller;

const router1=express.Router();

router1.get('/',depart.dept);
router1.post('/',depart.insert_dept);
router1.get('/:dept_id',depart.par_dept)
router1.put('/:dept_id',depart.update_dept);
router1.delete('/:dept_id',depart.del_dept)


export default router1;