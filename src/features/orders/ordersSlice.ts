import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/types";
import { loadState, saveState } from "@/lib/storage";

const KEY = "novashop.orders";

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: loadState<Order[]>(KEY, []),
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      saveState(KEY, state.orders);
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order["status"] }>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
      saveState(KEY, state.orders);
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
