import type { UserType } from "@/entities"
import { UserForm, UsersList } from "@/features"
import { useState } from "react"

import "./Database.scss"
import { useInitDatabase } from "../model/useInitDatabase"
import { useAppSelector } from "@/app/hooks"
import { selectUsers, selectUsersStatus } from "../model/usersApiSlice"

export const Database = () => {
  useInitDatabase()

  const [curUser, setCurUser] = useState({ id: 0 } as UserType)
  const users = useAppSelector(selectUsers)
  const status = useAppSelector(selectUsersStatus)

  if (status === "fulfilled" && curUser.id === 0) setCurUser(users[0])

  return (
    <div className="database">
      {status === "fulfilled" && (
        <>
          <div className="database__userList">
            <UsersList {...{ setCurUser }}></UsersList>
          </div>
          <div className="database__userDisplay">
            <UserForm key={curUser.id} user={curUser}></UserForm>
          </div>
        </>
      )}

      {status !== "fulfilled" && <div>Загрузка...</div>}
    </div>
  )
}
