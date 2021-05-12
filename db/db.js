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

    // Add an employee - Done
    addAnEmployee(resp, resp2, resp3, resp4) {
        switch (resp4) {
            case 'No Manager':
                return this.connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: `${resp}`,
                        last_name: `${resp2}`,
                        roles_id: `${resp3}`
                    },
                    console.log('employee added'),
                    (err, res) => {
                        if (err) throw err;
                    });
            default: 
            return this.connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: `${resp}`,
                    last_name: `${resp2}`,
                    roles_id: `${resp3}`,
                    manager_id: `${resp4}`
                },
                console.log('employee added'),
                (err, res) => {
                    if (err) throw err;
                });


        }
    }

    //Add a role - Done
    addARole(resp) {
        return this.connection.query(
            'INSERT INTO roles SET ?',
            resp,
            console.log('role added'),
            (err, res) => {
                if (err) throw err;
            });
    }

    //Add a department - Done
    addADepartment(resp) {
        return this.connection.query(
            'INSERT INTO department SET ?',
            resp,
            console.log('department added'),
            (err, res) => {
                if (err) throw err;
            });
    }

    //Update employee role - Done
    updateRole(resp, resp2) {
        return this.connection.query(
            'UPDATE employee SET ? WHERE ?',
            [
                {
                    roles_id: `${resp2}`,

                },
                {
                    id: `${resp}`,
                },
              ],
            console.log('employee role updated'),
            (err, res) => {
                if (err) throw err;
            });
    }

}


module.exports = new DB(connection);