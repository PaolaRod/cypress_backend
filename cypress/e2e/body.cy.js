describe("probando body", () => {
  it("validar el header y el content-type", () => {
    cy.request("employees")
      .its('body')
      .its('first_name')
      .should(
        "include",
        "application/json"
      );
  });
});
