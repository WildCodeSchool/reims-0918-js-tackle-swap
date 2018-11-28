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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "4",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://data.over-blog-kiwi.com/0/54/79/14/20160928/ob_b303d4_b9bis.jpg",
      "14.5",
      "15",
      "rouge",
      "1",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://data.over-blog-kiwi.com/0/54/79/14/20160928/ob_b303d4_b9bis.jpg",
      "14.5",
      "15",
      "rouge",
      "5",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "2",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "4",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://data.over-blog-kiwi.com/0/54/79/14/20160928/ob_b303d4_b9bis.jpg",
      "14.5",
      "15",
      "rouge",
      "1",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://data.over-blog-kiwi.com/0/54/79/14/20160928/ob_b303d4_b9bis.jpg",
      "14.5",
      "15",
      "rouge",
      "5",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "2",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "4",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://data.over-blog-kiwi.com/0/54/79/14/20160928/ob_b303d4_b9bis.jpg",
      "14.5",
      "15",
      "rouge",
      "1",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://data.over-blog-kiwi.com/0/54/79/14/20160928/ob_b303d4_b9bis.jpg",
      "14.5",
      "15",
      "rouge",
      "5",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "https://www.1max2peche.com/wp-content/uploads/2018/03/leurre-storm-360-gt-searchbait-14.jpg",
      "14.5",
      "15",
      "rouge",
      "3",
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
      "picture",
      "article_length",
      "article_weight",
      "article_color",
      "article_state",
      "owner_id"
    ],
    [
      "leurre de 14",
      "Super leurre de bonne qualité",
      "monsieurpecheur",
      "http://theudericus.free.fr/Mer_Ocean/Surfcasting/Leurres/Leurre_Poulpe.jpg",
      "14.5",
      "15",
      "rouge",
      "2",
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
