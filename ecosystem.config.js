module.exports = {
  apps: [
    {
      name: 'banhang.spa',
      script: 'serve out -p 4001',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
