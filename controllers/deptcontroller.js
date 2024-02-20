
import db from '../models/db.js'
import dbquery from "../queries/dbquery.js";
const dbqueries=dbquery;

const depart={
    dept :(req, res) => {
        const condition=req.body.condition||'';
        const attribute=req.body.attribute||['*'];
        dbqueries.selectquery('dept',attribute,condition, (err, result) => {
            if (err) {
                console.error('Error fetching dept details:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            const respond = {
                message: "Dept details entered successfully",
                status: "SUCCESS",
                data: result
            };
            res.send(respond);
        });
},
insert_dept:(req,res)=>{
     
    dbqueries.insertquery('dept',req.body,(err,result)=>{
        if (err){
            res.status(500).send(err.message);
        }
        
        let response = {
            message:"Department inserted successfully",
            status:"SUCCESS" 
        }
        res.send(response);
        
    });

},

 par_dept:(req,res)=>{
   
    dbqueries.selectById('dept','dept_id',req.params.dept_id,(err,result)=>{
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
    },
    

    

 update_dept:(req,res)=>{
    dbqueries.updatequery('dept',req.body,'dept_id',req.params.dept_id,(err,result)=>{  
        if (err) {
            res.status(500).send(err.message);
    }
    let response={
        message:` user ${req.params.dept_id} is updated`,
        status:"SUCCESS",
    }
    res.send(response);
    })  
},

  
    

del_dept:(req,res)=>{
    dbqueries.deletequery('dept','dept_id',req.params.dept_id,(err,result)=>{
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
    
},
multiDept:(req,res)=>{
    dbqueries.insertMany('dept',req.body,(err,result)=>{
        if (err) {
            console.log(err);
            res.status(500).send(err.message);
        }
        let respond={
            message:` multiple dept are inserted`,
            status:"SUCCESS"
            
        }
        res.send(respond);
    })
}
}




export default depart