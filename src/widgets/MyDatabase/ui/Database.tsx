import type { UserType } from "@/entities"
import { UserForm, UsersList } from "@/features"
import { useEffect, useState } from "react"

import "./Database.scss"
import { useInitDatabase } from "../model/useInitDatabase"

export const Database = () => {
  const [curUser, setCurUser] = useState({} as UserType)

  const users = useInitDatabase()

  useEffect(() => {
    if (!curUser?.id) setCurUser(users[0])
  }, [curUser, users])

  return (
    <div className="database">
      <div className="database__userList">
        <UsersList {...{ setCurUser: setCurUser }}></UsersList>
      </div>
      <div className="database__userDisplay">
        <UserForm {...curUser}></UserForm>
      </div>
    </div>
  )
}
