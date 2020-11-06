import React from "react"

import Layout from "../components/layout"
import Intro from "../components/intro"
import SEO from "../components/seo"

import initTranslations from "../locales/react"
initTranslations('app')

const IndexPage = () => (
  <Layout>
    <SEO page="home" />
    <Intro />
  </Layout>
)

export default IndexPage
