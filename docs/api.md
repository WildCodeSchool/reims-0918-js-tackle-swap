# Plan de routing Backend

## Section : Annonces

- GET

  - Action : Afficher les articles sur la page d'accueil (Maximum 10)

  ```javascript
  .get("/items?limit=:limit&offset=:offset")
  ```

  - Action : Afficher la fiche d'un article

  ```javascript
  .get("/item/:id")
  ```

  - Action : Afficher tous les articles d'un utilisateur

  ```javascript
  .get("/user_items/:iduser?limit=:limit&offset=:offset")
  ```

  - Action : Afficher tous les articles de ma liste de favoris

  ```javascript
  .get("/item_favorites/:iduser?limit=:limit&offset=:offset")
  ```

- POST

  - Action : Ajouter un article à ma vitrine

  ```javascript
  .post("/add_item")
  ```

  - Action : Ajouter un article à ma liste de favoris

  ```javascript
  .post("/add_favorites/:iditem/:iduser")
  ```

- UPDATE

  - Action : Modifier un article de ma vitrine

  ```javascript
  .put("/update_item/:iditem")
  ```

  - Action : Supprimer un article de ma vitrine

  ```javascript
  .put("/update_item/delete/:iditem")
  ```

- DELETE
  - Action : Supprimer un article de mes favoris
  ```javascript
  .put("/delete_favorites/:iditem/:iduser")
  ```

## Section : Recherche

- GET
  - Action: Rechercher un article ou un utilisateur
  ```javascript
  .get("/search?s=:search&type=:type")
  ```

## Section : Utilisateur

- GET

  - Action: Afficher les informations d'un utilisateur (Public)

  ```javascript
  .get("/profile_user/public/:iduser")
  ```

  - Action: Afficher les informations d'un utilisateur (Privé)

  ```javascript
  .get("/profile_user/private/:iduser")
  ```

- POST

  - Action : Ajouter un utilisateur

  ```javascript
  .post("/add_user")
  ```

- UUPDATE
  - Action : Ajouter un utilisateur
  ```javascript
  .put("/update_user/:iduser")
  ```
