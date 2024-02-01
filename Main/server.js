const mysql = require ('mysql2');
const inquirer = require ('inquirer');
const table = require ("table");
const chalk = require ('chalk');
const fs = require ("fs");
const connection = require ('connection');
const figlet = require ('figlet');
const cTable = require ("console.table");
// import and require mysql2

// define models, turn on server, and work on routes
// find * and create

// connect middleware framework
// var app = connect();
// app.use(connect.urlencoded({ extended: false }));
// app.use(connect.json());

// read sql seed query
const seeds = fs.readFileSync("db/seeds.sql",{
    encoding: "utf-8",
})

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // mysql username
        user: 'root',
        // mysql pw
        password: 'rootroot',
        database: 'employees',
        multipleStatements: true,
    },
    console.log('Connected to the mysql2 database.')
)

// execute connection
db.connect((error) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.greenBright.bold('Created By: Marlie Ford'));
    console.log(``);
    console.log(chalk.yellow.bold(`================================================================================`));
    promptUser();
});

// query database
// db.query('SELECT * FROM employee', function (error, results){
//     if (error) {
//     console.log(error)
//     }
//     console.log(results);
// });

const promptUser = () => {
inquirer.prompt([
    {
        type: "list",
        name: "choices",
        message: "What would you like to do ?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "Add Employee",
            "Update Employee Manager",
            "Update Employee Role",
            "View All Roles",
            "View Role Salaries",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Exit",
            "Remove Employee",
            "Remove Role",
            "Remove Department",
            ]
    }
])    .then((answers) => {
    const {choices} = answers;
    console.log(answers);
    if (choices === "View All Employees") {
        viewAllEmployees();
    }

    if (choices === "View All Departments") {
        viewAllDepartments();
    }

    if (choices === "View All Employees By Department") {
        viewEmployeesByDepartment();
    }

    if (choices === "Add Employee") {
        addEmployee();
    }

    if (choices === "Remove Employee") {
        removeEmployee();
    }

    if (choices === "Update Employee Role") {
        updateEmployeeRole();
    }

    if (choices === "Update Employee Manager") {
        updateEmployeeManager();
    }

    if (choices === "View All Roles") {
        viewAllRoles();
    }

    if (choices === "Add Role") {
        addRole();
    }

    if (choices === "Remove Role") {
        removeRole();
    }

    if (choices === "Add Department") {
        addDepartment();
    }

    if (choices === "View Role Salaries") {
        viewRoleSalary();
    }

    if (choices === "Remove Department") {
        removeDepartment();
    }

    if (choices === "Exit") {
        db.end();
    }
});
};

// ----------------------------------------------------- VIEW -----------------------------------------------------------------------
    // View all Departments
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (error, results) {
    if (error) throw error;
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(`                              ` + chalk.green.bold(`All Departments:`));
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.table(results);
    console.log(chalk.yellow.bold(`====================================================================================`));
    promptUser();

    db.query(sql, (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({
        message: 'success',
        data: rows
    });
    });
})};

  //View all Role Salaries
const viewRoleSalary = () => {
    db.query('SELECT * FROM role.salary', function (error, results) {
        if (error) throw error;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`View Role Salaries:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
    // const sql =    `SELECT salary.id AS id,
    //                 FROM  role.salary FROM role
    //                 INNER JOIN employee ON role = role.salary`;
        console.table(results);
        console.log(chalk.yellow.bold(`====================================================================================`));
        promptUser();
    });
};

// `SELECT employee.id, 
//             employee.first_name, 
//             employee.last_name, 
//             role.title, 
//             department.department_name AS 'department', 
//             role.salary
//             FROM employee, role, department 
//             WHERE department.id = role.department_id 
//             AND role.id = employee.role_id
//             ORDER BY employee.id ASC`

// `CREATE VIEW v_emp AS
//             SELECT
//             e1.*,
//             roles.title AS role,
//             department.name AS department,
//             roles.salary AS salary,
//             CONCAT(e2.first_name, '', e2.last_name) AS manager
//             FROM
//             employee e1
//             LEFT JOIN 
//             roles ON e1.role.id = role.id
//             LEFT JOIN 
//             department ON roles.department.id = department.id
//             LEFT JOIN 
//             employee e2 ON e2.id = e1.manager_id;`
// SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, FROM employee`
// `SELECT employee.id AS id, employee.first_name, employee.last_name, role.title AS title, department.department_name AS department, role.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`

// View All Employees
const viewAllEmployees = () => {
    db.query('SELECT * FROM employee',
    function (error, results) {
        if (error) throw error;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Current Employees:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(results);
        console.log(chalk.yellow.bold(`====================================================================================`));
        promptUser();
    });
};  

// View all Employees by Department
const viewEmployeesByDepartment = () => {
    db.query('SELECT * FROM employee',
    function (error, results) {
        if (error) throw error;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(results);
        console.log(chalk.yellow.bold(`====================================================================================`));
        promptUser();
    });
};

  // View all Roles
// const sql = `SELECT role.id, role.title, department.department_name AS department
//             FROM role
//             INNER JOIN department ON role.department_id = department.id`;
const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (error, results) {
        if (error) throw error;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Current Employee Roles:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(results);
        // response.forEach((role) => {console.log(role.title);});
        console.log(chalk.yellow.bold(`====================================================================================`));
        promptUser();
    })};