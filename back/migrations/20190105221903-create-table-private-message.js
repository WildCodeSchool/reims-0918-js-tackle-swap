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
    "private_messages",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true, length: 11 },
      message: "text",
      room: "string",
      sender: "int",
      recipient: "int",
      send_at: {
        type: "datetime",
        notNull: true,
        defaultValue: new String("NOW()")
      }
    },
    callback
  );
};

exports.down = function(db, callback) {
  db.dropTable("private_messages", callback);
};

exports._meta = {
  version: 1
};
