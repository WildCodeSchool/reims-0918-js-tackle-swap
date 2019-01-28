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
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/1/leurre.jpg", 1, 1],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/2/leurre.jpg", 1, 2],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/2/leurre01.jpg", 0, 2],
    callback
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1
};
