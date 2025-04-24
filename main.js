#!/usr/bin/env node

const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const {
  add,
  update,
  deleteTask,
  list,
  markDone,
  inProgress,
  listByStatus,
} = require("./taskManager.js");

rl.on("close", () => {
  console.log("Exiting program . . . goodbye!👋");
  process.exit(0);
});

console.log("Welcome ... 👋");

function main() {
  rl.question(">>  ", (operations) => {
    const operationArr = operations.trim().split(" ");
    const operation = operationArr[0].toLowerCase();

    let taskDescription, taskID, taskStatus;

    if (operation === "exit") {
      rl.close();
    } else {
      switch (operation) {
        case "add":
          taskDescription = operationArr.slice(1).join(" ");
          add(taskDescription);
          break;

        case "update":
          taskID = operationArr[1];
          taskDescription = operationArr.slice(2).join(" ");
          update(taskID, taskDescription);
          break;

        case "deletetask":
          taskID = operationArr[1];
          deleteTask(taskID);
          break;

        case "list":
          if (operationArr.length === 1) {
            list();
          } else if (operationArr.length === 2) {
            taskStatus = operationArr[1];
            listByStatus(taskStatus);
          } else {
            console.log(
              `Your commands "${operationArr.join(
                " "
              )}" are unrecognized. \nCheck your commands again.`
            );
          }
          break;

        case "mark-done":
          taskID = operationArr[1];
          markDone(taskID);
          break;

        case "in-progress":
          taskID = operationArr[1];
          inProgress(taskID);
          break;

        default:
          console.log(`Your command "${operation}" is unrecognized
                  Available commands:
                  add                   <taskDescription> (required)
                  update                <taskID updateTaskDescription> (required)
                  deleteTask            <taskID> (required)
                  list                  <taskStatus> (optional)
                  mark-done             <taskID> (required)
                  in-progress           <taskID> (required)
                  `);
      }
      //   main();
      setTimeout(main, 50);
    }
  });
}

main();
