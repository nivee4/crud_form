
import db from '../models/db.js';
import dbquery from "../queries/dbquery.js";
const {selectquery,insertquery,selectById,updatequery,deletequery}=dbquery
// form 

const form=(req,res)=>{
    res.render("form")
}

// display users

const display_user = (req, res) => {
    selectquery('user', (err, result) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const respond = {
            message: "Users details entered successfully",
            status: "SUCCESS",
            data: result
        };
        res.send(respond);
    });
};
       


// insert users

const insert_details = (req, res) => {
    insertquery('user',req.body,(err,result)=>{
        if (err){
            res.status(500).send(err.message);
        }
        let response = {
            message:"user inserted successfully",
            status:"SUCCESS" 
        }
        res.send(response);
    }); 
}
                    


//view user

const par_user=(req,res)=>{
    selectById('user','id',req.params.id,(err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
            //console.log(err.message);
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
}

//update user

const update_user=(req,res)=>{
    const update=updatequery('user',req.body,'id',req.params.id,(err,result)=>{
        if (err) {
            res.status(500).send(err.message);
    }
    let response={
        message:` user ${req.params.id} is updated`,
        status:"SUCCESS",
        data:result[0]
    }
    res.send(response);
    })  
    }


//delete user

const del_user=(req,res)=>{
    deletequery('user','id',req.params.id,(err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        let respond={
            message:` user ${req.params.dept_id} is deleted`,
            status:"SUCCESS",
            
        }
        res.send(respond);
    })
}





export default {display_user,insert_details,par_user,update_user,del_user}