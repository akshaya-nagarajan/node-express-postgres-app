const {Client} = require('pg')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
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

async function execute_all_task() {
    const {rows} = await client.query("select * from \"Task\" ")
    return rows;
}

async function execute_task(taskName) {
    const {rows} = await client.query("select * from \"Task\"  where name = $1", [taskName])
    return rows;
}

async function execute_all_project() {
    const {rows} = await client.query("select * from \"Project\"  ")
    return rows;
}

async function execute_project(projectName) {
    const {rows} = await client.query("select * from \"Project\" where name = $1", [projectName])
    return rows;
}

async function execute_all_user() {
    const {rows} = await client.query("select * from \"User\"  ")
    return rows;
}

async function execute_user(userName) {
    const {rows} = await client.query("select * from \"User\" where name = $1", [userName])
    return rows;
}

async function execute_user_surname(surName) {
    const {rows} = await client.query("select * from \"User\" where surname = $1", [surName])
    return rows;
}
execute_connection()

app.get('/tasks', async (request, response) => {
    rows=await execute_all_task()
    console.table(rows)
    response.render("tasks.ejs", {"rows": rows})
})

app.post('/tasks/search', async (request, response) => {
    rows=await execute_task(request.body.taskname)
    console.table(rows)
    response.render("tasks.ejs", {"rows": rows})
})

app.get('/projects', async (request, response) => {
    rows=await execute_all_project()
    console.table(rows)
    response.render("projects.ejs", {"rows": rows})
})

app.post('/projects/search', async (request, response) => {
    rows=await execute_project(request.body.projectname)
    console.table(rows)
    response.render("projects.ejs", {"rows": rows})
})

app.get('/users', async (request, response) => {
    rows=await execute_all_user()
    console.table(rows)
    response.render("users.ejs", {"rows": rows})
})

app.get('/', async (request, response) => {
    response.render("home.ejs")
}) 

app.post('/users/search', async (request, response) => {
    if(request.body.username) {
        rows=await execute_user(request.body.username)
    }
    if(request.body.surname) {
        rows=await execute_user_surname(request.body.surname)
    }
    console.table(rows)
    response.render("users.ejs", {"rows": rows})
})

execute_express()
async function execute_express() {
    try{
        app.listen(5002, () => { 
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