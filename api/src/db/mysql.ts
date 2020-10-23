import config from "../config"
const mysql = require('mysql2')
const connection = mysql.createConnection({    
    host: config.mysql.host,      
    user: config.mysql.user,             
    password: config.mysql.password,      
    port:config.mysql.port,                  
    database:config.mysql.database
  });
  export default connection