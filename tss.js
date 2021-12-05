var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TodoState;
(function (TodoState) {
    TodoState[TodoState["New"] = 0] = "New";
    TodoState[TodoState["Active"] = 1] = "Active";
    TodoState[TodoState["Complete"] = 2] = "Complete";
    TodoState[TodoState["Delete"] = 3] = "Delete";
})(TodoState || (TodoState = {}));
var TodoService = /** @class */ (function () {
    function TodoService(todos) {
        this.todos = todos;
    }
    Object.defineProperty(TodoService.prototype, "nextID", {
        get: function () {
            return TodoService.getNextId();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TodoService.prototype, "lastId", {
        set: function (nextID) {
            TodoService._lastId = nextID - 1;
        },
        enumerable: false,
        configurable: true
    });
    TodoService.getNextId = function () {
        return (TodoService._lastId += 3);
    };
    TodoService.prototype.add = function (todo) {
        var newId = this.nextID;
    };
    TodoService.prototype.getAll = function () {
        return this.todos;
    };
    TodoService._lastId = 0;
    return TodoService;
}());
var TodoStateChanger = /** @class */ (function () {
    function TodoStateChanger(newState) {
        this.newState = newState;
    }
    TodoStateChanger.prototype.canChangeState = function (todo) {
        return !!todo;
    };
    TodoStateChanger.prototype.changeState = function (todo) {
        if (this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        return todo;
    };
    return TodoStateChanger;
}());
var complateToStateChanger = /** @class */ (function (_super) {
    __extends(complateToStateChanger, _super);
    function complateToStateChanger() {
        return _super.call(this, TodoState.Complete) || this;
    }
    complateToStateChanger.prototype.canChangeState = function (todo) {
        return (_super.prototype.canChangeState.call(this, todo) &&
            (todo.state == TodoState.Active || todo.state == TodoState.Delete));
    };
    return complateToStateChanger;
}(TodoStateChanger));
var SmartTodo = /** @class */ (function () {
    function SmartTodo(name) {
        this.name = name;
    }
    return SmartTodo;
}());
var s = new SmartTodo("AmiR");
