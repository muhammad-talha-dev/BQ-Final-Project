export const reducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART": {
            const existingItemIndex = state.cart?.findIndex(item => item._id === action.payload._id);

            if (existingItemIndex !== -1) {
              const updatedCart = [...state.cart];
              updatedCart[existingItemIndex].quantity += action.payload.quantity;
              return { ...state, cart: updatedCart };
            } else {
              return { ...state, cart: [...state.cart, action.payload] };
            }
        }

        case "REMOVE_FROM_CART": {
            const updatedCart = state.cart.filter(item => item._id !== action.payload._id);
            return { ...state, cart: updatedCart };
          }

        default: {
            return state;
        }
    }
}