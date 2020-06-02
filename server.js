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
execute_connection()
async function execute_connection() {
    try{
        //await client.connect()
        console.log("Connected successfully.")
        
    }
    catch (ex)
    {
        console.log(`Something wrong happend ${ex}`)
    }
    finally 
    {
        //await client.end()
        //console.log("Client disconnected successfully.")    
    } 
}


app.get('/users', async (request, response) => {
    await client.connect()
    const {rows} = await client.query("select * from \"User\" ")
    console.table(rows)
    //response.send({"rows": rows})
    response.json({ info: 'Node.js, Express, and Postgres API' })
    await client.end()
  })

app.get('/tasks', async (request, response) => {
    await client.connect()
    const {task_rows} = await client.query("select * from \"Task\"")
    client.end()
    console.table(task_rows)
    //response.send({"rows": task_rows})
    //response.json({ info: 'Node.js, Express, and Postgres API' })
    response.end("something");
    
})

app.get('/projects', async (request, response) => {
    await client.connect()
    const {project_rows} = await client.query("select * from \"Project\"")
    console.table(project_rows)
    response.send({"rows": rows})
    response.json({ info: 'Node.js, Express, and Postgres API' })
    await client.end()
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