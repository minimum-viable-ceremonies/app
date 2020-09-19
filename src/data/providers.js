import firebase from "gatsby-plugin-firebase"
import GoogleLogo from "../images/icons/symbols/google.svg"
import MicrosoftLogo from "../images/icons/symbols/hash.svg" // todo get proper icon library

export default {
  anonymous: {
    signIn: () => firebase.auth().signInAnonymously()
  },
  google: {
    Logo: GoogleLogo,
    signIn: () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  microsoft: {
    Logo: MicrosoftLogo,
    signIn: () => firebase.auth().signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
  }
}
