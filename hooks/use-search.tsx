"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SearchContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SearchContext = createContext<SearchContextType>({
  open: false,
  setOpen: () => {},
})

export const useSearch = () => useContext(SearchContext)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <SearchContext value={{ open, setOpen }}>
      {children}
    </SearchContext>
  )
}
