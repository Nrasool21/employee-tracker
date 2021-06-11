const inquirer = require("inquirer");
const DB = require("./db/DB");

const init = async () => {
  let inProgress = true;

  const db = new DB("company_db");

  await db.start();

  const question = {
    type: "list",
    message: "Please select an action",
    name: "action",
    choices: [
      {
        name: "add department",
        value: "addDepartment",
      },
      {
        name: "add role",
        value: "addRole",
      },
      {
        name: "add employee",
        value: "addEmployee",
      },
      {
        name: "view department",
        value: "viewDepartment",
      },
      {
        name: "view role",
        value: "viewRole",
      },
      {
        name: "view Employee",
        value: "viewEmployee",
      },
      {
        name: "update employee role",
        value: "updateEmployeeRole",
      },
      {
        name: "exit",
        value: "exit",
      },
    ],
  };

  while (inProgress) {
    const { action } = await inquirer.prompt(question);
    if (action === "exit") {
      inProgress = false;
      process.exit(0);
    } else {
      if (action === "addDepartment") {
        const questions = [
          {
            type: "input",
            message: "Enter the department name:",
            name: "name",
          },
        ];

        const answers = await inquirer.prompt(questions);

        const query = "INSERT INTO ?? SET ?";
        await db.parameterisedQuery(query, ["department", answers]);

        console.log("Department added");
      }
      if (action === "addRole") {
        const departmentsQuery = "SELECT * FROM department";
        const departments = await db.query(departmentsQuery);

        const departmentChoices = departments.map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        });

        const questions = [
          {
            type: "list",
            message: "Select the department the role belongs to:",
            name: "department_id",
            choices: departmentChoices,
          },
          {
            type: "input",
            message: "Enter the title of the role:",
            name: "title",
          },
          {
            type: "input",
            message: "Enter the salary of the role:",
            name: "salary",
          },
        ];

        const answers = await inquirer.prompt(questions);

        const query = "INSERT INTO ?? SET ?";
        await db.parameterisedQuery(query, ["role", answers]);

        console.log("Role added");
      }
      if (action === "addEmployee") {
        const rolesQuery = "SELECT * FROM role";
        const roles = await db.query(rolesQuery);

        const roleChoices = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });

        const employeesQuery = "SELECT * FROM employee";
        const employees = await db.query(employeesQuery);

        const employeeChoices = employees.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });

        const questions = [
          {
            type: "list",
            message: "Select the role the employee belongs to:",
            name: "role_id",
            choices: roleChoices,
          },
          {
            type: "input",
            message: "Enter the first name of the employee:",
            name: "first_name",
          },
          {
            type: "input",
            message: "Enter the last name of the employee:",
            name: "last_name",
          },
          {
            type: "confirm",
            message: "Do you want to add a manager to this employee?",
            name: "hasManager",
          },
          {
            type: "list",
            message: "Select the manager of the employee:",
            name: "manager_id",
            choices: employeeChoices,
            when: (answers) => {
              return answers.hasManager;
            },
          },
        ];

        const answers = await inquirer.prompt(questions);

        const query = "INSERT INTO ?? SET ?";
        await db.parameterisedQuery(query, [
          "employee",
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: answers.role_id,
            manager_id: answers.manager_id || null,
          },
        ]);

        console.log("Employee added");
      }
      if (action === "viewDepartment") {
        const query = "SELECT * FROM department";
        const sqlData = await db.query(query);
        console.table(sqlData);
      }
      if (action === "viewRole") {
        const query = "SELECT * FROM role";
        const sqlData = await db.query(query);
        console.table(sqlData);
      }
      if (action === "viewEmployee") {
        const query = "SELECT * FROM employee";
        const sqlData = await db.query(query);
        console.table(sqlData);
      }
      if (action === "updateEmployeeRole") {
        const rolesQuery = "SELECT * FROM role";
        const roles = await db.query(rolesQuery);

        const roleChoices = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });

        const employeesQuery = "SELECT * FROM employee";
        const employees = await db.query(employeesQuery);

        const employeeChoices = employees.map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });

        const questions = [
          {
            type: "list",
            message: "Select the employee:",
            name: "id",
            choices: employeeChoices,
          },
          {
            type: "list",
            message: "Select the role you want to update to:",
            name: "role_id",
            choices: roleChoices,
          },
        ];

        const answers = await inquirer.prompt(questions);

        const query = "UPDATE ?? SET ? WHERE id=?";
        await db.parameterisedQuery(query, [
          "employee",
          {
            role_id: answers.role_id,
          },
          answers.id,
        ]);

        console.log("Role updated for employee");
      }
    }
  }
};

init();
