import express from 'express';
import usercontroller from '../controllers/usercontroller.js'
const users=usercontroller;
const router = express.Router();

//router.get('/',form);
router.post('/',users.insert_details);
router.get('/',users.display_user);
router.post('/all',users.multiUser)
router.get('/:id',users.par_user);
router.put('/:id',users.update_user);
router.delete('/:id',users.del_user);




export default router;
