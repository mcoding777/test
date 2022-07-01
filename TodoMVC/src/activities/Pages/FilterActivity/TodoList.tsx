import * as React from 'react'

import XIcon from './x.png'

interface TodoListProps {
  id: number
  text: string
  isCompleted: boolean
  onEdit(id: number, text: string): void
  onCheck(id: number): void
  onDelete(id: number): void
}

export const TodoList = (props: TodoListProps) => {
  const [editMode, setEditMode] = React.useState<boolean>(false) // 수정 모드
  const [text, setText] = React.useState<string>(props.text || '') // input 텍스트

  return (
    <li className="_flex_row_center w-full h-auto" onDoubleClick={() => setEditMode(!editMode)}>
      <div>
        <input
          type="checkbox"
          checked={props.isCompleted}
          className="flex-none w-[30px] h-[30px] m-[10px]"
          onChange={() => props.onCheck(props.id)}
        />
      </div>
      {editMode ? (
        <input
          type="text"
          className="box-border w-full grow h-full text-2xl p-auto"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              props.onEdit(props.id, text)
              setEditMode(false)
            }
          }}
        />
      ) : (
        <div className="grow h-full text-2xl p-auto">{props.text}</div>
      )}
      <div className="flex-none w-[50px]">
        <input
          type="image"
          src={XIcon}
          alt="삭제 버튼"
          height="30px"
          className="cursor-pointer"
          onClick={() => props.onDelete(props.id)}
        />
      </div>
    </li>
  )
}
