describe('Create participant', () => {
  beforeEach(() => {
    cy.seedRoom('default').then(() => {
      cy.logout()
      cy.visit('/room/test-room-uuid')
    })
  })

  it('Can create a participant', () => {
    cy.seedRoom('default').then(() => {
      cy.contains('What\'s your name?', {timeout: 10_000})
      cy.get('.controls .btn-primary').should('be.disabled')
      cy.get('input[name=displayName]').type('Barbara Smith')
      cy.get('.controls .btn-primary').should('not.be.disabled')
      cy.get('.controls .btn-primary').click()

      cy.contains('Pick a role')
      cy.get('.controls .btn-primary').should('be.disabled')
      cy.get('.role-badge--actioner input').click({force: true})
      cy.get('.controls .btn-primary').should('not.be.disabled')
      cy.get('.controls .btn-primary').click()

      cy.contains('You\'re all set up!')
      cy.get('.controls .btn-primary').click()

      cy.get('.board-title').invoke('text').should('match', /Minimum Viable Ceremonies/)
      cy.get('.sidebar-title').invoke('text').should('match', /Example room/)
      cy.get('.participant-name').invoke('text').should('match', /Barbara Smith/)
      cy.get('.participant-roles').invoke('text').should('match', /Actioner/)
    })
  })
})
