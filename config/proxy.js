
'use strict';

const HttpsProxyAgent = require('https-proxy-agent');

const proxyConfig = [
  {
    context: '/api',
    target: 'http://localhost:3000',
    secure: false
  }
];


/*
 * Configures a corporate proxy agent for the API proxy if needed.
 */
function setupForCorporateProxy(proxyConfig) {
  if (!Array.isArray(proxyConfig)) {
    proxyConfig = [proxyConfig];
  }

  const proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  let agent = null;

  if (proxyServer) {
    console.log(`Using corporate proxy server: ${proxyServer}`);
    agent = new HttpsProxyAgent(proxyServer);
    proxyConfig.forEach(entry => { entry.agent = agent; });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
