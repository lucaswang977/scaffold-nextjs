import TodoList from "@/components/TodoList"
import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

describe("TodoList", () => {
  it("renders todo list", async () => {
    const Result = await TodoList()
    render(Result)

    const addButton = screen.getByRole("button", {
      name: /add/i,
    })

    expect(addButton).toBeInTheDocument()
  })
})
