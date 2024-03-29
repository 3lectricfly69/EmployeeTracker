DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30)
);

CREATE TABLE roletable (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roletable_id INT,
    supervisor_id INT, 
    FOREIGN KEY (roletable_id) REFERENCES roletable(id)
);

-- -- Departments
-- CREATE TABLE department (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     department_name VARCHAR(401)
-- );
--     -- 30 representing character count

-- -- got command prompt firing off, view department functioning, connection styling with figlet, other view operations WIP.
-- DROP DATABASE IF EXISTS employees;
-- CREATE DATABASE employees;

-- USE employees;

-- CREATE TABLE department (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     department_name 
--     VARCHAR(30), 
--     -- 30 representing character count
-- );
-- -- "got command prompt firing off, view department functioning, connection styling with figlet, other view operations WIP."

-- CREATE TABLE role (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     title VARCHAR(30),
--     salary DECIMAL(10, 2),
--     department_id INT,
--     FOREIGN KEY (department_id) REFERENCES department(id),
-- );

-- CREATE TABLE employee (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     role_id INT,
--     manager_id INT REFERENCES (id), 
--     FOREIGN KEY (role_id) REFERENCES role(id),
--     -- FOREIGN KEY (manager_id) REFERENCES id,
-- );