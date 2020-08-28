describe('Edit room', () => {
  beforeEach(() => {
    cy.seedRoom('default').then(() => {
      cy.setCookie('test-room-uuid', 'test-participant-uuid')
      cy.visit('/room/test-room-uuid')
    })
  })

  // it('Can move a ceremony on the board', () => {}) // TODO

  it('Can copy the shareable link', () => {
    cy.contains('Share room').click()
    cy.contains('Copied to clipboard!')
  })

  it('Can collapse and expand the sidebar', () => {
    cy.get('.sidebar-collapse').click()
    cy.get('.sidebar.collapsed')
    cy.get('.sidebar-collapsed-item .shareable-link')
    cy.get('.sidebar-collapsed-item .sidebar-collapsed-participant')
    cy.get('.sidebar-collapsed-item .sidebar-collapsed-setup-room')

    cy.get('.sidebar-collapsed-item .closed').click()
    cy.get('sidebar.expanded')
  })

  it('Can add and remove a sprint week', () => {
    cy.contains('Add sprint week').click()

    cy.wait(500)
    cy.contains('Sprint week 2')
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.weekCount, 2)
    })

    cy.contains('Remove sprint week').click()

    cy.wait(500)
    cy.fetchRoom('test-room-uuid').then(room => {
      assert.equal(room.weekCount, 1)
    })
  })

  it('Can create a new room', () => {}) // TODO (NB currently broken)
})
