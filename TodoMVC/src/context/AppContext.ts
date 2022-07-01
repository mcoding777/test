import { TodoListStore } from '../stores'

export class AppContext {
  public readonly todoListStore: TodoListStore

  constructor() {
    this.todoListStore = new TodoListStore()
  }
}
