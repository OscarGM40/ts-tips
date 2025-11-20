// https://www.youtube.com/watch?v=vwiOBPV3IJI
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var TodoService = /** @class */ (function () {
    function TodoService() {
        this.tasks = [];
        this.idIndex = 0;
    }
    TodoService.prototype.getTasks = function () {
        return this.tasks;
    };
    TodoService.prototype.addTask = function (data) {
        var newTask = __assign({ id: this.idIndex++, createdAt: new Date() }, data);
        this.tasks.push(newTask);
        return newTask;
    };
    TodoService.prototype.updateTask = function (id, changes) {
        var _a;
        var taskIndex = this.tasks.findIndex(function (task) { return task.id === id; });
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = __assign(__assign({}, this.tasks[taskIndex]), changes);
        }
        return (_a = this.tasks[taskIndex]) !== null && _a !== void 0 ? _a : "no existe una tarea con ese indice";
    };
    return TodoService;
}());
(function () {
    var service = new TodoService();
    console.log(service.getTasks());
    var newTask = {
        title: "nueva tarea",
        completed: false,
    };
    service.addTask(newTask);
    console.log(service.getTasks());
    service.updateTask(0, {
        title: 'changed title',
        completed: true
    });
    console.log(service.getTasks());
})();
