import { useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import providerData from "../data/providers"

const useFirebaseAuth = () => {
  const auth = useMemo(() => firebase.auth && firebase.auth(), [])
  const signIn = provider => {
    if (auth.currentUser) { return Promise.resolve({ user: auth.currentUser }) }
    auth.useDeviceLanguage()
    auth.setPersistence('local')

    return providerData[provider].signIn()
  }
  const signOut = () => auth.signOut()
  const updateUser = attrs => auth.updateCurrentUser(attrs)

  return {
    currentUser: (auth && auth.currentUser) || {},
    signIn, signOut,
    updateUser,
  }
}

export default useFirebaseAuth
