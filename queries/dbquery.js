
//select  
const selectquery=(table)=>{
    const select=`select * from ${table}`;
}

//insert
const insertquery=(table,data)=>{
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const columns = keys.join(', ');

    const insert=`insert into ${table}(${columns}) values (${placeholders})`;
}

//select by id
const selectById=(table,col,val)=>{
    const selectId=`select * from ${table} where ${col}=?`;
    const val=[val];
    return {selectId,val}

}

//update

const updatequery=(table,col,val)=>{
    // const selectId=`update ${table} set ${} where ${col}=?`;
    // const val=[val];
    // return {selectId,val}

}

const deletequery=(table,col,val)=>{
    const deletequery=`delete from ${table} where ${col}=?`;
    const val=[val];
    return {deletequery,val}

}