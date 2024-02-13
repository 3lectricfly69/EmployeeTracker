DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

-- Departments
CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(401)
);
    -- 30 representing character count

-- got command prompt firing off, view department functioning, connection styling with figlet, other view operations WIP.

-- Roles
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(40),
    salary DECIMAL(10, 2),
    department_id VARCHAR(30) INT,
    FOREIGN KEY (department_name) REFERENCES department(name)
);

-- Employees
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    supervisor_id INT NOT NULL, 
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    FOREIGN KEY (department_name) REFERENCES department(name),
    SUPER KEY (supervisor_id) REFERENCES employee(id)
); 
-- SQL SUPER KEY (supervisor_id) REFERENCES employee(supervisor_id)