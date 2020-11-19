import { useMemo } from 'react'
import firebase from "gatsby-plugin-firebase"
import providerData from "../data/providers"

export default transition => {
  const auth = useMemo(() => firebase.auth && firebase.auth(), [])
  const signIn = transition(provider => {
    if (auth.currentUser) { return Promise.resolve({ user: auth.currentUser }) }
    auth.useDeviceLanguage()
    auth.setPersistence('local')

    return providerData[provider].signIn()
  })
  const signOut = () => auth.signOut()
  const updateUser = attrs => auth.updateCurrentUser(attrs)

  return {
    signIn, signOut,
    updateUser, currentUser: auth.currentUser || {}
  }
}
