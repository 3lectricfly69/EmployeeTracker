DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    department_name 
    VARCHAR(30), 
    -- 30 representing character count
);


CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id),
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT, 
    FOREIGN KEY (role_id)  REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
);