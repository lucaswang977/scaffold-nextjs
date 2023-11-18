describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/")
    cy.root().contains("input").should("have.text", "What are you")
  })

  // it("click the theme switcher", () => {
  //   cy.get("[data-testid='theme-switcher']").click()
  //   cy.get("[data-testid='theme-dark']").click()
  //   cy.get("html").should("have.class", "dark")
  // })
})
