import { expect } from "chai";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import OrderItem from "./OrderItem";

let container = null;
beforeEach(() => {
  container = document.createElement("tbody");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders order data correctly", async () => {
  const fakeOrderItems = [
    { buyQuantity: 1, buyPrice: 2, sellQuantity: 3, sellPrice: 4 },
    { buyQuantity: 0, buyPrice: 0, sellQuantity: 0, sellPrice: 0 },
    { buyQuantity: 5, buyPrice: 6, sellQuantity: 7, sellPrice: 8 },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  await act(async () => {
    render(<OrderItem orderItems={fakeOrderItems} />, container);
  });

  expect(container.querySelectorAll("tr").length).equal(2);

  const cells = container.querySelectorAll("td");

  expect(cells[0].innerHTML).to.equal("1");
  expect(cells[1].innerHTML).to.equal("$2");
  expect(cells[2].innerHTML).to.equal("$4");
  expect(cells[3].innerHTML).to.equal("3");

  expect(cells[4].innerHTML).to.equal("5");
  expect(cells[5].innerHTML).to.equal("$6");
  expect(cells[6].innerHTML).to.equal("$8");
  expect(cells[7].innerHTML).to.equal("7");

  global.fetch.mockRestore();
});
