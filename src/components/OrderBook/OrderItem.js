import React from "react";

export default class OrderItems extends React.Component {
  displayPrice(qty, price) {
    return qty > 0 ? `$${price}` : "";
  }

  render() {
    const items = [];
    if (
      !Array.isArray(this.props.orderItems) ||
      this.props.orderItems.length === 0
    ) {
      return (
        <tr>
          <td colSpan="4">No orders</td>
        </tr>
      );
    }
    this.props.orderItems.forEach((item, index) => {
      if (item.buyQuantity || item.sellQuantity) {
        items.push(
          <tr key={index}>
            <td>{item.buyQuantity}</td>
            <td>{this.displayPrice(item.buyQuantity, item.buyPrice)}</td>
            <td>{this.displayPrice(item.sellQuantity, item.sellPrice)}</td>
            <td>{item.sellQuantity}</td>
          </tr>
        );
      }
    });

    return items;
  }
}
