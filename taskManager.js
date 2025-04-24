const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname + "/tasks.json");

const time = new Date().toLocaleString();

//Add a new task
function add(taskDescription) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      let dataMessage = {
        id: 1,
        description: taskDescription,
        status: "todo",
        createdAt: time,
        updatedAt: time,
      };
      let taskData = [dataMessage];

      fs.writeFile(filePath, JSON.stringify(taskData), (err) => {
        if (err) throw err;
        console.log("Task successfully added.");
      });
    } else {
      let allTasks = JSON.parse(data);

      let taskToAdd = {
        id: allTasks.length + 1,
        description: taskDescription,
        status: "todo",
        createdAt: time,
        updatedAt: time,
      };

      allTasks.push(taskToAdd);

      fs.writeFile(filePath, JSON.stringify(allTasks), (err) => {
        if (err) throw err;
        console.log("Task successfully added.");
      });
    }
  });
}

//Update a task
function update(taskID, taskDescription) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      let allData = JSON.parse(data);
      allData[taskID - 1].description = taskDescription;
      allData[taskID - 1].updatedAt = time;

      fs.writeFile(filePath, JSON.stringify(allData), (err) => {
        if (err) throw err;
        console.log("Task successfully updated.");
      });
    }
  });
}

//Delete a task
function deleteTask(taskID) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    } else {
      let allData = JSON.parse(data);

      if (taskID > allData.length) {
        console.log("No task with such ID");
      } else {
        allData.splice(taskID - 1, 1);

        //updating task IDs
        for (let i = 0; i < allData.length; i++) {
          allData[i].id = i + 1;
        }

        fs.writeFile(filePath, JSON.stringify(allData), (err) => {
          if (err) {
            throw err;
          } else {
            console.log("Deleting task . . . \nTask successfully deleted.");
          }

          if (allData.length === 0) {
            fs.unlink(filePath, (err) => {
              if (err) throw err;
              console.log(
                "All tasks deleted. \nDeleting file ... ... ... \nFile successfully deleted."
              );
            });
          }
        });
      }
    }
  });
}

//List all tasks.
function list() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("No file to list your tasks\n", err);
    } else {
      console.log("id    Task");

      let allData = JSON.parse(data);

      let i = 0;
      while (i < allData.length) {
        console.log(`${allData[i].id}    ${allData[i].description}`);
        i += 1;
      }
    }
  });
}

//Making a task as done.
function markDone(taskID) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("No file to mark your task. \n", err);
    } else {
      let allData = JSON.parse(data);

      if (taskID > allData.length) {
        console.log("No task with such ID");
      } else {
        allData[taskID - 1].status = "done";

        fs.writeFile(filePath, JSON.stringify(allData), (err) => {
          if (err) throw err;
          console.log("Task successfully marked 'done'.");
        });
      }
    }
  });
}

//Mark a task as in progress
function inProgress(taskID) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("No file to mark your task. \n", err);
    } else {
      let allData = JSON.parse(data);

      if (taskID > allData.length) {
        console.log("No task with such ID");
      } else {
        allData[taskID - 1].status = "in-progress";

        fs.writeFile(filePath, JSON.stringify(allData), (err) => {
          if (err) throw err;
          console.log("Task successfully marked 'in-progress'.");
        });
      }
    }
  });
}

//Listing tasks by status
function listByStatus(taskStatus) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    let allData;

    if (err) {
      throw err;
    } else {
      //check for tasks with todo status
      if (taskStatus === "todo") {
        allData = JSON.parse(data);

        let allTodos = allData.filter((todo) => todo.status === "todo");
        console.log("Tasks with todo status. \nid    Task");

        for (let i = 0; i < allTodos.length; i++) {
          console.log(`${allTodos[i].id}    ${allTodos[i].description}`);
        }
      } else if (taskStatus === "done") {
        //check for tasks with done status
        allData = JSON.parse(data);

        let allDone = allData.filter((done) => done.status === "done");
        console.log("Tasks with done status. \nid    Task");

        for (let i = 0; i < allDone.length; i++) {
          console.log(`${allDone[i].id}    ${allDone[i].description}`);
        }
      } else if (taskStatus === "in-progress") {
        //check for tasks with in-progress status
        allData = JSON.parse(data);

        let allInProgress = allData.filter(
          (inProgress) => inProgress.status === "in-progress"
        );
        console.log("Tasks with in-progress status. \nid    Task");

        for (let i = 0; i < allInProgress.length; i++) {
          console.log(
            `${allInProgress[i].id}    ${allInProgress[i].description}`
          );
        }
      } else {
        console.log(`No task with status: ${taskStatus}`);
      }
    }
  });
}

module.exports = {
  add,
  update,
  deleteTask,
  list,
  markDone,
  inProgress,
  listByStatus,
};
