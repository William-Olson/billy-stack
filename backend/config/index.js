
module.exports = Object.assign({},
 require('./server'),
 require('./core'),
 {
   NODE_ENV: process.env.NODE_ENV || 'development',
   SERVICES: process.env.SERVICES || ''
 }
);
