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
      "DE SOTO COBET",
      "Corentin",
      "KoKo",
      "corentin.dsc@gmail.com",
      "azeazeazeazecwxc135454454687",
      "password",
      "NULL",
      "NULL",
      "NULL",
      "51100",
      "M",
      "NULL"
    ],
    callback
  );
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
      "CHANTHATHIRATH",
      "Leuthsouline",
      "Astou",
      "leuthsouline@gmail.com",
      "dfsdfsfdsdfxhfgjg235956232",
      "password",
      "NULL",
      "NULL",
      "NULL",
      "51100",
      "F",
      "NULL"
    ],
    callback
  );
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
      "SIMONIN",
      "Gautier",
      "Gautier",
      "gautier08000@hotmail.com",
      "azeazeazeazecwxc135454454687",
      "password",
      "NULL",
      "NULL",
      "NULL",
      "51100",
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
