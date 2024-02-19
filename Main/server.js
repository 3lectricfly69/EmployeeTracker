const mysql = require ("mysql2");
// const PORT = process.env.PORT || 3306;
const inquirer = require ('inquirer');
const table = require ("table");
const chalk = require ('chalk');
const fs = require ("fs");
const figlet = require ('figlet');
const cTable = require ("console.table");
const connection = require ('connection');
// const path = require('path');
// const { debuglog } = require("util");
// const sqlFilePath = path.join(__dirname, 'db', 'schema.sql');
// const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
// var cb = callback;



// connect(cb) {
//     if (!cb) {
//       return;
//     }
//     if (this._fatalError || this._protocolError) {
//       return cb(this._fatalError || this._protocolError);
//     }
//     if (this._handshakePacket) {
//       return cb(null, this);
//     }
//     let connectCalled = 0;
//     function callbackOnce(isErrorHandler) {
//       return function(param) {
//         if (!connectCalled) {
//           if (isErrorHandler) {
//             cb(param);
//           } else {
//             cb(null, param);
//           }
//         }
//         connectCalled = 1;
//       };
//     }
//     this.once('error', callbackOnce(true));
//     this.once('connect', callbackOnce(false));
//   }

//   // ===================================
//   // outgoing server connection methods
//   // ===================================
//   writeColumns(columns) {
//     this.writePacket(Packets.ResultSetHeader.toPacket(columns.length));
//     columns.forEach(column => {
//       this.writePacket(
//         Packets.ColumnDefinition.toPacket(column, this.serverConfig.encoding)
//       );
//     });
//     this.writeEof();
//   }

//   // row is array of columns, not hash
//   writeTextRow(column) {
//     this.writePacket(
//       Packets.TextRow.toPacket(column, this.serverConfig.encoding)
//     );
//   }

//   writeBinaryRow(column) {
//     this.writePacket(
//       Packets.BinaryRow.toPacket(column, this.serverConfig.encoding)
//     );
//   }

//   writeTextResult(rows, columns, binary=false) {
//     this.writeColumns(columns);
//     rows.forEach(row => {
//       const arrayRow = new Array(columns.length);
//       columns.forEach(column => {
//         arrayRow.push(row[column.name]);
//       });
//       if(binary) {
//         this.writeBinaryRow(arrayRow);
//       }
//       else this.writeTextRow(arrayRow);
//     });
//     this.writeEof();
//   }

//   writeEof(warnings, statusFlags) {
//     this.writePacket(Packets.EOF.toPacket(warnings, statusFlags));
//   }

//   writeOk(args) {
//     if (!args) {
//       args = { affectedRows: 0 };
//     }
//     this.writePacket(Packets.OK.toPacket(args, this.serverConfig.encoding));
//   }

//   writeError(args) {
//     // if we want to send error before initial hello was sent, use default encoding
//     const encoding = this.serverConfig ? this.serverConfig.encoding : 'cesu8';
//     this.writePacket(Packets.Error.toPacket(args, encoding));
//   }

//   serverHandshake(args) {
//     this.serverConfig = args;
//     this.serverConfig.encoding =
//       CharsetToEncoding[this.serverConfig.characterSet];
//     return this.addCommand(new Commands.ServerHandshake(args));
//   }

// Get the client // import and require mysql2
// import mysql from 'mysql2/promise';

// define models, turn on server, and work on routes
// find * and create

// connect to database

const db = mysql.createConnection(
    {
        host: 'localhost',
        // mysql username
        user: 'root',
        // mysql pw
        password: 'rootroot',
        database: 'employees',
        multipleStatements: true
    }
);

// handle the results of schema.sql connection / execution
// db.connect(sqlContent, (error) => {
db.connect((error) => {
    if (error) throw error;
    console.log(chalk.yellow.bold(`================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
    console.log(``);
    console.log(`                                                          ` + chalk.greenBright.bold('Created By: Marlie Ford'));
    console.log(``);
    console.log(chalk.yellow.bold(`================================================================================`));
    console.log(`Schema applied successfully - - Connected to the ${db.config.database} database.`);
    promptUser();
    // db.end();
});

const promptUser = () => {
    inquirer.prompt([
        {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do ?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'Add Employee',
            'Update Employee Supervisor',
            'Update Employee Role',
            'View All Roles',
            'View Role Salaries',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Exit',
            'Remove Employee',
            'Remove Role',
            'Remove Department',
        ]}])          
            .then((answer) => {
            const {choices} = answer;
            console.log(answer);
            if (choices === 'View All Employees') {
                viewAllEmployees()
                // './employees.employee'
            };

            if (choices === 'View All Departments') {
                viewAllDepartments()
                // './employees.department'
            }

            if (choices === 'View All Employees By Department') {
                viewEmployeesByDepartment()
                // './employees/employee'
            }

            if (choices === 'Add Employee') {
                addEmployee()
            }

            if (choices === 'Remove Employee') {
                removeEmployee()
            }

            if (choices === 'Update Employee Role') {
                updateEmployeeRole()
            }

            if (choices === 'Update Employee Supervisor') {
                updateEmployeeSupervisor()
            }

            if (choices === 'View All Roles') {
                viewAllRoles()
            }

            if (choices === 'Add Role') {
                addRole()
            }

            if (choices === 'Remove Role') {
                removeRole()
            }

            if (choices === 'Add Department') {
                addDepartment()
            }

            if (choices === 'View Role Salaries') {
                viewRoleSalary()
            }

            if (choices === 'Remove Department') {
                removeDepartment()
            }

            if (choices === 'Exit') {
                db.end()
            }
})};

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

    // db.query(mysql, (error, rows) => {
    //     if (error) {
    //     res.status(500).json({ error: error.message });
    //     return;
    //     }
    //     res.json({
    //     message: 'success',
    //     data: rows
    // });
    // });
})};

  //View all Role Salaries
const viewRoleSalary = () => {
    db.query('SELECT roletable.title, roletable.salary FROM roletable', function (error, results) {
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
        // db.query(mysql, (error, rows) => {
        //     if (error) {
        //     res.status(500).json({ error: error.message });
        //     return;
        //     }
        //     res.json({
        //     message: 'success',
        //     data: rows
        // });
        // });
})};
    
'SELECT employee.id AS id, employee.first_name, employee.last_name, roletable.title AS title, department.dep_name AS department, roletable.salary AS salary, CONCAT(supervisor.first_name, " ", supervisor.last_name) AS supervisor FROM employee JOIN roletable ON employee.roletable_id = roletable.id LEFT JOIN department ON roletable.department_id = department.id LEFT JOIN employee AS supervisor ON employee.supervisor_id = supervisor.id'
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
})};  

// View all Employees by Department
const viewEmployeesByDepartment = () => {
    db.query('SELECT * FROM employees.employee',
    function (error, results) {
        if (error) throw error;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(results);
        console.log(chalk.yellow.bold(`====================================================================================`));
        promptUser();
})};

const viewAllRoles = () => {
    db.query('SELECT * FROM roletable', function (error, results) {
        if (error) throw error;
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.log(`                              ` + chalk.green.bold(`Current Employee Roles:`));
        console.log(chalk.yellow.bold(`====================================================================================`));
        console.table(results);
        // response.forEach((role) => {console.log(role.title);});
        console.log(chalk.yellow.bold(`====================================================================================`));
        promptUser();
})};

const addEmployee = () => {
    

    

    const mysql = 'SELECT * FROM employee';
    db.query(mysql, (error, response) => {
        if (error) throw error;
        
        let supervisorNamesArray = [];
        response.forEach((employee) => {
            let fullName = employee.first_name + " " + employee.last_name;
            supervisorNamesArray.push(fullName);});
            supervisorNamesArray.push('Create Supervisor');

    inquirer
        .prompt([
        {
            name: 'newEmployeeFirstName',
            type: 'input',
            message: 'What is the first name of your new Employee?'
            // validate: true
        },
        {
            name: 'newEmployeeLastName',
            type: 'input',
            message: 'What is the last name of your new Employee?',
            // validate: true
        },
        {
            name: "newEmployeeSupervisor",
            type: "input",
            choices: supervisorNamesArray
        }
        ])
        .then((answer) => {
            let firstName = answer.newEmployeeFirstName;
            let lastName = answer.newEmployeeLastName;
            let supervisorName = answer.newEmployeeSupervisor;


                let mysql = 'SELECT * FROM roletable';

                db.query(mysql, (error, response) => {
                    if (error) throw error;
                    let roleNamesArray = [];
                    response.forEach((roletable) => {roleNamesArray.push(roletable.title);});
                    roleNamesArray.push('Create Role');
                    inquirer
                    .prompt([
                        {
                        name: "newEmployeeRole",
                        type: "input",
                        choices: roleNamesArray
                        }
                    ])
                    .then((answer) => {
                        let roletableName = answer.newEmployeeRole
                        let supervisorId;
                        let roletableId;

                        response.forEach((employee) => {
                            if (supervisorName === employee.first_name + " " + employee.last_name) {supervisorId = employee.id;}
                        });

                        response.forEach((roletable) => {
                            if (roletableName === roletable.title) {roletableId = roletable.id;}
                        });

                        let mysql = `INSERT INTO employee (first_name, last_name, roletable_id, supervisor_id) VALUES (?, ?, ?, ?)`;
                        let crit = [firstName, lastName, roletableId, supervisorId];

                        db.query(mysql, crit, (error) => {
                            if (error) throw error;
                            console.log(chalk.yellow.bold(`====================================================================================`));
                            console.log(chalk.greenBright(`Employee successfully created!`));
                            console.log(chalk.yellow.bold(`====================================================================================`));
                            viewAllRoles();
                        });

                        
                    })

                })
                
                // inquirer
                // .prompt([
                //     {
                //         name: "newEmployeeRole",
                //         type: "input",
                //         choices: deptNamesArray
                //     }
                // ])

            })
    
            
            })

        

        // .then((answer) => {
        // let mysql =     `INSERT INTO department (department_name) VALUES (?)`;
        // db.query(mysql, answer.newDepartment, (error, response) => {
        //     if (error) throw error;
        //     console.log(``);
        //     console.log(chalk.greenBright(answer.newDepartment + ` Employee successfully created!`));
        //     console.log(``);
        //     viewAllDepartments();
        // });
        // });
};

  // add a New Role
const addRole = () => {
    const mysql = 'SELECT * FROM department'
    db.query(mysql, (error, response) => {
        if (error) throw error;
        let deptNamesArray = [];
        response.forEach((department) => {deptNamesArray.push(department.department_name);});
        deptNamesArray.push('Create Department');
        inquirer
        .prompt([
            {
            name: 'departmentName',
            type: 'list',
            message: 'Which department is this new role in?',
            choices: deptNamesArray
            }
        ])
        .then((answer) => {
            if (answer.departmentName === 'Create Department') {
            this.addDepartment();
            } else {
            addRoleResume(answer);
            }
        });


        const addRoleResume = (departmentData) => {
        inquirer
            .prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of your new role?',
                // validate: validateString
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?',
                // validate: validate.validateSalary
            }
            ])
            .then((answer) => {
            let createdRole = answer.newRole;
            let departmentId;


            response.forEach((department) => {
                if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
            });


            let mysql =   `INSERT INTO roletable (title, salary, department_id) VALUES (?, ?, ?)`;
            let crit = [createdRole, answer.salary, departmentId];


            db.query(mysql, crit, (error) => {
                if (error) throw error;
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Role successfully created!`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                viewAllRoles();
            });
            });
        };
    });
};

  // add a New Department
const addDepartment = () => {
    inquirer
        .prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'What is the name of your new Department?',
            // validate: true
        }
        ])
        .then((answer) => {
        let mysql = `INSERT INTO department (department_name) VALUES (?)`;
        db.query(mysql, answer.newDepartment, (error, response) => {
            if (error) throw error;
            console.log(``);
            console.log(chalk.greenBright(answer.newDepartment + ` Department successfully created!`));
            console.log(``);
            viewAllDepartments();
        });
        });
};


  // ------------------------------------------------- UPDATE -------------------------------------------------------------------------


  // Update an Employee's Role
const updateEmployeeRole = () => {
    let mysql = `SELECT employee.id, employee.first_name, employee.last_name, roletable.id AS "roletable_id"
                    FROM employee, roletable, department WHERE department.id = role.department_id AND roletable.id = employee.roletable_id`;
    db.query(mysql, (error, response) => {
        if (error) throw error;
        let employeeNamesArray = [];
        response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});


        let mysql = `SELECT roletable.id, roletable.title FROM roletable`;
        db.query(mysql, (error, response) => {
        if (error) throw error;
        let rolesArray = [];
        response.forEach((role) => {rolesArray.push(role.title);});


        inquirer
            .prompt([
            {
                name: 'chosenEmployee',
                type: 'list',
                message: 'Which employee has a new role?',
                choices: employeeNamesArray
            },
            {
                name: 'chosenRole',
                type: 'list',
                message: 'What is their new role?',
                choices: rolesArray
            }
            ])
            .then((answer) => {
            let newTitleId, employeeId;


            response.forEach((role) => {
                if (answer.chosenRole === role.title) {
                newTitleId = role.id;
                }
            });


            response.forEach((employee) => {
                if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
                ) {
                employeeId = employee.id;
                }
            });


            let mysql = `UPDATE employee SET employee.roletable_id = ? WHERE employee.id = ?`;
            db.query(
                mysql,
                [newTitleId, employeeId],
                (error) => {
                if (error) throw error;
                console.log(chalk.greenBright.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Employee Role Updated`));
                console.log(chalk.greenBright.bold(`====================================================================================`));
                promptUser();
                }
            );
            });
        });
    });
};


  // Update an Employee's Supervisor
const updateEmployeeSupervisor = () => {
    let mysql = `SELECT employee.id, employee.first_name, employee.last_name, employee.supervisor_id
                    FROM employee`;
                        db.query(mysql, (error, response) => {
        let employeeNamesArray = [];
        response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});


        inquirer
        .prompt([
            {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee has a new supervisor?',
            choices: employeeNamesArray
            },
            {
            name: 'newSupervisor',
            type: 'list',
            message: 'Who is their supervisor?',
            choices: employeeNamesArray
            }
        ])
        .then((answer) => {
            let employeeId, supervisorId;
            response.forEach((employee) => {
            if (
                answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`
            ) {
                employeeId = employee.id;
            }


            if (
                answer.newSupervisor === `${employee.first_name} ${employee.last_name}`
            ) {
                supervisorId = employee.id;
            }
            });


            if (validate.isSame(answer.chosenEmployee, answer.newSupervisor)) {
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.redBright(`Invalid Supervisor Selection`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            promptUser();
            } else {
            let mysql = `UPDATE employee SET employee.supervisor_id = ? WHERE employee.id = ?`;


            db.query(
                mysql,
                [supervisorId, employeeId],
                (error) => {
                if (error) throw error;
                console.log(chalk.greenBright.bold(`====================================================================================`));
                console.log(chalk.greenBright(`Employee Supervisor Updated`));
                console.log(chalk.greenBright.bold(`====================================================================================`));
                promptUser();
                }
            );
            }
        });
    });
};


   // -------------------------------------- DELETE --------------------------------------------------------


  // delete Employee
const removeEmployee = () => {
    let mysql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

    db.query(mysql, (error, response) => {
        if (error) throw error;
        let employeeNamesArray = [];
        response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});


        inquirer
        .prompt([
            {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee would you like to remove?',
            choices: employeeNamesArray
            }
        ])
        .then((answer) => {
            let employeeId;


            response.forEach((employee) => {
            if (
                answer.chosenEmployee ===
                `${employee.first_name} ${employee.last_name}`
            ) {
                employeeId = employee.id;
            }
            });


            let mysql = `DELETE FROM employee WHERE employee.id = ?`;
            db.query(mysql, [employeeId], (error) => {
            if (error) throw error;
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.redBright(`Employee Successfully Removed`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            viewAllEmployees();
            });
        });
    });
};


  // Delete a Role
const removeRole = () => {
    let mysql = `SELECT roleTable.id, roleTable.title FROM roleTable`;


    db.query(mysql, (error, response) => {
        if (error) throw error;
        let roleNamesArray = [];
        response.forEach((role) => {roleNamesArray.push(role.title);});


        inquirer
        .prompt([
            {
            name: 'chosenRole',
            type: 'list',
            message: 'Which role would you like to remove?',
            choices: roleNamesArray
            }
        ])
        .then((answer) => {
            let roleId;


            response.forEach((role) => {
            if (answer.chosenRole === role.title) {
                roleId = role.id;
            }
            });


            let mysql = `DELETE FROM roleTable WHERE roleTable.id = ?`;
            db.query(mysql, [roleId], (error) => {
            if (error) throw error;
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.greenBright(`Role Successfully Removed`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            viewAllRoles();
            });
        });
    });
};

  // Delete a Department
const removeDepartment = () => {
    let mysql = `SELECT department.id, department.department_name FROM department`;

        db.query(mysql, (error, response) => {
        if (error) throw error;
        let departmentNamesArray = [];
        response.forEach((department) => {departmentNamesArray.push(department.department_name);});


        inquirer
        .prompt([
            {
            name: 'chosenDept',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: departmentNamesArray
            }
        ])
        .then((answer) => {
            let departmentId;


            response.forEach((department) => {
            if (answer.chosenDept === department.department_name) {
                departmentId = department.id;
            }
            });


            let mysql = `DELETE FROM department WHERE department.id = ?`;
            db.query(mysql, [departmentId], (error) => {
            if (error) throw error;
            console.log(chalk.redBright.bold(`====================================================================================`));
            console.log(chalk.redBright(`Department Successfully Removed`));
            console.log(chalk.redBright.bold(`====================================================================================`));
            viewAllDepartments();
            });
        });
    });
};


// // handle the results of schema.sql connection / execution
// // db.connect(sqlContent, (error) => {
// db.connect((error) => {
//     if (error) throw error;
//     console.log(chalk.yellow.bold(`================================================================================`));
//     console.log(``);
//     console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
//     console.log(``);
//     console.log(`                                                          ` + chalk.greenBright.bold('Created By: Marlie Ford'));
//     console.log(``);
//     console.log(chalk.yellow.bold(`================================================================================`));
//     console.log(`Schema applied successfully - - Connected to the ${db.config.database} database.`);
//     promptUser();
//     // db.end();
// });

// const promptUser = () => {
//     inquirer.prompt([
//         {
//         type: 'list',
//         name: 'choices',
//         message: 'What would you like to do ?',
//         choices: [
//             'View All Employees',
//             'View All Employees By Department',
//             'Add Employee',
//             'Update Employee Supervisor',
//             'Update Employee Role',
//             'View All Roles',
//             'View Role Salaries',
//             'Add Role',
//             'View All Departments',
//             'Add Department',
//             'Exit',
//             'Remove Employee',
//             'Remove Role',
//             'Remove Department',
//         ]}])          
//             .then((answer) => {
//             const {choices} = answer;
//             console.log(answer);
//             if (choices === 'View All Employees') {
//                 viewAllEmployees()
//                 // './employees.employee'
//             };

//             if (choices === 'View All Departments') {
//                 viewAllDepartments()
//                 // './employees.department'
//             }

//             if (choices === 'View All Employees By Department') {
//                 viewEmployeesByDepartment()
//                 // './employees/employee'
//             }

//             if (choices === 'Add Employee') {
//                 addEmployee()
//             }

//             if (choices === 'Remove Employee') {
//                 removeEmployee()
//             }

//             if (choices === 'Update Employee Role') {
//                 updateEmployeeRole()
//             }

//             if (choices === 'Update Employee Supervisor') {
//                 updateEmployeeSupervisor()
//             }

//             if (choices === 'View All Roles') {
//                 viewAllRoles()
//             }

//             if (choices === 'Add Role') {
//                 addRole()
//             }

//             if (choices === 'Remove Role') {
//                 removeRole()
//             }

//             if (choices === 'Add Department') {
//                 addDepartment()
//             }

//             if (choices === 'View Role Salaries') {
//                 viewRoleSalary()
//             }

//             if (choices === 'Remove Department') {
//                 removeDepartment()
//             }

//             if (choices === 'Exit') {
//                 db.end()
//             }
// })};

// // ----------------------------------------------------- VIEW -----------------------------------------------------------------------
//     // View all Departments
// const viewAllDepartments = () => {
//     db.query('SELECT * FROM department', function (error, results) {
//         if (error) throw error;
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`All Departments:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.table(results);
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();

//     // db.query(mysql, (error, rows) => {
//     //     if (error) {
//     //     res.status(500).json({ error: error.message });
//     //     return;
//     //     }
//     //     res.json({
//     //     message: 'success',
//     //     data: rows
//     // });
//     // });
// })};

//   //View all Role Salaries
// const viewRoleSalary = () => {
//     db.query('SELECT * FROM role.salary', function (error, results) {
//         if (error) throw error;
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`View Role Salaries:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//     // const sql =    `SELECT salary.id AS id,
//     //                 FROM  role.salary FROM role
//     //                 INNER JOIN employee ON role = role.salary`;
//         console.table(results);
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
//         // db.query(mysql, (error, rows) => {
//         //     if (error) {
//         //     res.status(500).json({ error: error.message });
//         //     return;
//         //     }
//         //     res.json({
//         //     message: 'success',
//         //     data: rows
//         // });
//         // });
    
// 'SELECT employee.id AS id, employee.first_name, employee.last_name, role.title AS title, department.dep_name AS department, role.salary AS salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id'
// // View All Employees
// const viewAllEmployees = () => {
//     db.query('SELECT * FROM employee',
//     function (error, results) {
//         if (error) throw error;
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`Current Employees:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.table(results);
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
// })};  

// // View all Employees by Department
// const viewEmployeesByDepartment = () => {
//     db.query('SELECT * FROM employees.employee',
//     function (error, results) {
//         if (error) throw error;
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`Employees by Department:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.table(results);
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
// })};

// const viewAllRoles = () => {
//     db.query('SELECT * FROM role', function (error, results) {
//         if (error) throw error;
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.log(`                              ` + chalk.green.bold(`Current Employee Roles:`));
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         console.table(results);
//         // response.forEach((role) => {console.log(role.title);});
//         console.log(chalk.yellow.bold(`====================================================================================`));
//         promptUser();
// })};

// const addEmployee = () => {
    

    

//     const mysql = 'SELECT * FROM employee';
//     db.query(mysql, (error, response) => {
//         if (error) throw error;
        
//         let managerNamesArray = [];
//         response.forEach((employee) => {
//             let fullName = employee.first_name + " " + employee.last_name;
//             managerNamesArray.push(fullName);});
//             managerNamesArray.push('Create Manager');

//     inquirer
//         .prompt([
//         {
//             name: 'newEmployeeFirstName',
//             type: 'input',
//             message: 'What is the first name of your new Employee?'
//             // validate: true
//         },
//         {
//             name: 'newEmployeeLastName',
//             type: 'input',
//             message: 'What is the last name of your new Employee?'
//             // validate: true
//         },
//         {
//             name: "newEmployeeManager",
//             type: "input",
//             choices: managerNamesArray
//         }
//         ])
//         .then((answer) => {
//             let firstName = answer.newEmployeeFirstName;
//             let lastName = answer.newEmployeeLastName;
//             let managerName = answer.newEmployeeManager;


//                 let mysql = 'SELECT * FROM role';

//                 db.query(mysql, (error, response) => {
//                     if (error) throw error;
//                     let roleNamesArray = [];
//                     response.forEach((role) => {roleNamesArray.push(role.title);});
//                     roleNamesArray.push('Create Role');
//                     inquirer
//                     .prompt([
//                         {
//                         name: "newEmployeeRole",
//                         type: "input",
//                         choices: roleNamesArray
//                         }
//                     ])
//                     .then((answer) => {
//                         let roleName = answer.newEmployeeRole
//                         let managerId;
//                         let roleId;

//                         response.forEach((employee) => {
//                             if (managerName === employee.first_name + " " + employee.last_name) {managerId = employee.id;}
//                         });

//                         response.forEach((role) => {
//                             if (roleName === role.title) {roleId = role.id;}
//                         });

//                         let mysql =   `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
//                         let crit = [firstName, lastName, roleId, managerId];

//                         db.query(mysql, crit, (error) => {
//                             if (error) throw error;
//                             console.log(chalk.yellow.bold(`====================================================================================`));
//                             console.log(chalk.greenBright(`Employee successfully created!`));
//                             console.log(chalk.yellow.bold(`====================================================================================`));
//                             viewAllRoles();
//                         });


                        
//                     })



//                 })
                
//                 // inquirer
//                 // .prompt([
//                 //     {
//                 //         name: "newEmployeeRole",
//                 //         type: "input",
//                 //         choices: deptNamesArray
//                 //     }
//                 // ])


//             })

       
    
            
//             })

        

//         // .then((answer) => {
//         // let mysql =     `INSERT INTO department (department_name) VALUES (?)`;
//         // db.query(mysql, answer.newDepartment, (error, response) => {
//         //     if (error) throw error;
//         //     console.log(``);
//         //     console.log(chalk.greenBright(answer.newDepartment + ` Employee successfully created!`));
//         //     console.log(``);
//         //     viewAllDepartments();
//         // });
//         // });
// };

//   // add a New Role
// const addRole = () => {
//     const mysql = 'SELECT * FROM department'
//     db.query(mysql, (error, response) => {
//         if (error) throw error;
//         let deptNamesArray = [];
//         response.forEach((department) => {deptNamesArray.push(department.department_name);});
//         deptNamesArray.push('Create Department');
//         inquirer
//         .prompt([
//             {
//             name: 'departmentName',
//             type: 'list',
//             message: 'Which department is this new role in?',
//             choices: deptNamesArray
//             }
//         ])
//         .then((answer) => {
//             if (answer.departmentName === 'Create Department') {
//             this.addDepartment();
//             } else {
//             addRoleResume(answer);
//             }
//         });


//         const addRoleResume = (departmentData) => {
//         inquirer
//             .prompt([
//             {
//                 name: 'newRole',
//                 type: 'input',
//                 message: 'What is the name of your new role?',
//                 // validate: validateString
//             },
//             {
//                 name: 'salary',
//                 type: 'input',
//                 message: 'What is the salary of this new role?',
//                 // validate: validate.validateSalary
//             }
//             ])
//             .then((answer) => {
//             let createdRole = answer.newRole;
//             let departmentId;


//             response.forEach((department) => {
//                 if (departmentData.departmentName === department.department_name) {departmentId = department.id;}
//             });


//             let mysql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
//             let crit = [createdRole, answer.salary, departmentId];


//             db.query(mysql, crit, (error) => {
//                 if (error) throw error;
//                 console.log(chalk.yellow.bold(`====================================================================================`));
//                 console.log(chalk.greenBright(`Role successfully created!`));
//                 console.log(chalk.yellow.bold(`====================================================================================`));
//                 viewAllRoles();
//             });
//             });
//         };
//     });
// };

//   // add a New Department
// const addDepartment = () => {
//     inquirer
//         .prompt([
//         {
//             name: 'newDepartment',
//             type: 'input',
//             message: 'What is the name of your new Department?'
//             // validate: true
//         }
//         ])
//         .then((answer) => {
//         let mysql =     `INSERT INTO department (department_name) VALUES (?)`;
//         db.query(mysql, answer.newDepartment, (error, response) => {
//             if (error) throw error;
//             console.log(``);
//             console.log(chalk.greenBright(answer.newDepartment + ` Department successfully created!`));
//             console.log(``);
//             viewAllDepartments();
//         });
//         });
// };


//   // ------------------------------------------------- UPDATE -------------------------------------------------------------------------


//   // Update an Employee's Role
// const updateEmployeeRole = () => {
//     let mysql =       `SELECT employee.id, employee.first_name, employee.last_name, role.id AS "role_id"
//                     FROM employee, role, department WHERE department.id = role.department_id AND role.id = employee.role_id`;
//     db.query(mysql, (error, response) => {
//         if (error) throw error;
//         let employeeNamesArray = [];
//         response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});


//         let mysql =     `SELECT role.id, role.title FROM role`;
//         db.query(mysql, (error, response) => {
//         if (error) throw error;
//         let rolesArray = [];
//         response.forEach((role) => {rolesArray.push(role.title);});


//         inquirer
//             .prompt([
//             {
//                 name: 'chosenEmployee',
//                 type: 'list',
//                 message: 'Which employee has a new role?',
//                 choices: employeeNamesArray
//             },
//             {
//                 name: 'chosenRole',
//                 type: 'list',
//                 message: 'What is their new role?',
//                 choices: rolesArray
//             }
//             ])
//             .then((answer) => {
//             let newTitleId, employeeId;


//             response.forEach((role) => {
//                 if (answer.chosenRole === role.title) {
//                 newTitleId = role.id;
//                 }
//             });


//             response.forEach((employee) => {
//                 if (
//                 answer.chosenEmployee ===
//                 `${employee.first_name} ${employee.last_name}`
//                 ) {
//                 employeeId = employee.id;
//                 }
//             });


//             let mysql =    `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
//             db.query(
//                 mysql,
//                 [newTitleId, employeeId],
//                 (error) => {
//                 if (error) throw error;
//                 console.log(chalk.greenBright.bold(`====================================================================================`));
//                 console.log(chalk.greenBright(`Employee Role Updated`));
//                 console.log(chalk.greenBright.bold(`====================================================================================`));
//                 promptUser();
//                 }
//             );
//             });
//         });
//     });
// };


//   // Update an Employee's Supervisor
// const updateEmployeeSupervisor = () => {
//     let mysql =       `SELECT employee.id, employee.first_name, employee.last_name, employee.supervisor_id
//                     FROM employee`;
//                         db.query(mysql, (error, response) => {
//         let employeeNamesArray = [];
//         response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});


//         inquirer
//         .prompt([
//             {
//             name: 'chosenEmployee',
//             type: 'list',
//             message: 'Which employee has a new supervisor?',
//             choices: employeeNamesArray
//             },
//             {
//             name: 'newSupervisor',
//             type: 'list',
//             message: 'Who is their supervisor?',
//             choices: employeeNamesArray
//             }
//         ])
//         .then((answer) => {
//             let employeeId, supervisorId;
//             response.forEach((employee) => {
//             if (
//                 answer.chosenEmployee === `${employee.first_name} ${employee.last_name}`
//             ) {
//                 employeeId = employee.id;
//             }


//             if (
//                 answer.newSupervisor === `${employee.first_name} ${employee.last_name}`
//             ) {
//                 supervisorId = employee.id;
//             }
//             });


//             if (validate.isSame(answer.chosenEmployee, answer.newSupervisor)) {
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             console.log(chalk.redBright(`Invalid Supervisor Selection`));
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             promptUser();
//             } else {
//             let mysql = `UPDATE employee SET employee.supervisor_id = ? WHERE employee.id = ?`;


//             db.query(
//                 mysql,
//                 [supervisorId, employeeId],
//                 (error) => {
//                 if (error) throw error;
//                 console.log(chalk.greenBright.bold(`====================================================================================`));
//                 console.log(chalk.greenBright(`Employee Supervisor Updated`));
//                 console.log(chalk.greenBright.bold(`====================================================================================`));
//                 promptUser();
//                 }
//             );
//             }
//         });
//     });
// };


//   // -------------------------------------- DELETE --------------------------------------------------------


//   // delete Employee
// const removeEmployee = () => {
//     let mysql =     `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;


//     db.query(mysql, (error, response) => {
//         if (error) throw error;
//         let employeeNamesArray = [];
//         response.forEach((employee) => {employeeNamesArray.push(`${employee.first_name} ${employee.last_name}`);});


//         inquirer
//         .prompt([
//             {
//             name: 'chosenEmployee',
//             type: 'list',
//             message: 'Which employee would you like to remove?',
//             choices: employeeNamesArray
//             }
//         ])
//         .then((answer) => {
//             let employeeId;


//             response.forEach((employee) => {
//             if (
//                 answer.chosenEmployee ===
//                 `${employee.first_name} ${employee.last_name}`
//             ) {
//                 employeeId = employee.id;
//             }
//             });


//             let mysql = `DELETE FROM employee WHERE employee.id = ?`;
//             db.query(mysql, [employeeId], (error) => {
//             if (error) throw error;
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             console.log(chalk.redBright(`Employee Successfully Removed`));
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             viewAllEmployees();
//             });
//         });
//     });
// };


//   // Delete a Role
// const removeRole = () => {
//     let mysql = `SELECT role.id, role.title FROM role`;


//     db.query(mysql, (error, response) => {
//         if (error) throw error;
//         let roleNamesArray = [];
//         response.forEach((role) => {roleNamesArray.push(role.title);});


//         inquirer
//         .prompt([
//             {
//             name: 'chosenRole',
//             type: 'list',
//             message: 'Which role would you like to remove?',
//             choices: roleNamesArray
//             }
//         ])
//         .then((answer) => {
//             let roleId;


//             response.forEach((role) => {
//             if (answer.chosenRole === role.title) {
//                 roleId = role.id;
//             }
//             });


//             let mysql =   `DELETE FROM role WHERE role.id = ?`;
//             db.query(mysql, [roleId], (error) => {
//             if (error) throw error;
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             console.log(chalk.greenBright(`Role Successfully Removed`));
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             viewAllRoles();
//             });
//         });
//     });
// };


//   // Delete a Department
// const removeDepartment = () => {
//     let mysql =   `SELECT department.id, department.department_name FROM department`;
//         db.query(mysql, (error, response) => {
//         if (error) throw error;
//         let departmentNamesArray = [];
//         response.forEach((department) => {departmentNamesArray.push(department.department_name);});


//         inquirer
//         .prompt([
//             {
//             name: 'chosenDept',
//             type: 'list',
//             message: 'Which department would you like to remove?',
//             choices: departmentNamesArray
//             }
//         ])
//         .then((answer) => {
//             let departmentId;


//             response.forEach((department) => {
//             if (answer.chosenDept === department.department_name) {
//                 departmentId = department.id;
//             }
//             });


//             let mysql =     `DELETE FROM department WHERE department.id = ?`;
//             db.query(mysql, [departmentId], (error) => {
//             if (error) throw error;
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             console.log(chalk.redBright(`Department Successfully Removed`));
//             console.log(chalk.redBright.bold(`====================================================================================`));
//             viewAllDepartments();
//             });
//         });
//     });
// };