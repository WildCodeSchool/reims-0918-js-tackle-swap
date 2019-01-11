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
  db.insert(
    "private_messages",
    ["message", "room", "sender", "recipient", "article_id"],
    ["Salut, comment vas tu ?", "2-2-1", 1, 2, 2],
    callback
  );
  db.insert(
    "private_messages",
    ["message", "room", "sender", "recipient", "article_id"],
    ["Très bien et toi ?", "2-2-1", 2, 1, 2],
    callback
  );
};

exports.down = function(db, callback) {
  return null;
};

exports._meta = {
  version: 1
};
