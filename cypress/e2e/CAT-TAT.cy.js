describe(`Central de Atendimento ao Cliente TAT`, () => {
  beforeEach(() => cy.visit(`./src/index.html`))

  it(`displays the application title`, () => {
    cy.clock()
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    cy.tick(3000)
  })
  it('successfully submits the form with valid data', () => {
    const longText = Cypress._.repeat('hfahkfhafjkahfjkhfhfahkfhafjkahfjkhf', 10)
    cy.clock()
    cy.get(`#firstName`).type(`Luiza`)
    cy.get(`#lastName`).type(`Takenaka`)
    cy.get(`#email`).type(`luiza.takenaka@example.com`)
    cy.get(`#phone`).type(`11987654321`)
    cy.get(`#phone`).should(`have.value`, `11987654321`)
    cy.get(':nth-child(6) > label > strong').should(`be.visible`)
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success > strong').should('be.visible')
    cy.tick(3000)
  })
  it('displays an error message when submitting the form with an invalid email address', () => {
    cy.clock()
    cy.get(`#firstName`).type(`Luiza`)
    cy.get(`#lastName`).type(`Takenaka`)
    cy.get(`#email`).type(`email invalido`)
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('keeps the phone field empty when non-numeric characters are entered', () => {
    cy.get('#phone').type(`aaaaaa`)
    cy.get('#phone').should('have.value', '')
  })
  it('displays an error message when submitting the form without an email address', () => {
    cy.clock()
    cy.get(`#firstName`).type(`Luiza`)
    cy.get(`#lastName`).type(`Takenaka`)
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  it('clears the first name field successfully', () => {
    cy.get(`#firstName`).type(`Luiza`)
      .should(`have.value`, `Luiza`)
      .clear()
      .should(`have.value`, ``)
  })
  it('clears the last name field successfully', () => {
    cy.get(`#lastName`).type(`Takenaka`)
      .should(`have.value`, `Takenaka`)
      .clear()
      .should(`have.value`, ``)
  })
  it('clears the phone field successfully', () => {
    cy.get(`#phone`).type(`31994312607`)
      .should(`have.value`, `31994312607`)
      .clear()
      .should(`have.value`, ``)
  })
  it('displays an error message when submitting the form without filling in the required fields', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })


  it('successfully submits the form using a custom command', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
    cy.tick(3000)
  })

  it('selects the YouTube product by visible text', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('selects the Mentorship product by value', () => {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })
  it('selects a product by index', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('selects each service type radio button', () => {
    cy.get('input[type="radio"]')
      .each(typeOfservice => {
        cy.wrap(typeOfservice)
          .check()
          .should('be.checked')
      })
  })

  it('checks and unchecks each contact preference checkbox', () => {
    cy.get('input[type="checkbox"]')
      .each(typeOfcontact => {
        cy.wrap(typeOfcontact)
          .check()
          .should('be.checked')
          .uncheck()
          .should('not.be.checked')
      })
  })

  it('checks all checkboxes and unchecks the last one', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('uploads a file successfully', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('uploads a file using drag and drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('uploads a file using a fixture alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifies that the privacy policy link opens in a new tab', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  it('opens the privacy policy page by removing the target attribute', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
  it('exibe e oculta as mensagens de sucesso e erro usando . invoke()', () => {
    cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', "Mensagem enviada com sucesso.")
        .invoke('hide')
        .should('not.be.visible')
    cy.get('.error')
        .should('not.be.visible')
        .invoke ('show')
        .should('be.visible')
        .and('contain', "Valide os campos obrigatórios!")
        .invoke('hide')
        .should('not.be.visible')
    })
})