describe (`Central de Atendimento ao Cliente TAT`, () => {
  it (`Verifica o título da aplicação`, () => {
    cy.visit(`./src/index.html`)
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.get(`#firstName`).type(`Luiza`)
    cy.get(`#lastName`).type(`Takenaka`)
    cy.get(`#email`).type(`luiza.takenaka@example.com`)
    cy.get(`#phone`).type(`11987654321`)
    .should(`have.value`, `11987654321`)
  })
})