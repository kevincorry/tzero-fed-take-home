import React from "react";
import OrdersApi from "../api/OrdersApi";
import OrderBook from "./OrderBook/OrderBook";
import OrderEntry from "./OrderEntry/OrderEntry";
import { sortItems, removeEmptyItems } from "../utils/ArrayHelpers";

export default class Orders extends React.Component {
  ordersApi = new OrdersApi();
  state = {
    loading: false,
    orders: [],
    error: "",
  };

  componentDidMount() {
    this.getOrders();
  }

  setError(err) {
    const error =
      err.response && err.response.data
        ? err.response.data
        : "An Error Has Occurred - Please Refresh";
    this.setState({ error });
  }

  dismissError() {
    this.setState({ error: "" });
  }

  getOrders() {
    this.setState({ loading: true }, () =>
      this.ordersApi
        .getOrders()
        .then((res) => {
          const error = "";
          const loading = false;
          let orders = res.data;
          let buys = Object.entries(orders.buys);
          let sells = Object.entries(orders.sells);

          buys = removeEmptyItems(buys, 1);
          sells = removeEmptyItems(sells, 1);

          sortItems(buys, false, 0);
          sortItems(sells, true, 0);

          orders = this.mergeOrderList(buys, sells);
          this.setState({ orders, error, loading });
        })
        .catch((err) => this.setError({ err }))
    );
  }

  mergeOrderList(buys, sells) {
    let mergedOrderList = [];
    let totalOrders = buys.length + sells.length;
    let mergedIndex = 0;
    while (mergedOrderList.length < totalOrders) {
      const buyOrder = buys[mergedIndex] || ["", ""];
      const sellOrder = sells[mergedIndex] || ["", ""];
      mergedOrderList.push({
        buyPrice: buyOrder[0],
        sellPrice: sellOrder[0],
        buyQuantity: buyOrder[1],
        sellQuantity: sellOrder[1],
      });
      mergedIndex++;
    }
    return mergedOrderList;
  }

  render() {
    return (
      <>
        {this.state.error && (
          <div className="notification is-danger">
            <button
              className="delete"
              onClick={() => this.dismissError()}
            ></button>
            {this.state.error}
          </div>
        )}
        <div className="App columns pt-5 pl-5">
          <div className="column is-one-fifth">
            <OrderEntry
              getOrders={this.getOrders.bind(this)}
              setError={this.setError.bind(this)}
            />
          </div>
          <div className="column">
            <OrderBook
              orders={this.state.orders}
              loading={this.state.loading}
            />
          </div>
        </div>
      </>
    );
  }
}
