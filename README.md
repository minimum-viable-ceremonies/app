# Minimum Viable Ceremonies

This is an app designed to help teams improve their agile processes, a part of https://minimal.cards. This repo is live at https://mvc.minimal.cards.

It's written on the excellent [Gatsby](https://www.gatsbyjs.org/) framework, with a [Firebase](https://firebase.google.com/) backend.

###  ⚖️ **License.**

Minimum Viable Ceremonies is an open source project under the [GNU AGPL 3.0](https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0)#summary) license.

###  🔧 **Developing.**

```shell
gatsby develop
```

NB that in order to connect to the database you'll need two ENV variables set:
```shell
export MVC_FIREBASE_API_KEY="<api_key>"
export MVC_FIREBASE_DOMAIN="<domain>"
```

###  🔬 **Testing.**

We use [Cypress](https://www.cypress.io/) to run end to end tests on our code.

```shell
npm run test
```
or, to run inline in the terminal:
```shell
npm run test:ci
```

###  🚀 **Building for production.**

```shell
gatsby build
```

### 💫 **Deploying.**

Pushing to the master branch of this repo will automatically publish to firebase:

```
https://mvc.minimal.cards/
```

### 👀 **Analytics**

In order to enable [Matomo](https://matomo.org/home/) for analytics in development (for example to test out some new analytics functionality), create an `.env.development` file, with the following values:

```shell
MATOMO_URL=https://stats.minimal.cards/piwik/
MATOMO_SITE_ID=1
```

To view the analytics coming through, visit [the analytics dashboard](https://stats.minimal.cards/piwik/index.php?module=CoreHome&action=index&idSite=1&period=day&date=yesterday#?idSite=1&period=day&date=yesterday&segment=&category=Dashboard_Dashboard&subcategory=1) and ensure you're viewing the `Minimum Viable Ceremonies (dev)` site.

### 💬 **LiveChat**

To view the [Freshchat](https://www.freshworks.com/live-chat-software/) widget, put the following into an `.env.development` file:

```shell
FRESHCHAT_TOKEN=<API_TOKEN>
FRESHCHAT_HOST=https://wchat.au.freshchat.com
```

### 📖 **Translating**

Visit our [translation page](https://translate.minimal.cards) to translate Minimum Viable Ceremonies into your language!

In order to publish translations, you'll need to set an API key for Crowdin:
```shell
CROWDIN_API_KEY=<API_TOKEN>
```
