import { useLocalStore } from 'mobx-react-lite'

import { Pathname } from '../stores/TodoListStore'
import { useAppContext } from '../context'

export const useStore = () => {
  const { todoListStore } = useAppContext() // 현재 todo 리스트 가져오기

  const store = useLocalStore(() => ({
    get todoList() {
      return todoListStore.todos
    },
    get todoLength() {
      return todoListStore.count
    },
    getTodo(id: number) {
      return todoListStore.get(id)
    },
    addTodo(text: string) {
      return todoListStore.add(text)
    },
    setTodo(props: { id: number; text: string; isCompleted: boolean }) {
      return todoListStore.set({
        id: props.id,
        text: props.text,
        isCompleted: props.isCompleted || false,
      })
    },
    setCurrentPath(pathname: Pathname) {
      return todoListStore.setPathname(pathname)
    },
    getFilterList() {
      const currentPathname = todoListStore.currentPathname
      const filterList = todoListStore.todos.filter((item) => {
        switch (currentPathname) {
          case '/active':
            return !item.isCompleted
          case '/completed':
            return item.isCompleted
          default:
            return item
        }
      })
      return filterList
    },
    onCheckClick(id: number) {
      const currentItem = this.getTodo(id)
      if (currentItem) {
        currentItem.isCompleted = !currentItem.isCompleted
        this.setTodo(currentItem)
      }
    },
    onDeleteClick(id: number) {
      todoListStore.delete(id)
    },

    onToggleClick() {
      this.todoList.forEach((item) => this.onCheckClick(item.id))
    },

    onClearClick() {
      const clearStore = this.todoList.filter((item) => item.isCompleted)
      clearStore.forEach((item) => this.onDeleteClick(item.id))
    },
    onEditText(id: number, text: string) {
      if (text === '') {
        store.onDeleteClick(id)
      }
      const currentItem = store.getTodo(id)

      if (currentItem) {
        currentItem.text = text
        this.setTodo(currentItem)
      }
    },
  }))

  return store
}
