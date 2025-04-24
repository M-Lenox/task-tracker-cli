const {
  add,
  update,
  deleteTask,
  list,
  markDone,
  inProgress,
  listByStatus,
} = require("./taskManager.js");

function main() {
  const args = process.argv.slice(2);
  const operation = args[0].toLowerCase();

  let taskDescription, taskID, taskStatus;
  switch (operation) {
    case "add":
      taskDescription = args.slice(1).join(" ");
      add(taskDescription);
      break;

    case "update":
      taskID = args[1];
      taskDescription = args.slice(2).join(" ");
      update(taskID, taskDescription);
      break;

    case "deletetask":
      taskID = args[1];
      deleteTask(taskID);
      break;

    case "list":
      if (args.length === 1) {
        list();
      } else if (args.length === 2) {
        taskStatus = args[1];
        listByStatus(taskStatus);
      } else {
        console.log(
          `Your commands "${args.join(
            " "
          )}" are unrecognized. \nCheck your commands again.`
        );
      }
      break;

    case "mark-done":
      taskID = args[1];
      markDone(taskID);
      break;

    case "in-progress":
      taskID = args[1];
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
}
main();
