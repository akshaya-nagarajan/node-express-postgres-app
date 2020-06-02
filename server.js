const {Client} = require('pg')
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
        await client.connect()
        console.log("Connected successfully.")
        const n = 'task1'
        const {rows} = client.query("select * from \"Task\" WHERE name = \'task1\' ")
        console.table(rows)
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

const express = require('express');
const app = express();
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
app.get('/users', (request, response) => {
    
    //response.send({"rows": rows})
    //response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/tasks', (request, response) => {
    const {task_rows} = client.query('select * from \"Task\"')
    console.table(task_rows)
    //response.send({"rows": rows})
    //response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/projects', (request, response) => {
    const {project_rows} = client.query("select * from \"Project\"")
    console.table(project_rows)
    //response.send({"rows": rows})
    //response.json({ info: 'Node.js, Express, and Postgres API' })
})