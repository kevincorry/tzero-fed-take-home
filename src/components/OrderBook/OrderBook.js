import React from "react";
import OrderItems from "./OrderItem";
import "./OrderBook.css";

export default class OrderBook extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title has-text-left">Order Book</h1>
        {this.props.loading && (
          <progress
            className="progress is-small is-primary"
            max="100"
          ></progress>
        )}
        {!this.props.loading && (
          <table className="table">
            <thead>
              <tr>
                <th colSpan="2" scope="colgroup">
                  Buys
                </th>
                <th colSpan="2" scope="colgroup">
                  Sells
                </th>
              </tr>
              <tr>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <OrderItems orderItems={this.props.orders} />
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
