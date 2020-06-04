const {Client} = require('pg')
const express = require('express');
const app = express();

const client = new Client({
    user: "postgresadmin",
    password: "postgresadmin",
    host: "newtest.cwvtqcrhhnxw.us-east-1.rds.amazonaws.com",
    port: 5432,
    database: "testinstancedb"
})

async function execute_connection() {
    await client.connect()
    console.log("Connected successfully.")
}

async function execute_connection_close() {
    await client.end() 
}

async function execute_task() {
    const {rows} = await client.query("select * from \"Task\"  ")
    return rows;
}
async function execute_project() {
    const {rows} = await client.query("select * from \"Project\"  ")
    return rows;
}
async function execute_user() {
    const {rows} = await client.query("select * from \"User\"  ")
    return rows;
}

execute_connection()
app.get('/tasks', async (request, response) => {
    rows=await execute_task()
    console.table(rows)
    response.send({"rows": rows})
})

app.get('/projects', async (request, response) => {
    rows=await execute_project()
    console.table(rows)
    response.send({"rows": rows})
})

app.get('/users', async (request, response) => {
    rows=await execute_user()
    console.table(rows)
    response.send({"rows": rows})
})

execute_express()
async function execute_express() {
    try{
        app.listen(5002, () => { //5005, 5001
            console.log('Listening on port 5002');
        });
    }
    catch (ex)
    {
        console.log(`Something wrong happend`);
    }
    finally 
    {
        console.log(`Finally block`);
    }
}