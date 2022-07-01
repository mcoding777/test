import * as React from 'react'
import { observer } from 'mobx-react-lite'

import { TodoList } from '.'
import { useStore } from '../../../hooks'

export const FilterTodoList = observer(() => {
  const store = useStore()

  const filterList = store.getFilterList()

  return (
    <React.Fragment>
      {filterList.map((todo, index) => (
        <TodoList
          id={todo.id}
          text={todo.text}
          isCompleted={todo.isCompleted}
          key={index}
          onCheck={(id) => store.onCheckClick(id)}
          onDelete={(id) => store.onDeleteClick(id)}
          onEdit={(id, text) => store.onEditText(id, text)}
        />
      ))}
    </React.Fragment>
  )
})
