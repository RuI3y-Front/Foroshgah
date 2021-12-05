interface Todo {
  name: string;
  state: TodoState;
}
enum TodoState {
  New,
  Active,
  Complete,
  Delete,
}
class TodoService {
  private static _lastId: number = 0;

  constructor(private todos:Todo[]){

  }

  private get nextID() {
    return TodoService.getNextId();
  }
  private set lastId(nextID) {
    TodoService._lastId = nextID - 1;
  }
  static getNextId() {
    return (TodoService._lastId += 3);
  }
  add(todo:Todo){
      var newId=this.nextID
  }
  private getAll() {
      return this.todos
  }
}








class TodoStateChanger {
  constructor(protected newState: TodoState) {}

  canChangeState(todo: Todo): boolean {
    return !!todo;
  }

  changeState(todo: Todo): Todo {
    if (this.canChangeState(todo)) {
      todo.state = this.newState;
    }
    return todo;
  }
}

class complateToStateChanger extends TodoStateChanger {
  constructor() {
    super(TodoState.Complete);
   
  }

  canChangeState(todo: Todo): boolean {
    return (
      super.canChangeState(todo) &&
      (todo.state == TodoState.Active || todo.state == TodoState.Delete)
    );
  }
}

class SmartTodo{
    constructor(public name:string){
    }
}
var s=new SmartTodo("AmiR")