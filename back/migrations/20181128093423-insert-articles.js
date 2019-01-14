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
      "online",
      "owner_id"
    ],
    [
      "Troutin Shad 45 F",
      "Le poisson-nageur truite Troutin Shad 45 F de Lure and Fishing est doté d'un corps haut et plat qui lui confère une excellente stabilité dans le courant. Polyvalent, le Troutin Shad 45 F descend jusqu'à 1.60 m mais il reste pêchant même par faible profondeur. Ce leurre flottant est silencieux : un atout pour déjouer la méfiance des grosses truites dans les secteurs très fréquentés. Produit de façon artisanale, chaque exemplaire est testé en bassin. Un poisson-nageur très efficace qui occupera vite une place de choix dans votre boite !",
      "Lure and Fishing",
      "4.5",
      "3.2",
      "verte",
      "4",
      true,
      1
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
      "ILLEX Tiny Fry 38 SP",
      "Le poisson-nageur TINY FRY 38 d'ILLEX fait partie des meilleurs leurres suspending pour la pêche de la truite. Il imite un petit vairon qui tente d'échapper à l'attaque d'un carnassier et s'avère très efficace pour pêcher là où le courant est modéré. Avec une animation par de petits coups de scion (twitching), le leurre Illex Tiny Fry 38 SP prend vie et fait miroiter ses flancs en provoquant des écarts très attractifs. Cette version spécialement conçue pour la pêche à l'ultra-léger sera parfaite pour les ruisseaux et les zones peu profondes.",
      "ILLEX",
      "3.8",
      "1.5",
      "jaune",
      "5",
      true,
      2
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
