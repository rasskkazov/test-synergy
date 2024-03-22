import { useAppDispatch } from "@/app/hooks"
import { type SyntheticEvent } from "react"
import { setUsersData } from "@/widgets/MyDatabase/model/usersApiSlice"
import type { UserFormProps } from "../model/types"
import "./UsesrForm.scss"

export const UserForm = (props: UserFormProps) => {
  let inputsUserData = props.user

  const handleInput = (newVal: string, prop: string) => {
    inputsUserData = {
      ...inputsUserData,
      [prop]: newVal,
    }
  }

  const dispatch = useAppDispatch()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(setUsersData(inputsUserData))
    props.setCurUser(inputsUserData)
  }

  return (
    <div className="userForm">
      <div className="userForm__header">
        <div className="userForm__title">{`${props.user.name} ${props.user.surname}`}</div>
      </div>
      <div className="userForm__info">
        <div className="userForm__photo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="user"
          ></img>
        </div>
        <form className="userForm__data" onSubmit={handleSubmit}>
          <div className="userForm__dataTitles">
            {Object.keys(props.user).map(prop => {
              return <div key={prop}>{prop}</div>
            })}
          </div>
          <div className="userForm__dataContent">
            <input key={`${props.user.id}id`} value={props.user.id} readOnly />
            {Object.entries(props.user).map(([prop, value]) => {
              if (prop === "id") return null
              return (
                <input
                  key={`${props.user.id}${prop}`}
                  placeholder="Не указано"
                  defaultValue={value ?? ""}
                  onChange={event => {
                    handleInput(event.target.value, prop)
                  }}
                />
              )
            })}
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  )
}
