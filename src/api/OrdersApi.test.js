import OrdersApi from "./OrdersApi";
import API from "./api";

jest.mock("./api");

describe("OrdersApi", () => {
  it("gets orders successfully from the API", async () => {
    const data = {
      foo: "bar",
    };

    API.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(new OrdersApi().getOrders()).resolves.toEqual(data);

    expect(API.get).toHaveBeenCalledWith(`/book`);
  });

  it("buys orders successfully from the API", async () => {
    const data = {
      foo: "bar",
    };
    const buy = {
      1: 2,
    };

    API.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(new OrdersApi().buyOrder(buy)).resolves.toEqual(data);

    expect(API.post).toHaveBeenCalledWith(`/buy`, buy);
  });

  it("sells orders successfully from the API", async () => {
    const data = {};
    const sell = {
      1: 2,
    };

    API.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(new OrdersApi().sellOrder(sell)).resolves.toEqual(data);

    expect(API.post).toHaveBeenCalledWith(`/sell`, sell);
  });

  it("fetches erroneously from the API", async () => {
    const errorMessage = "Network Error";

    API.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(new OrdersApi().getOrders()).rejects.toThrow(errorMessage);
  });
});
