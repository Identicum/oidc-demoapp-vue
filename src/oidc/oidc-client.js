import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = (process.env.NODE_ENV === 'production') ? Oidc.Log.ERROR : Oidc.Log.DEBUG;

// OIDC client configuration
let oidcProviderDomain = 'https://gluu.hlgv.net';
let clientId = "8d4a1917-48ba-47c4-bf2f-066b36b03736";
let scopes = "openid profile api.identicum.com/product:write api.identicum.com/product:read"


let instance;

export const getOidcClient = () => {
  if (instance) {
      return instance;
  }

  instance = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore(),  
    authority: oidcProviderDomain,
    client_id: clientId,
    redirect_uri: window.location.origin + '/callback',
    response_type: 'code',
    scope: scopes,
    post_logout_redirect_uri: window.location.origin + '/home?action=logout',
    accessTokenExpiringNotificationTime: 10,
    automaticSilentRenew: false,
    filterProtocolClaims: false,
    loadUserInfo: true,
    includeIdTokenInSilentRenew : false
  });
  return instance;
}