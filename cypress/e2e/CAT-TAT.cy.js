describe (`Central de Atendimento ao Cliente TAT`, () => {
      beforeEach(() => cy.visit(`./src/index.html`))

  it (`Verifica o título da aplicação`, () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
    it('Preenche Formulário Campos', () => {
    const longText = Cypress._.repeat('hfahkfhafjkahfjkhfhfahkfhafjkahfjkhf', 10)
    cy.get(`#firstName`).type(`Luiza`)
    cy.get(`#lastName`).type(`Takenaka`)
    cy.get(`#email`).type(`luiza.takenaka@example.com`)
    cy.get(`#phone`).type(`11987654321`)
    cy.get(`#phone`).should(`have.value`, `11987654321`)
    cy.get(':nth-child(6) > label > strong').should(`be.visible`)
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('button[type="submit"]').click()

    cy.get('.success > strong').should('be.visible')
  })
  it('Exibe mensagem de erro ao submeter o funcionario com um email com formatacao incorreta',() => { 
    cy.get(`#firstName`).type(`Luiza`)
    cy.get(`#lastName`).type(`Takenaka`)
    cy.get(`#email`).type(`um email bem invalido`)
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it.only('Label phone kept in blank when typing letters and not numbers',() => { 
    cy.get('#phone').type(`aaaaaa`)
    cy.get('#phone').should('have.value','')
  })
})
