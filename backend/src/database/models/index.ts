import { Sequelize } from 'sequelize';
import { Developer } from './developer';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

  const db = {
    Developer: Developer.initModel(sequelize),
  };
  
  Object.values(db).forEach((model: any) => {
    if (model.associate) model.associate(db);
  });

export { sequelize, db };
