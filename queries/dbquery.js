
import db from '../models/db.js';

const dbqueries={
//select  
selectquery : (table,attribute,condition,callback) => {

    let attr='';
    let str='';
    let val=[];
    if(Array.isArray(attribute) && attribute.length>0){
        attr=attribute.join(",");
    }
    else{
        attr='*';
    }
    
    for (let field in condition) {
        if (condition[field]) {
          str += `${field} = ? AND `;
          val.push(condition[field]);
        }
      }

    str=str.slice(0,-5)
        
    const query = `SELECT ${attr} FROM ${table} ${str?'where '+str:''}`;
    console.log(query)
    db.query(query,val, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
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
    console.log(values)
    const columns = keys.join(',');
    console.log(columns)
    const query = `INSERT INTO ${table}(${columns}) VALUES (${values})`;
    console.log(query)
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
    const query = `SELECT * FROM ${table} WHERE ${col}=?`;
    console.log(query)
    db.query(query, [val], (err, result) => {
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
    const query=`delete from ${table} where ${col}=?`;
    console.log(query)
    db.query(query,[val],(err,result)=>{
        if(err){
            return callback(err,null);
        }
        callback(null,result);
    })

},
insertMany: (table, dataArray, callback) => {
    const keys = Object.keys(dataArray[0]);
    const columns = keys.join(',');
    console.log(columns)
    let query = `INSERT INTO ${table} (${columns}) VALUES `;
    console.log(query)
    let values = [];
    dataArray.forEach((data, index) => {
        const rowValues = Object.values(data).map(val => {
            return `'${val}'`;
        });
        query += `(${rowValues.join(',')})`;
        if (index < dataArray.length - 1) {
            query += ', ';
        }
        values = values.concat(rowValues);
    });

    db.query(query, values, (err, result) => {
        if (err) {
            console.log('Error executing query:', err);
            callback(err, null);
            return;
        }
        console.log('Insert successful:', result);
        callback(null, result);
    });
},     

innerJoin: (table1, table2,condition1,condition2,attribute1,attribute2, callback) => {
    let attr1 = '';
    let attr2 = '';
    
    if (Array.isArray(attribute1) && attribute1.length > 0) {
        attr1 = attribute1.join(",");
    } else {
        attr1 = '*';
    }

    if (Array.isArray(attribute2) && attribute2.length > 0) {
        attr2 = attribute2.join(",");
    } else {
        attr2 = '*';
    }
    
    const selectClause1 = `${table1}.${attr1}`;
    console.log(selectClause1,condition1)
    const selectClause2 = `${table2}.${attr2}`;
    console.log(selectClause2,condition2)
    console.log(`${table1}.${condition2}`)
    const query= `SELECT ${selectClause1}, ${selectClause2} FROM ${table1} JOIN ${table2} ON ${table1}.${condition1} = ${table2}.${condition2}`;

    console.log(query); // Log the constructed SQL query

    db.query(query, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        //console.log('Insert successful:', result);
        callback(null, result);
    });
}

}


export default dbqueries