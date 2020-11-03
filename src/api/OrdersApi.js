import API from "./api";
import Routes from "../config/Routes";

export default class OrdersApi {
  constructor() {
    this.orderRoutes = new Routes().ORDERS_COLLECTION;
  }

  getOrders = () => {
    return API.get(this.orderRoutes.GET);
  };

  buyOrder = (order) => {
    return API.post(this.orderRoutes.BUY, order);
  };

  sellOrder = (order) => {
    return API.post(this.orderRoutes.SELL, order);
  };
}
