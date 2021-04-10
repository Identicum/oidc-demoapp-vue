# oidc-demoapp-vue
OpenID Connect (OIDC) VueJS demo application using using library: [oidc-client](https://github.com/IdentityModel/oidc-client-js).
Authentication flow data is handled by Vuex.

Support:
* OpenID Connect Authentication (Authorization Code flow with PCKE)
* Token Negotiation
* OAuth API Call

In order to test the API call, you can use our [OAuth demo API](https://github.com/Identicum/oauth-demoapi-spring).

## Installation

### Clone repository
```
git clone git@github.com:https://github.com/Identicum/oidc-demoapp-vue.git
```

### Configuration file

Adjust the oidc client parameters in the file [oidc-client.js](src/oidc/oidc-client.js)

### Run

#### Run locally
```
npm run serve
```
You can access to the UI on http://hostname:8080/

#### Run as Docker
```
docker build -t identicum/oidc-demoapp-vue .
docker run -d --name oidc-demoapp-vue -p xxxx:80 -e VUE_APP_OIDC_PROVIDER_DOMAIN=https://idp.domain.com -e VUE_APP_CLIENT_ID=my_client_id -e VUE_APP_API_URL=http://localhost:8081/api/v1/products identicum/oidc-demoapp-vue
```

### App configuration:
Go to the Settings section in the app and change the configuration

## Screenshots

![App login](src/assets/screenshot-login.png)

![App menu](src/assets/screenshot-home.png)

![App tokens](src/assets/screenshot-tokens.png)
