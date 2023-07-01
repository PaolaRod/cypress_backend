describe("probando headers y status code", () => {
  it("validar el header y el content-type", () => {
    cy.request('employees').its('headers').its('content-type').should('include','application/json')
  });

  it("Debe validar status code exitoso", () => {
    cy.request('employees').its('status').should('eq', 200)
  });

  it("Debe validar status code exitoso", () => {
    cy.request({url:'employees/4', failOnStatusCode: false}).its('status').should('eq', 404)
  })

  it("should validate 201 Created status code when creating a new employee and 200 Ok status code when deleting the just created employee", function () {
    cy.request("POST", "employees", {
      name: "Joe",
      lastname: "Doe",
      email: "joe_doe@gmail.com",
    }).as("createdEmployee");

    cy.get("@createdEmployee").its("status").should("eq", 201);

    cy.get("@createdEmployee")
      .its("body")
      .its("id")
      .then((createdEmployeeId) => {
        cy.request("DELETE", `employees/${createdEmployeeId}`)
          .its("status")
          .should("eq", 200);
      });
  });

});
