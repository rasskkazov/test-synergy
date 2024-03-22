import type { UserType } from "@/entities"

export const mockUsers: UserType[] = new Array(1000000)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `Пользователь${index + 1}`,
    surname: "",
    age: null,
    email: `email${index + 1}@email.com`,
  }))

//не знаю, преобразовывают ли в Map большие данные с сервера
