import { useState } from "react"

export const useSelectElement = (initial: number = 0) => {
  const [selected, setSelected] = useState(initial)

  const handleSelect = (elementIndex: number) => {
    setSelected(elementIndex)
  }

  return { selected, handleSelect }
}
