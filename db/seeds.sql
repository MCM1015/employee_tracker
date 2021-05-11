
INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer 1", 75000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant 1", 100000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Market Manager", 90000, 3);

INSERT INTO employee(first_name, last_name, roles_id)
VALUES ("Jack", "Nicholsan", 1);

INSERT INTO employee(first_name, last_name, roles_id)
VALUES ("June", "Bug", 2);

INSERT INTO employee(first_name, last_name, roles_id)
VALUES ("Jacky", "O", 3);

INSERT INTO employee(first_name, last_name, roles_id, manager_id)
VALUES ("Jumping", "Jellybeans", 4, 2);