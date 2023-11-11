// We cannot test the component which include another async server components
// Watching for the solution: https://github.com/testing-library/react-testing-library/issues/1209

import TodoList from "@/c/business/TodoList"
import { render, screen } from "@testing-library/react"

import "@testing-library/jest-dom"

describe("TodoList Component", () => {
  it("renders todo list", () => {
    const Result = TodoList()
    render(Result)

    const addButton = screen.getByRole("button", {
      name: /add/i,
    })

    expect(addButton).toBeInTheDocument()
  })
})
