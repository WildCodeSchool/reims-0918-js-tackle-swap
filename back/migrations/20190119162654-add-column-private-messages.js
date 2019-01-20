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
  db.addColumn(
    "private_messages",
    "information",
    { type: "boolean", defaultValue: false },
    callback
  );
  db.addColumn(
    "private_messages",
    "not_read",
    { type: "boolean", defaultValue: true },
    callback
  );
};

exports.down = function(db, callback) {
  db.removeColumn("private_messages", "information", callback);
  db.removeColumn("private_messages", "not_read", callback);
};

exports._meta = {
  version: 1
};
