module.exports = {
  apps : [{
    name: 'ecstatk',
    script: 'npm',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'start',
    cwd: '/root/rope/webserver/sites/ecsta',
    instances: 4,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      PORT: 80,
      HOST: '185.214.164.173',
      NODE_ENV: 'development'
    },
    env_production: {
      PORT: 80,
      HOST: '185.214.164.173',
      NODE_ENV: 'production'
    }
  }]
};
