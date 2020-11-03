import { expect } from "chai";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import OrderBook from "./OrderBook";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders table", async () => {
  const fakeOrderItems = [
    { buyQuantity: 1, buyPrice: 2, sellQuantity: 3, sellPrice: 4 },
    { buyQuantity: 0, buyPrice: 0, sellQuantity: 0, sellPrice: 0 },
    { buyQuantity: 5, buyPrice: 6, sellQuantity: 7, sellPrice: 8 },
  ];

  await act(async () => {
    render(<OrderBook orders={fakeOrderItems} loading={false} />, container);
  });

  expect(container.querySelectorAll(".progress").length).equal(0);

  const cells = container.querySelectorAll("th");

  expect(cells[0].innerHTML).to.equal("Buys");
  expect(cells[1].innerHTML).to.equal("Sells");

  expect(cells[2].innerHTML).to.equal("Quantity");
  expect(cells[3].innerHTML).to.equal("Price");
  expect(cells[4].innerHTML).to.equal("Price");
  expect(cells[5].innerHTML).to.equal("Quantity");
});

it("renders loading", async () => {
  const fakeOrderItems = [
    { buyQuantity: 1, buyPrice: 2, sellQuantity: 3, sellPrice: 4 },
    { buyQuantity: 0, buyPrice: 0, sellQuantity: 0, sellPrice: 0 },
    { buyQuantity: 5, buyPrice: 6, sellQuantity: 7, sellPrice: 8 },
  ];

  await act(async () => {
    render(<OrderBook orders={fakeOrderItems} loading={true} />, container);
  });

  expect(container.querySelectorAll(".progress").length).equal(1);
});
