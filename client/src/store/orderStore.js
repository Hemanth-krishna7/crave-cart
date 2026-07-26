import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),

      getOrderById: (id) => get().orders.find((order) => order.id === id),
    }),
    {
      name: 'cravecart-orders', // unique localStorage key
    }
  )
);

// Derived Selectors
export const selectOrders = (state) => state.orders;
export const selectOrderById = (id) => (state) => state.orders.find((order) => order.id === id);
