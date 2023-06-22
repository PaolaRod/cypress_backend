describe("probando headers", () => {
  it("validar el header y el content-type", () => {
    cy.request('employees').its('headers').its('content-type').should('include','application/json')
  });
});
