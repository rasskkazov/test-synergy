import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { getUsers, selectUsers } from "./usersApiSlice"

export const useInitDatabase = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const ac = new AbortController()
    dispatch(getUsers(ac.signal))
    return () => ac.abort("database unmounted")
  }, [dispatch])

  return useAppSelector(selectUsers)
}
