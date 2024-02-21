
//import db from '../models/db.js';
import dbquery from "../queries/dbquery.js";
const dbqueries=dbquery
// form 
const users={

// display users
display_user: (req, res) => {
    // const result = await selectquery("user");
    const condition = req.query || '';
        const {fname,lname} = req.body;

dbqueries.selectquery('user',['fname','lname'],condition, (err, result) => {
        if (err) {
            console.error('Error displaying user details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const respond = {
            message: "Users details entered successfully",
            status: "SUCCESS",
            data: result
        };
        res.send(respond);
    });
},
       


// insert users

insert_details: (req, res) => {
    dbqueries.insertquery('user',req.body,(err,result)=>{
        if (err){
            console.error('Error inserting user details:', err);
            res.status(500).send(err.message);
        }
        let response = {
            message:"user inserted successfully",
            status:"SUCCESS" 
        }
        res.send(response);
    }); 
},
                    


//view user

par_user:(req,res)=>{
    dbqueries.selectById('user','id',req.params.id,(err,result)=>{
        if (err) {
            console.error('Error displaying particular user :', err);
            res.status(500).send(err.message);
            
        };
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        let respond={
            message:` user ${req.params.id} is displayed`,
            status:"SUCCESS",
            data:result[0]
        }
        res.send(respond);
        
    })
},

//update user

update_user:(req,res)=>{
    dbqueries.updatequery('user',req.body,'id',req.params.id,(err,result)=>{
        if (err) {
            console.error('Error updating user details:', err);
            res.status(500).send(err.message);
    }
    let response={
        message:` user ${req.params.id} is updated`,
        status:"SUCCESS",
        data:result[0]
    }
    res.send(response);
    })  
    },


//delete user

del_user:(req,res)=>{
    dbqueries.deletequery('user','id',req.params.id,(err,result)=>{
        if (err) {
            console.log(err);
            console.error('Error deleting user details:', err);
            res.status(500).send(err.message);
        }
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        let respond={
            message:` user ${req.params.id} is deleted`,
            status:"SUCCESS",
            
        }
        res.send(respond);
    })
},

multiUser:(req,res)=>{
    dbqueries.insertMany('user',req.body,(err,result)=>{
        if (err) {
            console.error('Error fetching multiple user details:', err);
            res.status(500).send(err.message);
        }
        let respond={
            message:` multiple users are inserted`,
            status:"SUCCESS"
            
        }
        res.send(respond);
    })
}



}


export default users