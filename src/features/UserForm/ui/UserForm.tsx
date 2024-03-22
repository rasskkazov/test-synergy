import { useAppDispatch } from "@/app/hooks"
import { useState, type SyntheticEvent } from "react"
import { setUsersData } from "@/widgets/MyDatabase/model/usersApiSlice"
import type { UserType } from "@/entities"
import "./UsesrForm.scss"

type UserFormProps = {
  user: UserType
}

export const UserForm = (props: UserFormProps) => {
  const [inputsUserData, setInputsUserData] = useState(props.user)

  const handleInput = (newVal: string, prop: string) => {
    setInputsUserData({
      ...inputsUserData,
      [prop]: newVal,
    })
  }

  const dispatch = useAppDispatch()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(setUsersData(inputsUserData))
  }

  return (
    <div className="userForm">
      <div className="userForm__header">
        <div className="userForm__title">{`${inputsUserData.name} ${inputsUserData.surname}`}</div>
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
            {Object.keys(inputsUserData).map(prop => {
              return <div key={prop}>{prop}</div>
            })}
          </div>
          <div className="userForm__dataContent">
            <input
              key={`${inputsUserData.id}id`}
              value={inputsUserData.id}
              readOnly
            />
            {Object.entries(inputsUserData).map(([prop, value]) => {
              if (prop === "id") return null
              return (
                <input
                  key={`${inputsUserData.id}${prop}`}
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
