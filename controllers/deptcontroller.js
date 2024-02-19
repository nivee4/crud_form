
import db from '../models/db.js'
import dbquery from "../queries/dbquery.js";
const {selectquery,insertquery,selectById,updatequery,deletequery}=dbquery;

const dept = (req, res) => {
    selectquery('dept', (err, result) => {
        if (err) {
            console.error('Error fetching user details:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const respond = {
            message: "dept details entered successfully",
            status: "SUCCESS",
            data: result
        };
        res.send(respond);
    });
};

const insert_dept=(req,res)=>{
     
    insertquery('dept',req.body,(err,result)=>{
        if (err){
            res.status(500).send(err.message);
        }
        
        let response = {
            message:"Department inserted successfully",
            status:"SUCCESS" 
        }
        res.send(response);
        
    });

}

const par_dept=(req,res)=>{
   
        selectById('dept','dept_id',req.params.dept_id,(err,result)=>{
            if (err) {
                console.log(err);
                res.status(500).send(err.message);
                //console.log(err.message);
            };
            
            let respond={
                message:` dept ${req.params.id} is displayed`,
                status:"SUCCESS",
                data:result[0]
            }
            res.send(respond);
            
        })
    }
    

    

const update_dept=(req,res)=>{
    updatequery('dept',req.body,'dept_id',req.params.dept_id,(err,result)=>{  
        if (err) {
            res.status(500).send(err.message);
    }
    let response={
        message:` user ${req.params.dept_id} is updated`,
        status:"SUCCESS",
    }
    res.send(response);
    })  
}


  
    

const del_dept=(req,res)=>{
    deletequery('dept','dept_id',req.params.dept_id,(err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        let respond={
            message:` dept ${req.params.dept_id} is deleted`,
            status:"SUCCESS",
            
        }
        res.send(respond);
    })
    

}

export default {dept,insert_dept,par_dept,update_dept,del_dept}