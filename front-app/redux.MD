## Action

- ARTICLES_RECEIVED is dispatched when we receive the api response (responseApi.articles)

```javascript
  {
    type: ARTICLES_RECEIVED,
    responseApi: {
      articles: [...],
      pagination: {
        activePage: 1,
        numberArticlesPerPage: 20,
        totalArticles: 27
      }
    }
  }
```

- FETCH_ARTICLES is dispatched when we call the api

```javascript
{
  type: FETCH_ARTICLES;
}
```

- CHANGE_PAGE is dispatched when click on an other page

```javascript
{
  type: CHANGE_PAGE,
  pageNumber: 2
}
```

- SHOW_ARTICLE_DETAILS is dispatched when click on an article

```javascript
{
  type: SHOW_ARTICLE_DETAILS,
  responseApi: {
      articles: [...]
  }
}
```

## Reducers

- articlesReducer

```javascript
const initialeState = [];
```

When ARTICLES_RECEIVED is dispatched, state becomes action.articles

- paginationReducer

```javascript
const initialeState = { activePage: 1 };
```

When ARTICLES_RECEIVED is dispatched, state becomes action.pagination
When CHANGE_PAGE is dispatch, update state action.pagination.activePage

- loadingReducer

```javascript
const initialeState = false;
```

When FETCH_ARTICLES is dispatched, state becomes true
When ARTICLES_RECEIVED is dispatched, state becomes false

- showArticleDetailsReducer

```javascript
const initialeState = {};
```

When SHOW_ARTICLE_DETAILS is dispatched, state becomes action.article
