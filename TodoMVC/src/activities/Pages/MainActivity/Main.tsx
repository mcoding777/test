import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { FilterTodoList } from '../FilterActivity'
import { useStore } from '../../../hooks'
import ArrowIcon from './images/arrow.png'

interface NavList {
  text: string
  path: string
}

export const Main: React.FC = observer(
  (): JSX.Element => {
    const store = useStore()
    const { pathname } = useLocation()

    // nav 버튼 스타일링
    const navList: NavList[] = [
      { text: 'All', path: '/' },
      { text: 'Active', path: '/active' },
      { text: 'Completed', path: '/completed' },
    ]

    // input 참조
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onInputKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      if (value === '') {
        return
      }

      if (event.key === 'Enter') {
        if (inputRef.current) {
          store.addTodo(value)
          inputRef.current.value = ''
        }
      }
    }

    React.useEffect(() => {
      store.setCurrentPath(pathname)
    }, [store, pathname])

    return (
      <React.Fragment>
        <h1 className="text-[#AF2F2F]/[.15] text-[100px] font-thin text-center">todos</h1>
        <div className="text-[#4d4d4d] font-light shadow-box w-[500px] h-auto flex-col mx-auto bg-white">
          <header className="_flex_row_center w-full h-auto border-solid border border-[#e6e6e6]">
            <div className="w-[50px] text-center">
              <input
                type="image"
                src={ArrowIcon}
                alt="전체 체크 아이콘"
                className={store.todoLength ? 'initial' : 'hidden'}
                onClick={store.onToggleClick}
              />
            </div>
            <input
              type="text"
              placeholder="What needs to be done?"
              className="new-todo p-7 box-border w-full h-full placeholder:text-slate-800/10"
              ref={inputRef}
              onKeyPress={onInputKeypress}
            />
          </header>
          <section className={store.todoLength ? 'w-full h-2/4 _gray_border' : 'hidden'}>
            <ul className='todo-list'>
              <FilterTodoList />
            </ul>
          </section>
          <footer
            className={
              store.todoLength
                ? 'text-[#777] text-center w-full h-auto px-[15px] py-[10px] shadow-double _gray_border _flex_row_center'
                : 'hidden'
            }
          >
            <div className="todo-count w-1/4 h-full">{store.todoLength} items left</div>
            <nav className="w-2/4 h-full">
              {navList.map((item, index) => (
                <Link
                  to={item.path}
                  className={
                    pathname === item.path
                      ? `border border-solid border-[#AF2F2F] rounded-md py-[6px] px-[13px] m-1`
                      : '_nav_style rounded-md'
                  }
                  key={index}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
            <div className="w-1/4 h-full cursor-pointer" onClick={store.onClearClick}>
              Clear Completed
            </div>
          </footer>
        </div>
      </React.Fragment>
    )
  },
)
