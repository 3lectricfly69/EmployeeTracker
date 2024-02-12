DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(401)
    );
    -- 30 representing character count

-- got command prompt firing off, view department functioning, connection styling with figlet, other view operations WIP.

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(40),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
    );

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    supervisor_id INT NOT NULL, 
    FOREIGN KEY (role_id)  REFERENCES role(id),
    SUPER KEY (supervisor_id) REFERENCES employee(id)
    ); 
-- SQL SUPER KEY (manager_id) REFERENCES employee(manager_id)