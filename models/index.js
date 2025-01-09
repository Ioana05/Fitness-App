"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import { pathToFileURL } from "url";
import config from "../config/config.js";

const __dirname = import.meta.dirname;
const env = process.env.NODE_ENV || "development";

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config[env]);
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    config[env]
  );
}

// Fix the file filtering
const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== "index.js" &&
    file.slice(-3) === ".js" &&
    file.indexOf(".test.js") === -1
  );
});

const db = {};

// Load models
await Promise.all(
  modelFiles.map(async (file) => {
    const module = await import(pathToFileURL(path.join(__dirname, file)).href);
    const model = module.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })
);

// Associate models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
