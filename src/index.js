const inquirer = require("inquirer");

const init = async () => {
  let inProgress = true;

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
      console.log(action);
    }
  }
};

init();
