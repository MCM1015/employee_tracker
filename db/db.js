const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    findDept() {
        return this.connection.query(
        'SELECT name FROM employees.department'
        );
    }
}

module.exports = new DB(connection);