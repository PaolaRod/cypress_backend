describe("probando request", () => {
  before("create an employee", () => {
    cy.request({
      url: "employees",
      method: "POST",
      body: {
        first_name: "Paola",
        last_name: "Rodriguez",
        email: "paola@platzi.com"
      },
    }).then(response => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("id");

        const id = response.body.id;
        cy.wrap(id).as('id')

        const email = response.body.email;
        cy.wrap(email).as('email')
    })
  });

  it("validate that the user has been created in the data base", () => {
    cy.request({
      url: "employees",
      method: "GET",
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body[response.body.length - 1].first_name).to.eq("Paola");
    })
  });

  it("it must modify to employee with a new email", function() {
    cy.request({
      url: `employees/${this.id}`,
      method: "PATCH",
      body: {
      email: "dipiabit@gmail.com"
    }
    }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.email).to.eq("dipiabit@gmail.com");
        expect(response.body.email).to.not.eq(this.email);
    })
  });

  after("it must delete the created user", function() {
    cy.request({
      url: `employees/${this.id}`,
      method: "DELETE",
    }).then(response => {
        expect(response.status).to.eq(200);
    })
  });
});
