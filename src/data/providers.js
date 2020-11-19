import firebase from "gatsby-plugin-firebase"

import SlackLogo from "../images/providers/slack.svg"

export default {
  anonymous: {
    signIn: () => firebase.auth().signInAnonymously()
  },
  google: {
    signIn: () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  microsoft: {
    signIn: () => firebase.auth().signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
  },
  slack: {
    logo: SlackLogo
  },
  sendgrid: {}
}
