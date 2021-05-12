const inquirer = require('inquirer');
const db = require('./db/db.js');
const connection = require('./db/connection');

//write some inquirer prompts

// Main prompt - Done
const mainPrompt = () => {
    inquirer.prompt(
        {
            type: 'list',
            name: 'init',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add Employee', 'View All Employees by Department', 'Add Department', 'View All Roles', 'Add Role', 'Update Employee Role', 'Quit'],
        }).then((resp) => {
            switch (resp.init) {
                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'View All Employees by Department':
                    viewAllByDept();
                    break;

                case 'Add Department':
                    addDept();
                    break;

                case 'View All Roles':
                    viewallRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Update Employee Role':
                    updateEmpRole();
                    break;

                case 'Quit':
                    break;
            }
        });
}

// View all employess on one table - Done
async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.table(employees);
    mainPrompt();
}

// Add an employee - In Progress ?
async function addEmployee() {
    let dept = await db.findDept();
    const values = Object.values(dept);
    let department = values.map(deptName => {
        return deptName.name
    });
    console.log(dept);
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'roles_name',
            message: 'What is the employees role?',
            choices: department,
        },
        {
            type: 'list',
            name: 'manager_name',
            message: 'Who is the employees Manager?',
            choices: ['HELP'],
        }
    ]).then((resp) => {
        //reverse engineer roles_id and manager_id
        // if resp= this then resp.roles_id = that 
        //addAnEmployee
        // add employee to database
        mainPrompt();
        console.log(resp);
    });

}

// View all employees based on Department selected - Done
async function viewAllByDept() {
    let dept = await db.findDept();
    const values = Object.values(dept);
    let departID = values.map(deptName => {
        return deptName.name
    });
    console.log(departID);
    inquirer.prompt({
        type: 'list',
        name: 'depts',
        message: 'Please select a Department',
        choices: departID
    }
    ).then(async function (resp) {
        let department = await db.findByDept(resp.depts);
        console.table(department);
        mainPrompt();
    });
}

// Add a department - In Progress ?
async function addDept() {
    let dept = await db.findDept();
    const values = Object.values(dept);
    let department = values.map(deptName => {
        return deptName.name
    });
    console.log(department);
}

// View all Roles - Done
async function viewallRoles() {
    let roles = await db.viewRoles();
    console.table(roles);
    mainPrompt();
}

// Add a Role - In Progress
async function addRole() {

    mainPrompt();
}

// Update Employee Role - In Progress
async function updateEmpRole() {

    mainPrompt();
}

viewEmployees();
//mainPrompt();