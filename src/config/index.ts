const config = {
    log4js: {
      appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'app.log' }
      },
      categories: {
        default: { appenders: ['console', 'file'], level: 'debug' }
      }
    }
  };
  
  export default config;
  