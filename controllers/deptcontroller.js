
import db from '../models/db.js'


const dept=(req,res)=>{
    const select='select * from dept';
    db.query(select,(err,result)=>{
        if (err) {
            return res.status(500).json(err.message);
        }
        res.send(result);
    })
}

const insert_dept=(req,res)=>{
    const {dept_id,dept_name,dept_block}=req.body;
    const insert='insert into dept(dept_id,dept_name,dept_block) values (?,?,?)';
    db.query(insert,[dept_id,dept_name,dept_block],(err,result)=>{
        if (err) {
            return res.status(500).json(err.message);
        }
        let response ={
            message:"Dept details entered successfully",
            status:"SUCCESS",
            data:result
        }
        res.send(response);
    })

}

const par_dept=(req,res)=>{
    const dept_id=req.params.dept_id;
    //console.log(req.query,"idd");

    const par="select * from dept where dept_id=?";
    db.query(par,[dept_id],(err,result)=>{
        if (err){
            res.status(500).json(err.message);
        }
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        res.json(result[0]);
    })

}

const update_dept=(req,res)=>{
    const dept_id=req.params.dept_id;
    const {dept_name,dept_block} =req.body;
    const update="update dept set dept_name=? , dept_block=? where dept_id=?";
    db.query(update,[dept_name,dept_block,dept_id],(err,result)=>{
        if (err){
            res.status(500).json(err.message);
        }
        else if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        else{
            return res.status(200).send("Department is Successfully updated");
        }
    })
}


const del_dept=(req,res)=>{
    const dept_id=req.params.dept_id;
    
    db.query("delete from dept where dept_id=?",[dept_id],(err,result)=>{
        if (err){
            res.status(500).json(err.message);
        }
        else if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        else{
            return res.status(200).send("Department is Successfully deleted ");
        }
    })

}

export default {dept,insert_dept,par_dept,update_dept,del_dept}