-- What would you like to do ?
-- View All Employees
-- - id, first_name, last_name, title, dept, salary, manager
-- Add Employee
-- - what is the employee's first name ? what is the employee's last name ? what is the employee's role ?
-- - who is the employee's manager ? - __name_here__ - ___name__ added __ to the db. 
-- Update Employee role
-- View All Roles
-- - id, title, dept, salary
-- Add Role
-- View All Departments
-- - id, name
-- Add Department
-- - what is name of dept ? added _ to the db. what would you like to do ? 
-- - add __ what is the name of __ ? what is the salary of the role ? which dept does the role belong to ?
-- Quit
-- View All Employees
-- Add Employee

SELECT *
FROM employee;
-- GROUP BY id, first_name, last_name, title, dept, salary, manager

-- SELECT department, COUNT(id) AS number_courses
-- FROM course_names
-- GROUP BY department;

-- SELECT department, SUM(total_enrolled) AS sum_enrolled
-- FROM course_names
-- GROUP BY department;
-- SELECT *
-- FROM course_names
-- JOIN department ON course_names.department = department.id;

-- SELECT movies.movie_name AS movie, reviews.review
-- FROM reviews
-- LEFT JOIN movies
-- ON reviews.movie_id = movies.id
-- ORDER BY movies.movie_name;

-- SELECT
--   favorite_books.book_name AS name, book_prices.price AS price
-- FROM favorite_books
-- JOIN book_prices ON favorite_books.book_price = book_prices.id;

-- SELECT *
-- FROM course_names;
-- GROUP BY department;

-- SELECT department, COUNT(id) AS number_courses
-- FROM course_names
-- GROUP BY department;

-- SELECT department, SUM(total_enrolled) AS sum_enrolled
-- FROM course_names
-- GROUP BY department;

-- in terminal - - mysql -u root -p
-- enter pw
-- run schema, seeds, then query