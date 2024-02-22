import dbquery from "../queries/dbquery.js";
const dbqueries=dbquery

const con={
join:async(req, res) => {
    try{
        const {fname,lname} = req.body;
        const {dept_name} = req.body;
        const result=await dbqueries.innerJoin('user','dept','dept_name', 'dept_name',['fname','lname'],['dept_name']);
        let response={
            message:"joined successfully",
            status:"SUCCESS",
            data:result
        }
        res.send(response)
    }
    catch(err){
        console.error('Error:', err);
    }
    
}
}
export default con