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
      "DEPS F-SONIC 10CM",
      "Ce poisson nageur de chez Deps propose un profil complètement atypique qui lui permet d'offrir des vibrations et une action nouvelle. Il est très peu connu des pêcheurs et regroupent les qualités aussi bien du vibration que du crankbait.",
      "Deps",
      "10",
      "30",
      "vert",
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
      "QUANTUM MANN'S Q-FISH 13CM",
      "Ces leurres souples de chez Mann's sont des petites merveilles pour la traque des sandres. Sa queue en V emet des toutes petites vibrations qui feront la différence dans de très nombreuses situations.",
      "QUANTUM",
      "13",
      "8",
      "gris",
      "4",
      true,
      1
    ],
    callback
  );
  // article id 5
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
      "BERKLEY SPIN BOMB 6CM",
      "Ce poisson nageur a été crée par Berkley dans le style du propperbait capable de faire énormement de bruit dans l'eau. La forme et la taille ont été choisi de 6cm, spécialement pour toucher le maximum de poissons. ",
      "BERKLEY",
      "6",
      "11",
      "bleu",
      "5",
      true,
      1
    ],
    callback
  );
  // article id 6
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
      " ABU GARCIA SVARTZONKER MCHYBRID BABY 12G",
      "Ce poisson nageur Swimbait de chez Abu Garcia est la déclinaison en petit taille du célèbre MChybrid designé par Svartzonker. Il s'adresse principalement à la recherche des petits carnassiers.",
      "Abu Garcia",
      "8",
      "12",
      "orange",
      "3",
      true,
      1
    ],
    callback
  );
  // article id 7
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
      "ILLEX TN 60",
      "Cette série de “Lipless Crankbait de pivoter sur les obstacles et lui permet de revenir très vite dans sa position initiale protégeant ainsi les triples d’un éventuel accrochage bénéficie d’une très bonne performance au lancer.",
      "Illex",
      "6",
      "13",
      "rose",
      "3",
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
      "DEPS F-SONIC 10CM",
      "Ce poisson nageur de chez Deps propose un profil complètement atypique qui lui permet d'offrir des vibrations et une action nouvelle. Il est très peu connu des pêcheurs et regroupent les qualités aussi bien du vibration que du crankbait.",
      "Deps",
      "10",
      "30",
      "vert",
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
      "QUANTUM MANN'S Q-FISH 13CM",
      "Ces leurres souples de chez Mann's sont des petites merveilles pour la traque des sandres. Sa queue en V emet des toutes petites vibrations qui feront la différence dans de très nombreuses situations.",
      "QUANTUM",
      "13",
      "8",
      "gris",
      "4",
      true,
      1
    ],
    callback
  );
  // article id 5
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
      "BERKLEY SPIN BOMB 6CM",
      "Ce poisson nageur a été crée par Berkley dans le style du propperbait capable de faire énormement de bruit dans l'eau. La forme et la taille ont été choisi de 6cm, spécialement pour toucher le maximum de poissons. ",
      "BERKLEY",
      "6",
      "11",
      "bleu",
      "5",
      true,
      1
    ],
    callback
  );
  // article id 6
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
      " ABU GARCIA SVARTZONKER MCHYBRID BABY 12G",
      "Ce poisson nageur Swimbait de chez Abu Garcia est la déclinaison en petit taille du célèbre MChybrid designé par Svartzonker. Il s'adresse principalement à la recherche des petits carnassiers.",
      "Abu Garcia",
      "8",
      "12",
      "orange",
      "3",
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
      "DEPS F-SONIC 10CM",
      "Ce poisson nageur de chez Deps propose un profil complètement atypique qui lui permet d'offrir des vibrations et une action nouvelle. Il est très peu connu des pêcheurs et regroupent les qualités aussi bien du vibration que du crankbait.",
      "Deps",
      "10",
      "30",
      "vert",
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
      "QUANTUM MANN'S Q-FISH 13CM",
      "Ces leurres souples de chez Mann's sont des petites merveilles pour la traque des sandres. Sa queue en V emet des toutes petites vibrations qui feront la différence dans de très nombreuses situations.",
      "QUANTUM",
      "13",
      "8",
      "gris",
      "4",
      true,
      1
    ],
    callback
  );
  // article id 5
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
      "BERKLEY SPIN BOMB 6CM",
      "Ce poisson nageur a été crée par Berkley dans le style du propperbait capable de faire énormement de bruit dans l'eau. La forme et la taille ont été choisi de 6cm, spécialement pour toucher le maximum de poissons. ",
      "BERKLEY",
      "6",
      "11",
      "bleu",
      "5",
      true,
      1
    ],
    callback
  );
  // article id 6
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
      " ABU GARCIA SVARTZONKER MCHYBRID BABY 12G",
      "Ce poisson nageur Swimbait de chez Abu Garcia est la déclinaison en petit taille du célèbre MChybrid designé par Svartzonker. Il s'adresse principalement à la recherche des petits carnassiers.",
      "Abu Garcia",
      "8",
      "12",
      "orange",
      "3",
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
      "DEPS F-SONIC 10CM",
      "Ce poisson nageur de chez Deps propose un profil complètement atypique qui lui permet d'offrir des vibrations et une action nouvelle. Il est très peu connu des pêcheurs et regroupent les qualités aussi bien du vibration que du crankbait.",
      "Deps",
      "10",
      "30",
      "vert",
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
      "QUANTUM MANN'S Q-FISH 13CM",
      "Ces leurres souples de chez Mann's sont des petites merveilles pour la traque des sandres. Sa queue en V emet des toutes petites vibrations qui feront la différence dans de très nombreuses situations.",
      "QUANTUM",
      "13",
      "8",
      "gris",
      "4",
      true,
      1
    ],
    callback
  );
  // article id 5
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
      "BERKLEY SPIN BOMB 6CM",
      "Ce poisson nageur a été crée par Berkley dans le style du propperbait capable de faire énormement de bruit dans l'eau. La forme et la taille ont été choisi de 6cm, spécialement pour toucher le maximum de poissons. ",
      "BERKLEY",
      "6",
      "11",
      "bleu",
      "5",
      true,
      1
    ],
    callback
  );
  // article id 6
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
      " ABU GARCIA SVARTZONKER MCHYBRID BABY 12G",
      "Ce poisson nageur Swimbait de chez Abu Garcia est la déclinaison en petit taille du célèbre MChybrid designé par Svartzonker. Il s'adresse principalement à la recherche des petits carnassiers.",
      "Abu Garcia",
      "8",
      "12",
      "orange",
      "3",
      true,
      1
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
