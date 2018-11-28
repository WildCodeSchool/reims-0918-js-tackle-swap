import React, { Component } from "react";
import "./App.css";

import ListArticles from "./ListArticles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        {
          id: 1,
          name: "leurre de 14",
          picture:
            "https://www.1max2peche.com/wp-content/uploads/2017/01/leurre-souple-technique-peche.jpg",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        },
        {
          id: 1,
          name: "leurre de 18",
          picture:
            "https://www.1max2peche.com/wp-content/uploads/2017/01/leurre-souple-technique-peche.jpg",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        },
        {
          id: 1,
          name: "leurre de 14",
          picture:
            "https://www.1max2peche.com/wp-content/uploads/2017/01/leurre-souple-technique-peche.jpg",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        },
        {
          id: 1,
          name: "leurre de 14",
          picture:
            "https://www.1max2peche.com/wp-content/uploads/2017/01/leurre-souple-technique-peche.jpg",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        },
        {
          id: 1,
          name: "leurre de 14",
          picture:
            "https://www.1max2peche.com/wp-content/uploads/2017/01/leurre-souple-technique-peche.jpg",
          swap: 0,
          description: "Super leurre de bonne qualité",
          brand: "monsieurpecheur",
          article_length: 14.5,
          article_weight: 15,
          article_color: "rouge",
          article_state: 3,
          create_at: "2018-11-28T09:18:52.000Z",
          owner_id: 1
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <ListArticles list={this.state.articles} />
      </div>
    );
  }
}

export default App;
