import React from "react";
import UserPersonalInformations from "./UserPersonalInformations";
import OrderHistory from "./OrdersHistory";
import Favorites from "./Favorites";
import Parameters from "./Parameters";

const MainProfile = props => (
  <div>
    <h1>Mon profil</h1>
    <ul>
      <li>
        <UserPersonalInformations />
      </li>
      <li>
        <OrderHistory />
      </li>
      <li>
        <Favorites />
      </li>
      <li>
        <Parameters />
      </li>
      <li>{props.user.nickname}</li>
    </ul>
  </div>
);

export default MainProfile;
