import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/common/types/Product'

export interface IPropsOrder {
  userId?: string | null;
  total_qty?: number | null; 
  total_price?: number | null;
  deliverry_price?: number | null;
  orders: Product[];
}

interface RootState {
  order: IPropsOrder;
}

const initialState: IPropsOrder = {
  userId: '202308_000001',
  total_qty: 0,
  total_price: 0,
  deliverry_price: 200,
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      if((action.payload.quantity || 0) > 0){
        const product = state.orders.find(
          p => p.product_id === action.payload.product_id
        );
      
        if (!product) {
          state.orders.push(action.payload);
        } else {
          Object.assign(product, action.payload);
        }
      
        const addedQty = action.payload.quantity || 0;
        state.total_qty = (state.total_qty ?? 0) + addedQty;
        state.total_price = (state.total_price ?? 0) + action.payload.price * addedQty;
      } 
    },  
    updateOrderToCart: (state, action: PayloadAction<IPropsOrder>) => { 
      Object.assign(state, action.payload);
    },  
    resetCart: (state) => {
      state.orders = [];
      state.total_qty = 0;
      state.total_price = 0;
    }, 
  },
});

// Selectors
export const getOrder = (state: RootState) => state.order;

// Reducers and actions
export const { addProductToCart,updateOrderToCart, resetCart } = orderSlice.actions;

export default orderSlice.reducer;
