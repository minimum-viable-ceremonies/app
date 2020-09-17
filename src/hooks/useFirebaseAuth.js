import { useMemo } from "react"
import firebase from "gatsby-plugin-firebase"

const useFirebaseAuth = () => {
  const auth = useMemo(() => firebase.auth(), [firebase])
  const currentUser = useMemo(() => auth.currentUser || {}, [auth.currentUser])
  const providers = useMemo(() => ({
    google: new firebase.auth.GoogleAuthProvider()
  }), [firebase])

  const signIn = provider => {
    if (currentUser.uid) { return Promise.resolve(currentUser) }
    auth.useDeviceLanguage()
    auth.setPersistence('local')

    return providers[provider]
      ? auth.signInWithPopup(providers[provider])
      : auth.signInAnonymously()
  }

  const updateUser = auth.updateCurrentUser
  const signOut = auth.signOut

  return {
    currentUser, updateUser,
    signIn, signOut,
  }
}

export default useFirebaseAuth
