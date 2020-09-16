describe('Edit participant', () => {
  beforeEach(() => {
    cy.seedRoom('default').then(() => {
      cy.setCookie('test-room-uuid', 'test-participant-uuid')
      cy.visit('/room/test-room-uuid')
      cy.get('.participant-actions').click()
    })
  })

  it('Can edit a name', () => {
    cy.get('input[name=displayName]').clear().type('New name')

    cy.wait(500)
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.participants['test-participant-uuid'].displayName, 'New name')
    })
  })

  it('Can edit a users roles', () => {
    cy.get('input[value=actioner]').uncheck({force: true})
    cy.get('input[value=cheerleader]').check({force: true})

    cy.wait(500)
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.participants['test-participant-uuid'].roles.length, 1)
      assert.equal(room.participants['test-participant-uuid'].roles[0], 'cheerleader')
    })
  })
})
