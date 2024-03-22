import type { UserType } from "@/entities"

export type UserFormProps = {
  user: UserType
  setCurUser: (user: UserType) => void
}
