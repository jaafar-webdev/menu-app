import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1, notes = "") => {
    const items = get().items;
    const existingIndex = items.findIndex(
      (item) => item.product.id === product.id,
    );
    if (existingIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + quantity,
        notes: notes || updatedItems[existingIndex].notes,
      };
      set({ items: updatedItems });
    } else {
      set({
        items: [...items, { product, quantity, notes }],
      });
    }
  },
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    }));
  },
  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  clearCart: () => set({ items: [] }),
  getSubtotal: () => {
    const items = get().items;
    return items.reduce((total, item) => {
      const { product, quantity } = item;
      const { price } = product;
      return total + price * quantity;
    }, 0);
  },
  getTotalItems: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
