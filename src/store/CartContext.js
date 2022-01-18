import React from 'react';

const CartContext = React.createContext({
    item: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clear: () => {}
});

export default CartContext;