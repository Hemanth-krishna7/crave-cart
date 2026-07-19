import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex((i) => i.id === item.id);
          if (existingItemIndex > -1) {
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + 1,
            };
            return { cartItems: updatedItems };
          }
          // Make sure we carry important attributes: id, name, price, image, restaurantId
          return {
            cartItems: [
              ...state.cartItems,
              {
                id: item.id,
                restaurantId: item.restaurantId,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => {
          const updatedItems = state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
          return { cartItems: updatedItems };
        }),

      decreaseQuantity: (id) =>
        set((state) => {
          const updatedItems = state.cartItems
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0);
          return { cartItems: updatedItems };
        }),

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cravecart-cart', // unique name inside localStorage
    }
  )
);

// Derived computed selectors
export const selectTotalItems = (state) =>
  state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state) =>
  state.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
