const {client} = require('./dbConfig');

// Insert One document
const insertOne = async () => {
    try {
        const database = client.db('mydb');
        const users = database.collection('users');
        const data = {username:"mehedi",email:"test@gmail.com",phone:"01730645645",city:"Dhaka"};
        const result = await users.insertOne(data);
        console.log(`Data inserted success id = ${result.insertedId}`);
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// insertOne();

// Insert Many document
const insertMany = async () => {
    try{
        const database = client.db('mydb');
        const users = database.collection('users');
        const datas = [
            {username:"mehedi1",email:"test1@gmail.com",phone:"01730645645",city:"Dhaka"},
            {username:"mehedi2",email:"test2@gmail.com",phone:"01730645645",city:"Dhaka"},
            {username:"mehedi3",email:"test3@gmail.com",phone:"01730645645",city:"Brahmanbaria"},
            {username:"mehedi4",email:"test4@gmail.com",phone:"01730645645",city:"Brahmanbaria"},
            {username:"mehedi5",email:"test5@gmail.com",phone:"01730645645",city:"Cumilla"},
            {username:"mehedi6",email:"test6@gmail.com",phone:"01730645645",city:"Cumilla"}
        ];
        const result = await users.insertMany(datas);
        console.log(`Data inserted success. total = ${result.insertedCount}`);
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// insertMany();

// Read One document
const ReadOne = async () => {
    try{
        const database = client.db('mydb');
        const users = database.collection('users');
        const query = {username:"mehedi2"};
        const result = await users.findOne(query);
        console.log(result);
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// ReadOne();

// Read Many document
const ReadMany = async () => {
    try{
        const database = client.db('mydb');
        const users = database.collection('users');
        const query = {city:"Cumilla"};
        const cursor = await users.find(query);
        console.log(await cursor.toArray());
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// ReadMany();

// Update one document 
const UpdateOne = async () => {
    try {
        const database = client.db('mydb');
        const users = database.collection('users');
        const query = {username:"mehedi"};
        const newData = {$set:{city:"Cumilla",phone:"00000000000"}};
        const option = {upsert:true};
        await users.updateOne(query,newData,option);
        console.log('Document updated success');
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// UpdateOne();

// Update Many document 
const UpdateMany = async () => {
    try {
        const database = client.db('mydb');
        const users = database.collection('users');
        const query = {city:"Cumilla"};
        const newData = {$set:{phone:"00000000000"}};
        const result = await users.updateMany(query,newData);
        console.log(`Document updated ${result.modifiedCount}`);
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// UpdateMany();

// Delete one document 
const DeleteOne = async () => {
    try {
        const database = client.db('mydb');
        const users = database.collection('users');
        const query = {username:"mehedi"};
        const result = await users.deleteOne(query);
        if(result.deletedCount == 1){
            console.log(`Document deleted success`);
        }else{
            console.log(`Document not found`);
        }
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// DeleteOne();

// Delete many document 
const DeleteMany = async () => {
    try {
        const database = client.db('mydb');
        const users = database.collection('users');
        const query = {};
        const result = await users.deleteMany(query);
        console.log(`Deleted ${result.deletedCount} documents`);
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}
// DeleteMany();


