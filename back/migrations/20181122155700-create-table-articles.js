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
    "articles",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      name: { type: "string", notNull: true },
      swap: { type: "boolean", notNull: true, defaultValue: false },
      description: { type: "text" },
      brand: { type: "string", length: 100 },
      picture: { type: "string" },
      article_length: { type: "decimal", length: "6,2" },
      article_weight: { type: "int", length: 4 },
      article_color: { type: "string", length: 50 },
      article_state: { type: "int", length: 1 },
      create_at: {
        type: "datetime",
        notNull: true,
        defaultValue: new String("NOW()")
      },
      owner_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "articles_users_id_fk",
          table: "users",
          mapping: "id",
          rules: { onDelete: "CASCADE" }
        }
      }
    },
    callback
  );
};

exports.down = function(db, callback) {
  db.dropTable("articles", callback);
};

exports._meta = {
  version: 1
};
