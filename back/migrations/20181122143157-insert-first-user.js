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
    "users",
    [
      "lastname",
      "firstname",
      "nickname",
      "email",
      "email_confirmation",
      "password",
      "profil_picture",
      "adress",
      "city",
      "postal_code",
      "gender",
      "description"
    ],
    [
      "THOMAS",
      "Mathieu",
      "Kawacke",
      "kawacke@gmail.com",
      "zoiueznhliuef75638294775",
      "password",
      "NULL",
      "NULL",
      "NULL",
      "08330",
      "M",
      "NULL"
    ],
    callback
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1
};
