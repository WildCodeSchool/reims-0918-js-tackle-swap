"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable(
    "users",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      lastname: { type: "string", notNull: true, length: 100 },
      firstname: { type: "string", notNull: true, length: 100 },
      nickname: { type: "string", length: 100 },
      email: { type: "string", notNull: true },
      password: { type: "string", notNull: true },
      registration_date: {
        type: "datetime",
        notNull: true,
        defaultValue: new String("NOW()")
      },
      profil_picture: { type: "string" },
      adress: { type: "string" },
      city: { type: "string", length: 100 },
      postal_code: { type: "string", length: 10 },
      gender: { type: "char", notNull: true, length: 1 },
      description: { type: "text" }
    },
    callback
  );
};

exports.down = function(db, callback) {
  db.dropTable("users", callback);
};

exports._meta = {
  version: 1
};
