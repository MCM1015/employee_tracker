DROP DATATABSE IF EXISTS employees
CREATE  DATATABSE employees

USE employees

--department table--
CREATE TABLE department (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

--role table--
CREATE TABLE role (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2), NOT NULL,
    department_id INTEGER(10), NOT NULL,
    PRIMARY KEY (id)
)

--employee table--
CREATE TABLE employee (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10), NOT NULL
    manager_id INTEGER(10),
    PRIMARY KEY (id)
)

