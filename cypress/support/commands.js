import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import { attachCustomCommands } from "cypress-firebase"

firebase.initializeApp({
  apiKey: Cypress.env('apiKey'),
  authDomain: `${Cypress.env('DOMAIN')}.firebaseapp.com`,
  databaseURL: `https://${Cypress.env('DOMAIN')}.firebaseio.com`,
  projectId: `${Cypress.env('DOMAIN')}`,
  storageBucket: `${Cypress.env('API_KEY')}.appspot.com`,
})

attachCustomCommands({ Cypress, cy, firebase })

const seed = model => fixture => (
  cy.fixture(`${model}/${fixture}.json`).then(json => (
    cy.callRtdb('set', `${model}/${json.uuid}`, json)
  ))
)

const fetch = model => uuid => (
  cy.callRtdb('get', `${model}/${uuid}`)
)

Cypress.Commands.add('seedRoom', seed('rooms'))
Cypress.Commands.add('seedOrganization', seed('organizations'))
Cypress.Commands.add('fetchRoom', fetch('rooms'))
Cypress.Commands.add('fetchOrganization', fetch('organizations'))
