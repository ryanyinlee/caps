"use strict";

const { handleDelivery } = require("../vendor");

xdescribe("Testing vendor's deliveryhandler function", () => {

    console.log = jest.fn();

    it("Should output a console.log with Thank you, payload.storename when deliverhandler gets called.", () => {
      const payload =  {
        store: "test store",
        orderId: '12345',
      };
      handleDelivery(payload);
      expect(console.log).toHaveBeenCalledWith("Thank you, test store");
    });
  });