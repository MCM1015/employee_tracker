const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    // CONCAT all three tables together - Done
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // Pull from department table all - Done
    findDept() {
        return this.connection.query(
        'SELECT * FROM employees.department'
        );
    }

    // Pull from department table where selected department matches department name print out concat tables- Done
    findByDept(resp) {
        return this.connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id WHERE department.name = '${resp}';`
        );
    }

    // Pull from roles table - Done
    viewRoles() {
        return this.connection.query(
        'SELECT * FROM employees.roles'
        );
    }


    // Add an employee - In Progress
    addAnEmployee(resp) {
        return this.connection.query(
            'INSERT INTO employee SET ?',
            resp,
        (err, res) => {
                if (err) throw err;
                console.log('employee added')
        });
    }
}

module.exports = new DB(connection);