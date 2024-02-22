
import db from '../models/db.js'
import dbquery from "../queries/dbquery.js";
const dbqueries=dbquery;

const depart={
    dept:async (req, res) => {
        try {
            const condition = req.query || '';
            const { dept_name,dept_block } = req.body;
            let result = await dbqueries.selectquery('dept', condition);
            let respond = {
                message: "Dept details retrieved successfully",
                status: "SUCCESS",
                data: result
            };
            res.send(respond);
        } catch (error) {
            console.error('Error displaying user details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }, 
insert_dept:async (req, res) => {
    try{
        await dbqueries.insertquery('dept',req.body);
        let response = {
        message:"Dept inserted successfully",
        status:"SUCCESS" 
        }
        res.send(response)
    }
    catch(err){
        console.error('Error inserting dept details:', err);
        res.status(500).send(err.message);
    }

},

 par_dept:async(req,res)=>{
    try{
        let result=await dbqueries.selectById('dept','id',req.params.id)
        
            if(result.length===0){
                return res.status(404).json({message:"Not found"})
            }
            let respond={
                message:` dept ${req.params.id} is displayed`,
                status:"SUCCESS",
                data:result[0]
            }
            res.send(respond);
        }
    catch(err){
        console.error('Error displaying particular dept :', err);
        res.status(500).send(err.message);
    }
    },
    

    

 update_dept:async(req,res)=>{
    try{
        let result=await dbqueries.updatequery('dept',req.body,'dept_id',req.params.id)
        let response={
            message:` dept ${req.params.dept_id} is updated`,
            status:"SUCCESS",
            data:result[0]
        }
        res.send(response); 
    }
    catch(err){
        console.error('Error updating dept details:', err);
        res.status(500).send(err.message);
    }
    },

  
    

del_dept:async(req,res)=>{
    try{
        const result=await dbqueries.deletequery('dept','dept_id',req.params.dept_id)
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        let respond={
            message:` dept ${req.params.id} is deleted`,
            status:"SUCCESS",
            
        }
        res.send(respond);
    }
    catch(err){
        console.log(err);
            console.error('Error deleting dept details:', err);
            res.status(500).send(err.message);throw err;
    }
},
multiDept:async(req,res)=>{
    try{
            const result=await  dbqueries.insertMany('dept',req.body)
            let respond={
                message:` multiple dept are inserted`,
                status:"SUCCESS"  
            }
            res.send(respond);
        }
        catch(err){
            console.error('Error fetching multiple dept details:', err);
                res.status(500).send(err.message);
        }
},


}

export default depart
