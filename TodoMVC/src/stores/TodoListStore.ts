import { action, computed, observable } from 'mobx'

import { RouterUrlPath } from '../constant/RouterUrlPath'

type UUID = number
export type Pathname = typeof RouterUrlPath[keyof typeof RouterUrlPath]

export interface TodoItem {
  id: UUID
  text: string
  isCompleted: boolean
  // TODO:: Todo List Interface 정의
}

/**
 * 참고할만한 블로그 포스팅 : https://helloinyong.tistory.com/175
 */

export class TodoListStore {
  @observable private todoList: Map<UUID, TodoItem>
  @observable private pathname: Pathname
  @observable private idCounter: number

  constructor() {
    this.todoList = new Map<UUID, TodoItem>()
    this.pathname = '/'
    this.idCounter = 0
  }

  public get(id: UUID): TodoItem | undefined {
    return this.todoList.get(id)
  }

  @action
  public add(text: string): void {
    const id = this.idCounter++
    this.todoList.set(id, { id, text, isCompleted: false })
  }

  @action
  public set(todo: TodoItem): void {
    this.todoList.set(todo.id, todo)
  }

  @action
  public delete(id: UUID): boolean {
    return this.todoList.delete(id)
  }

  @action
  public setPathname(pathname: Pathname) {
    this.pathname = pathname
  }

  @computed
  public get todos(): TodoItem[] {
    return Array.from(this.todoList.values())
  }

  @computed
  public get count(): number {
    return this.todos.length
  }

  @computed
  public get currentPathname(): Pathname {
    return this.pathname
  }
}
