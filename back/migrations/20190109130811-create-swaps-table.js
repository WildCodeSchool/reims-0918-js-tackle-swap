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
    "swaps",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      id_article_annonce: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "swaps_articles_id_annonce_fk",
          table: "articles",
          mapping: "id",
          rules: { onDelete: "CASCADE" }
        }
      },
      id_article_offer: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "swaps_articles_id_offer_fk",
          table: "articles",
          mapping: "id",
          rules: { onDelete: "CASCADE" }
        }
      },
      accepted: { type: "boolean", defaultValue: false },
      refused: { type: "boolean", defaultValue: false }
    },
    callback
  );
};

exports.down = function(db, callback) {
  db.dropTable("swaps", callback);
};

exports._meta = {
  version: 1
};
