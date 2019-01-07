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
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id",
      "online"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );

  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "4",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "2"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "1",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "5",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "2",
      true,
      "3"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );

  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "4",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "2"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "1",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "5",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "2",
      true,
      "3"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );

  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "4",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "2"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "1",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "5",
      true,
      "4"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "3",
      true,
      "1"
    ],
    callback
  );
  db.insert(
    "articles",
    [
      "name",
      "description",
      "brand",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "online",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "14.5",
      "15",
      "rouge",
      "2",
      true,
      "3"
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
