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
            choices: ['View all employees', 'Add Employee', 'View All Employees by Department', 'Add Department', 'View All Roles', 'View All Departments', 'Add Role', 'Update Employee Role', 'Quit'],
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
                
                case 'View All Departments':
                    viewallDepts();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Update Employee Role':
                    updateEmpRole();
                    break;

                case 'Quit':
                    process.exit();
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

// Add an employee - Done -- HELP -- convert id to name and back to id instead of printing table
async function addEmployee() {
    let role = await db.viewRoles();
    const values = Object.values(role);
    let roles = values.map(roleID => {
        return roleID.id
    });
    let employees = await db.findAllEmployees();
    const values1 = Object.values(employees);
    let employee = values1.map(empID => {
        return empID.id
    });
    let array = employee
    array.push('No Manager');
    console.table(role);
    console.table(employees);
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
            name: 'roles_id',
            message: 'What is the employees role id (see roles table for reference)?',
            choices: roles,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'What is the employees Manager_id?(see employee table for reference)?',
            choices: array,
        }
    ]).then(async function (resp) {
        let add = db.addAnEmployee(resp.first_name, resp.last_name,resp.roles_id,resp.manager_id)
        mainPrompt();
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

// Add a department - Done
async function addDept() {
    inquirer.prompt(
        {
            type: 'input',
            name: 'name',
            message: 'What is the department name?'
        }).then(async function (resp) {
            let add = db.addADepartment(resp);
            add;
            mainPrompt();
        });
}

// View all Roles - Done
async function viewallRoles() {
    let roles = await db.viewRoles();
    console.table(roles);
    mainPrompt();
}

// View all Department - Done
async function viewallDepts() {
    let department = await db.findDept();
    console.table(department);
    mainPrompt();
}

// Add a Role - Done -- convert id to name and back to id instead of printing table
async function addRole() {
    let dept = await db.findDept();
    const values = Object.values(dept);
    let departID = values.map(deptName => {
        return deptName.id
    });
    console.table(dept);
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What is the department ID number (see table for list of departments and associated IDs)',
            choices: departID
        }
    ]).then(async function (resp) {
            let add = db.addARole(resp);
            add;
            mainPrompt();
        });
}

// Update Employee Role - Done -- convert id to first and last name and back to id instead of printing table
async function updateEmpRole() {
    let role = await db.viewRoles();
    const values = Object.values(role);
    let roles = values.map(roleID => {
        return roleID.id
    });
    let employees = await db.findAllEmployees();
    const values1 = Object.values(employees);
    let employee = values1.map(empID => {
        return empID.id
    });
    console.table(employees);
    console.table(role);
    inquirer.prompt([
        {
            type: 'list',
            name: 'last_name',
            message: 'What is the employees id (see table for reference)?',
            choices: employee
        },
        {
            type: 'list',
            name: 'roles_id',
            message: 'What is the employees new role id (see roles table for reference)?',
            choices: roles,
        },
        
    ]).then(async function (resp) {
        let add = db.updateRole(resp.last_name,resp.roles_id)
        mainPrompt();
    });

}

mainPrompt();