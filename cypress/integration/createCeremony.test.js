describe('Create ceremony', () => {
  beforeEach(() => {
    cy.seedRoom('default').then(() => {
      cy.setCookie('test-room-uuid', 'test-participant-uuid')
      cy.visit('/room/test-room-uuid')
    })
  })

  it('Can make a custom ceremony', () => {
    cy.contains('Add custom').click()
    cy.get('input[name=title]').type('Test title')
    cy.get('input[name=subheading]').type('Test subheading')
    cy.get('textarea[name=description]').type('Test description')
    cy.contains('Save').click()

    cy.get('.ReactModal__Content .custom-card')
    cy.contains('Back').click()

    cy.fetchRoom('test-room-uuid').then(room => {
      const ceremony = Object.values(room.ceremonies).find(({ custom }) => custom)
      assert.equal(ceremony.title, 'Test title')
      assert.equal(ceremony.subheading, 'Test subheading')
      assert.equal(ceremony.description, 'Test description')
      assert.equal(ceremony.placement, 'undecided')
    })
  })
})
