
import db from '../models/db.js';

// form 

const form=(req,res)=>{
    res.render("form")
}

// display users

const display_user=(req,res)=>{
    const find="select * from user";
    db.query(find,(err,result)=>{
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    else{
        res.send(result);
    }
    });
}

// insert users

const insert_details = (req, res) => {
    const { fname, lname, gender, address, city, state, pin ,dept_name} = req.body;
    const insert = "INSERT INTO user (fname, lname, gender, address, city, state, pin,dept_name) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
    db.query(insert, [fname, lname, gender, address, city, state, pin,dept_name], err=> {
        if (err) {
            console.log(err.message);
            return res.status(500).json({ error: err.message });
        }
         else {
            res.send("form submitted successfully");
            //res.redirect("/users")
        }
    });
}

//view user

const par_user=(req,res)=>{
    const user_id=req.params.id;
    const dis="select * from user where id=?";
    db.query(dis,user_id,(err,result)=>{
        if (err) {
            console.log("Error");
            return res.status(500).json({message:"Error"})
        };
        if(result.length===0){
            return res.status(404).json({message:"Not found"})
        }
        res.json(result[0]);

        const userid=result[0].id;
        callback(null, userid);
    })
}

//update user

const update_user=(req,res)=>{
    const id = req.params.id;
    const { fname, lname } = req.body;

    db.query('UPDATE user SET fname = ?, lname= ? WHERE id = ?', [fname,lname,id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating user');
    } else {
        res.status(200).send('User updated successfully');
    }
    })
}

//delete user

const del_user=(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM user WHERE id = ?', [id], (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error deleting user');
    } else {
        res.status(200).send('User deleted successfully');
    }
})
}





export default {display_user,insert_details,par_user,update_user,del_user}