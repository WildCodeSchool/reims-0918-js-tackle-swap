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
    "pictures_articles",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      url_picture: { type: "string" },
      main_picture: { type: "boolean", notNull: true, defaultValue: false },
      upload_at: {
        type: "datetime",
        notNull: true,
        defaultValue: new String("NOW()")
      },
      article_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "pictures_articles_articles_id_fk",
          table: "articles",
          mapping: "id",
          rules: { onDelete: "CASCADE" }
        }
      }
    },
    callback
  );
};

exports.down = function(db, callback) {
  db.dropTable("pictures_articles", callback);
};

exports._meta = {
  version: 1
};
