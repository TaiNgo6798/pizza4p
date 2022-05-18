import { createSlice } from "@reduxjs/toolkit";

interface Cart {
  orders: Order[];
}

interface Order {
  name: string;
  count: number;
  price: number;
  id: number;
}

const initialState: Cart = {
  orders: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateOrder: (state = initialState, data) => {
      const { payload } = data;
      let order = state.orders.find((v) => v.id === payload.id);

      if (order !== undefined) {
        state.orders = state.orders.map((v) => {
          return v.id === order.id ? payload : v;
        });
      } else {
        state.orders.push(payload);
      }
      state.orders = state.orders.filter((v) => v.count > 0);
    },
    clear: (state = initialState) => {
      state.orders.length = 0;
    },
  },
});

export const { updateOrder, clear } = cart.actions;

export default cart.reducer;
