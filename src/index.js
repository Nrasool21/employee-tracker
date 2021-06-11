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
      }
      if (action === "addEmployee") {
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
      }
    }
  }
};

init();
