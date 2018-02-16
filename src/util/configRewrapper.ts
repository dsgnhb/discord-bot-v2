export = {
  discord: {
    ownerID: process.env.OWNER_ID,
    token: process.env.DISCORD_TOKEN,
  },
  api: {
    endpoint: process.env.API_ENDPOINT,
    token: process.env.API_KEY
  },
  twitter: {
    consumer_key: process.env.TWIITER_CONSUMER_KEY,
    consumer_secret: process.env.TWIITER_CONSUMER_SECRET,
    access_token: process.env.TWIITER_ACCESS_TOKEN,
    access_token_secret: process.env.TWIITER_ACCESS_TOKEN_SECTRET
  },
  env: process.env.ENVIRONMENT,
  development: process.env.ENVIRONMENT.includes('development'),
  debug: process.env.DEBUG.includes('true')
};
