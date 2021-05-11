const inquirer = require('inquirer');
const db = require('./db/db.js');
let array = [];

//write some inquirer prompts

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
                    mainPrompt();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'View All Employees by Department':
                    //viewAllByDept();
                    break;

                case 'Add Department':
                    //addDept();
                    break;

                case 'View All Roles':
                    //viewallRoles();
                    break;

                case 'Add Role':
                    //addRole();
                    break;

                case 'Update Employee Role':
                    //updateEmpRole();
                    break;

                case 'Quit':
                    break;
            }
            //console.log(resp);
        });
}

async function viewEmployees() {
    let employees = await db.findAllEmployees();
    console.table(employees);
}

async function findDepart() {
    let dept = await db.findDept();
    let department = JSON.stringify(dept);
    console.log(department);
}

async function addEmployee() {
    let dept = await db.findDept();
    let department = JSON.stringify(dept);
    let array = JSON.parse(department);
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employees last name?'
            },
            {
                type: 'list',
                name: 'empRole',
                message: 'What is the employees role?',
                choices: ['HELP'],
            },
            {
                type: 'list',
                name: 'empMan',
                message: 'Who is the employees Manager?',
                choices: ['HELP'],
            }
        ]).then((resp) => {
            mainPrompt();
            console.log(resp);
        });
    
}


viewEmployees();
findDepart();
mainPrompt();