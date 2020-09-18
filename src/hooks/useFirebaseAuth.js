import { useMemo } from "react"
import firebase from "gatsby-plugin-firebase"

const useFirebaseAuth = () => {
  const auth = useMemo(() => firebase.auth && firebase.auth(), [])
  const providers = useMemo(() => ({
    google: {
      signIn: () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
      map: ({ user }) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        image: user.photoURL,
      })
    },
    anonymous: {
      signIn: () => auth.signInAnonymously(),
      map: result => result
    }
  }), [])
  const signIn = provider => {
    if (auth.currentUser) { return Promise.resolve({ user: auth.currentUser }) }
    auth.useDeviceLanguage()
    auth.setPersistence('local')

    return providers[provider].signIn()
  }
  const signOut = () => auth.signOut()
  const updateUser = attrs => auth.updateCurrentUser(attrs)

  return {
    providers,
    currentUser: (auth && auth.currentUser) || {},
    signIn, signOut,
    updateUser,
  }
}

export default useFirebaseAuth
