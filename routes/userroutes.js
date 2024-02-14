import express from 'express';
import usercontroller from '../controllers/usercontroller.js'
const {par_user,form,insert_details,display_user,update_user,del_user}=usercontroller;
const router = express.Router();

router.get('/',form);
router.post('/users',insert_details);
router.get('/users',display_user);
router.get('/users/:id',par_user);
router.put('/users/:id',update_user);
router.delete('/users/:id',del_user);




export default router;
