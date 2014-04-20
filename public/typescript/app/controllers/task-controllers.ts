/// <reference path="../reference.ts" />

/* Note:
 *
 * If there is no controllers module, TypeScript will complain in the Main module.
 *
 * If you want to remove this module, just replace it with:
 * var directives = {}
 */

module controllers {

  interface CreateTaskForm {
    description: string;
  }

  export class TaskListController {

    constructor($scope: any, uuid: EntityIdGenerator) {
      $scope.tasks = [
        new Task(uuid.nextId(), "Task A"),
        new Task(uuid.nextId(), "Task B"),
      ]
      $scope.createTask = (taskForm: CreateTaskForm) => {
        $scope.tasks.push(new Task(uuid.nextId(), taskForm.description))
        taskForm.description = ""
      }
      $scope.filterCompleted = (task: Task) => $scope.showCompleted || !task.completed
      $scope.showCompleted = false
    }
  }
}