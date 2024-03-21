import type { ListRowRenderer } from "react-virtualized"
import { List } from "react-virtualized"
import type { UsersListProps } from "../model/types"
import { useSelectElement } from "../model/useSelectElement"
import { User } from "@/entities/index"

import "./UsersList.scss"
import { mockUsers } from "@/shared/mockData"
import { useAppSelector } from "@/app/hooks"
import { selectUsers } from "@/widgets/MyDatabase/model/usersApiSlice"

export const UsersList = ({ ...props }: UsersListProps) => {
  const { selected, handleSelect } = useSelectElement(0)
  const users = useAppSelector(selectUsers)

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <div
          className={`userList__element ${selected === index ? "selected" : ""}`}
          onClick={() => {
            handleSelect(index)
            props.setCurUser(users[index])
          }}
        >
          <User {...users[index]}></User>
        </div>
      </div>
    )
  }

  return (
    <div className="userList">
      <List
        width={600}
        height={1000}
        rowCount={mockUsers.length}
        rowHeight={25}
        style={{ maxWidth: "100%", height: "100vh" }}
        rowRenderer={rowRenderer}
        className="list"
      />
    </div>
  )
}
