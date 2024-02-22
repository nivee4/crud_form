
//import db from '../models/db.js';
import dbquery from "../queries/dbquery.js";
const dbqueries=dbquery

const users={

// display users
display_user: async (req, res) => {
    try {
        const condition = req.query || '';
        const { fname, lname } = req.body;
        let result = await dbqueries.selectquery('user', condition);
        let respond = {
            message: "Users details retrieved successfully",
            status: "SUCCESS",
            data: result
        };
        res.send(respond);
    } catch (error) {
        console.error('Error displaying user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},     


// insert users
insert_details:async (req, res) => {
    try{
        await dbqueries.insertquery('user',req.body);
        let response = {
        message:"user inserted successfully",
        status:"SUCCESS" 
        }
        res.send(response)
    }
    catch(err){
        console.error('Error inserting user details:', err);
        res.status(500).send(err.message);
    }
},
                    


//view user
par_user:async(req,res)=>{
    try{
        let result=await dbqueries.selectById('user','id',req.params.id)
        
            if(result.length===0){
                return res.status(404).json({message:"Not found"})
            }
            let respond={
                message:` user ${req.params.id} is displayed`,
                status:"SUCCESS",
                data:result[0]
            }
            res.send(respond);
        }
    catch(err){
        console.error('Error displaying particular user :', err);
        res.status(500).send(err.message);
    }
    
},

//update user

update_user:async(req,res)=>{
    try{
        let result=await dbqueries.updatequery('user',req.body,'id',req.params.id)
        let response={
            message:` user ${req.params.id} is updated`,
            status:"SUCCESS",
            data:result[0]
        }
        res.send(response); 
    }
    catch(err){
        console.error('Error updating user details:', err);
        res.status(500).send(err.message);
    }
    },


//delete user

del_user:async(req,res)=>{
    try{
        const result=await dbqueries.deletequery('user','id',req.params.id)
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        let respond={
            message:` user ${req.params.id} is deleted`,
            status:"SUCCESS",
            
        }
        res.send(respond);
    }
    catch(err){
        console.log(err);
            console.error('Error deleting user details:', err);
            res.status(500).send(err.message);throw err;
    }
    
},

multiUser:async(req,res)=>{
    try{
        const result=await dbqueries.insertMany('user',req.body)
        let respond={
            message:` multiple users are inserted`,
            status:"SUCCESS"  
        }
        res.send(respond);
    }
    catch(err){
        console.error('Error fetching multiple user details:', err);
            res.status(500).send(err.message);
    }
}



}


export default users