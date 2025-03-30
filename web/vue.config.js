const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
    client: {
      webSocketURL: {
        protocol: 'wss', // Force WebSocket protocol to use 'wss'
        hostname: 'courseconnect.study', // Hostname of your site
        port: 443,
        pathname: '/', // Path for WebSocket connections
      },
    },
  },
});
