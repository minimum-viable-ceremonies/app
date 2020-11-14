import React from "react"
import { Router } from '@reach/router'
import Layout from "../components/layout"
import Room from "../components/room"

import initTranslations from "../locales/react"
initTranslations('app')

const RoomPage = () => (
  <Layout>
    <Router>
      <Room path='/room/:uuid' />
    </Router>
  </Layout>
)

export default RoomPage
