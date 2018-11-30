## Action

- ARTICLES_RECEIVED is dispatched when we receive the api response

```javascript
  {
    type: ARTICLES_RECEIVED,
    responseApi: {
      articles: [...],
      pagination: {
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
