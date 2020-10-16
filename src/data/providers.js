import firebase from "gatsby-plugin-firebase"

export default {
  anonymous: {
    signIn: () => firebase.auth().signInAnonymously()
  },
  google: {
    // Logo: GoogleLogo,
    signIn: () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  },
  microsoft: {
    // Logo: MicrosoftLogo,
    signIn: () => firebase.auth().signInWithPopup(new firebase.auth.OAuthProvider('microsoft.com'))
  }
}
