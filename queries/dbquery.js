import db from '../models/db.js';

const dbqueries={
//select  
selectquery : (table, callback) => {
    const query = `SELECT * FROM ${table}`;
    db.query(query, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        if (!rows || rows.length === 0) {
            callback(null, false); 
            return;
        }
        callback(null, rows);
    });
},


//insert
insertquery:(table,data,callback)=>{
    const keys = Object.keys(data);
    const values = Object.values(data).map(val=>{
        return `'${val}'`
    });
    const columns = keys.join(',');
    const query = `INSERT INTO ${table}(${columns}) VALUES (${values})`;
    db.query(query, values, (err, result) => {
        if (err) {
            console.log('Error executing query:', err);
            callback(err,null);
            return ;
            
        }
        console.log('Insert successful:', result);
        callback(null,result);
    });  
},
//select by id
    selectById: (table, col, val, callback) => {
    const selectId = `SELECT * FROM ${table} WHERE ${col}=?`;
    db.query(selectId, [val], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
},
//update

updatequery :(table, data, col, val, callback) => {
    let setValues = Object.values(data); 
    console.log(setValues)
    const updateKeys = Object.keys(data).map(key => `${key} = ?`).join(', ');
    console.log(updateKeys)
    const query = `UPDATE ${table} SET ${updateKeys} WHERE ${col} = ?`; 
    console.log(query)

    // Append the value to be updated to setValues array
    setValues.push(val);
    console.log(setValues)
    //const values = [...setValues, val]; // Concatenate the value to be updated
    db.query(query, setValues, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
},


//delete
 deletequery:(table,col,val,callback)=>{
    const deletequery=`delete from ${table} where ${col}=?`;
    db.query(deletequery,[val],(err,result)=>{
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    })

}

}

export default dbqueries