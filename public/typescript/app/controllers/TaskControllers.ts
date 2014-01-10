/// <reference path="../reference.ts" />

module controllers {

  interface CreateTaskForm {
    description: string;
  }

  export class TaskListController {

    constructor($scope, $uuid: UUIDGenerator) {
      $scope.tasks = [
        new Task($uuid.nextId(), "Task A"),
        new Task($uuid.nextId(), "Task B")
      ];
      $scope.createTask = (taskForm: CreateTaskForm) => {
        $scope.tasks.push(new Task($uuid.nextId(), taskForm.description));
        taskForm.description = "";
      };
      $scope.filterCompleted = (task: Task) => $scope.showCompleted || !task.completed;
      $scope.showCompleted = false;
    }
  }
}