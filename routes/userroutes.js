import express from 'express';
import usercontroller from '../controllers/usercontroller.js'
const {par_user,insert_details,display_user,update_user,del_user}=usercontroller;
const router = express.Router();

//router.get('/',form);
router.post('/',insert_details);
router.get('/',display_user);
router.get('/:id',par_user);
router.put('/:id',update_user);
router.delete('/:id',del_user);




export default router;
