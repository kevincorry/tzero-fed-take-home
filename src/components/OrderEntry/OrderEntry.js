import React from "react";
import OrdersApi from "../../api/OrdersApi";
import "./OrderEntry.css";

export default class OrderEntry extends React.Component {
  ordersApi = new OrdersApi();

  constructor(props) {
    super(props);
    this.state = {
      isBuyOrder: true,
      quantity: 0,
      price: 0,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value =
      target.type === "radio" ? target.value === "buy" : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const order = { price: this.state.price, quantity: this.state.quantity };
    const orderRequest = this.state.isBuyOrder
      ? this.ordersApi.buyOrder(order)
      : this.ordersApi.sellOrder(order);
    orderRequest
      .then(() => this.props.getOrders())
      .catch((err) => this.props.setError(err));
    event.preventDefault();
  }

  render() {
    return (
      <div className="menu sticky container pl-3">
        <h1 className="title has-text-left">Place Order</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="radio">
              Buy
              <div className="control">
                <input
                  className="radio"
                  name="isBuyOrder"
                  value="buy"
                  type="radio"
                  checked={this.state.isBuyOrder}
                  onChange={this.handleInputChange}
                />
              </div>
            </label>
            <label className="radio">
              Sell
              <div className="control">
                <input
                  className="radio"
                  name="isBuyOrder"
                  value="sell"
                  type="radio"
                  checked={!this.state.isBuyOrder}
                  onChange={this.handleInputChange}
                />
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">Quantity:</label>
            <div className="control">
              <input
                className="input"
                name="quantity"
                type="number"
                value={this.state.quantity}
                onChange={this.handleInputChange}
                required={true}
                min="1"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Price:</label>
            <div className="control">
              <input
                className="input"
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.handleInputChange}
                required={true}
                min="1"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
