import React, { Suspense } from "react"
import FreshChat from "react-freshchat"
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react"

import "../styles/layout.scss"

const Layout = ({ children }) => (
  <MatomoProvider value={process.env.MATOMO_SITE_ID ? createInstance({
    urlBase: process.env.MATOMO_URL,
    siteId: process.env.MATOMO_SITE_ID
  }) : {}}>
    {process.env.FRESHCHAT_TOKEN && <FreshChat
      host={process.env.FRESHCHAT_HOST}
      token={process.env.FRESHCHAT_TOKEN}
      siteId={process.env.FIREBASE_DOMAIN}
    />}
    <Suspense>
      <main>{children}</main>
    </Suspense>
  </MatomoProvider>
)

export default Layout
