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
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/3/leurre.jpg", 1, 3],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/4/leurre.jpg", 1, 4],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/5/leurre.jpg", 1, 5],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/6/leurre.jpg", 1, 6],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/7/leurre.jpg", 1, 7],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/1/leurre.jpg", 1, 8],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/2/leurre.jpg", 1, 9],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/3/leurre.jpg", 1, 10],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/4/leurre.jpg", 1, 11],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/5/leurre.jpg", 1, 12],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/6/leurre.jpg", 1, 13],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/1/leurre.jpg", 1, 14],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/2/leurre.jpg", 1, 15],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/3/leurre.jpg", 1, 16],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/4/leurre.jpg", 1, 17],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/5/leurre.jpg", 1, 18],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/6/leurre.jpg", 1, 19],
    callback
  );

  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/1/leurre.jpg", 1, 20],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/2/leurre.jpg", 1, 21],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/3/leurre.jpg", 1, 22],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/4/leurre.jpg", 1, 23],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/5/leurre.jpg", 1, 24],
    callback
  );
  db.insert(
    "pictures_articles",
    ["url_picture", "main_picture", "article_id"],
    ["/data/pictures_articles/6/leurre.jpg", 1, 25],
    callback
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  version: 1
};
