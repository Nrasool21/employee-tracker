const inquirer = require("inquirer");
const DB = require("./db/DB");

const init = async () => {
  let inProgress = true;

  const db = new DB("company_db")

  await db.start()

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
    } else {
      if (action === "addDepartment") {
      }
      if (action === "addRole") {
      }
      if (action === "addEmployee") {
      }
      if (action === "viewDepartment") {
      }
      if (action === "viewRole") {
      }
      if (action === "viewEmployee") {
      }
      if (action === "updateEmployeeRole") {
      }
    }
  }
};

init();
