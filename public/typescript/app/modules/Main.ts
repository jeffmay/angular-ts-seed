/// <reference path="../reference.ts" />

module modules {

  main
    .config(($routeProvider: ng.route.IRouteProvider) => {
      $routeProvider
        .when("/home", {template: home.html})
        .when("/tasks", {controller: controllers.TaskListController, template: tasklist.html})
        .otherwise({redirectTo: "/home"})
    })
    .constant("version", "0.1.0")
    .controller(controllers)
    .directive(directives)

}
