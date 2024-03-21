import type { UserType } from "@/entities"
import "./UsesrForm.scss"
import { useAppDispatch } from "@/app/hooks"
import { useState, type SyntheticEvent, useEffect } from "react"
import { setUsersData } from "@/widgets/MyDatabase/model/usersApiSlice"

export const UserForm = ({ ...props }: UserType) => {
  let displayName = "Загрузка ..."
  if (props.id) {
    displayName = `${props.name} ${props.surname}`
  }

  const [inputsUserData, setInputsUserData] = useState<UserType>({} as UserType)

  useEffect(() => {
    setInputsUserData({
      id: props.id,
      name: props.name,
      surname: props.surname,
      age: props.age,
      email: props.email,
    })
  }, [props.age, props.email, props.id, props.name, props.surname])

  const handleInput = (newVal: any, prop: any) => {
    setInputsUserData(prev => {
      return {
        ...prev,
        [prop]: newVal,
      }
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
        <div className="userForm__title">{displayName}</div>
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
            {Object.keys(props).map(prop => {
              return <div key={prop}>{prop}</div>
            })}
          </div>
          <div className="userForm__dataContent">
            <input key={`${props.id}id`} value={props.id} readOnly />
            {Object.entries(props).map(([prop, value]) => {
              if (prop === "id") return null
              return (
                <input
                  key={`${props.id}${prop}`}
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
