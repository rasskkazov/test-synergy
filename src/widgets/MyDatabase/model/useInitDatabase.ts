import { useAppDispatch } from "@/app/hooks"
import { useEffect } from "react"
import { getUsers } from "./usersApiSlice"

export const useInitDatabase = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const ac = new AbortController()
    dispatch(getUsers(ac.signal))
    return () => ac.abort("database unmounted")
  }, [dispatch])
}
