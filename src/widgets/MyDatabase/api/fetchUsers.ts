import type { UserType } from "@/entities"
import { mockUsers } from "@/shared/mockData"

export const fetchUsers = (signal: AbortSignal) => {
  return new Promise<{ data: UserType[] }>((resolve, reject) => {
    const timer = setTimeout(() => resolve({ data: mockUsers }), 500)

    signal.addEventListener("abort", () => {
      clearTimeout(timer)
      reject(new Error("Fetching users aborted, reason: " + signal.reason))
    })
  })
}
