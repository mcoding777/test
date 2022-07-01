describe("메인 테스트", () => {
  beforeEach("방문했다!", () => {
    cy.visit("http://localhost:3000");
  });

  it("todo 입력", () => {
    // Press enter after typing "Cypress Exercise" in a new-todo element
    cy.get(".new-todo").type("할일이다{enter}");

    // The new-todo element's value should be an empty string.
    cy.get(".new-todo").should("have.value", "");

      // The first child of todo-list element will include the "Cypress Exercise" text.
  cy.get(".todo-list li").eq(0).should("contain", "할일이다");

  // The todo-count element will include "1 item left" text. 
  cy.get('.todo-count').should('contain', '1 items left');
  });
});
