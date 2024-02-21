import dbquery from "../queries/dbquery.js";
const dbqueries=dbquery

const con={
join: (req, res) => {
    const {fname,lname} = req.body;
    const {dept_name} = req.body;
    dbqueries.innerJoin('user','dept','dept_name', 'dept_name',['fname','lname'],['dept_name'],(err, result) => {
        if (err) {
            console.error('Error:', err);
            return;
        }
        let response={
            message:"joined successfully",
            status:"SUCCESS",
            data:result
        }
        res.send(response)
    });
}
}
export default con