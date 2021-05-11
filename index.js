const inquirer = require('inquirer');
const db = require('./db/db');

//write some inquirer prompts

async function viewEmployees () {
    let employees = await db.findAllEmployees();
    console.table(employees);
}

viewEmployees();