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
    ["message", "room", "sender", "recipient"],
    ["Salut, comment vas tu ?", "Kawacke_KoKo", 1, 2],
    callback
  );
  db.insert(
    "private_messages",
    ["message", "room", "sender", "recipient"],
    ["Très bien et toi ?", "Kawacke_KoKo", 2, 1],
    callback
  );
  db.insert(
    "private_messages",
    ["message", "room", "sender", "recipient"],
    ["Très bien et toi ?", "Atsou_Kawacke", 3, 1],
    callback
  );
  db.insert(
    "private_messages",
    ["message", "room", "sender", "recipient"],
    ["Très bien et toi ?", "Atsou_KoKo", 2, 3],
    callback
  );
};

exports.down = function(db, callback) {
  return null;
};

exports._meta = {
  version: 1
};
