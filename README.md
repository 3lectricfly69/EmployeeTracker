# EmployeeTracker
this command-line application can be operated by a user to manage a company's employee database, using Node.js, Inquirer, and MySQL. this CMS [content management system], can be used to view and manage departments, roles, and employees in my company for continuous organization / business planning.

  ## Table of Contents

  [Installation](#installation)

  [Usage](#usage)

  [Contribution](#contribution)

  [Questions](#questions)

  [Demo](#demo)
  

  
  ## Installation

  To install necessary dependencies, run the following command:
  
  - npm i 
  
  ## Usage

  To use the application type the following into the terminal
  
  - node index.js
  - follow question prompt

  ## Contribution
  
  First fork the repo and create a branch that will merge into the main. Then make a commit to add to the project and open a pull request on Github. Once the changes have been approved and merged, the feature branch will be added to the main branch.

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
