import { createAppSlice } from "@/app/createAppSlice"
import type { UserType } from "@/entities"
import type { PayloadAction } from "@reduxjs/toolkit"
import { fetchUsers } from "../api/fetchUsers"

export interface UsersSliceState {
  users: UserType[]
  status: "idle" | "loading" | "failed"
}

const initialState: UsersSliceState = {
  users: [],
  status: "idle",
}

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    setUsersData: create.reducer((state, action: PayloadAction<UserType>) => {
      console.log("payload ", action.payload)

      state.users = state.users.map(user => {
        if (user.id === action.payload.id) {
          return { ...user, ...action.payload }
        }
        return user
      })
    }),

    getUsers: create.asyncThunk(
      async (signal: AbortSignal) => {
        const response = await fetchUsers(signal)
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.users = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectUsers: users => users.users,
    selectUsersStatus: users => users.status,
  },
})

export const { getUsers, setUsersData } = usersSlice.actions
export const { selectUsers, selectUsersStatus } = usersSlice.selectors
