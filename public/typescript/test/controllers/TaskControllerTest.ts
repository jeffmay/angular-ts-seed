/// <reference path="../reference.ts" />

describe("TaskController", () => {

  it("should filter completed tasks", () => {
    var $uuid = new NodeUUIDGenerator()
    var $scope: any = {}
    new controllers.TaskListController($scope, $uuid)
    var taskA = new Task($uuid.nextId(), "A")
    var taskB = new Task($uuid.nextId(), "B", true)
    $scope.tasks = [taskA, taskB]
    var uncompletedTasks = $scope.tasks.filter($scope.filterCompleted)
    console.info(uncompletedTasks)
    expect(uncompletedTasks).toEqual([taskA])
  })
})