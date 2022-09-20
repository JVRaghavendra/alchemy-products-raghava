const initialState = {
    products: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] };
        case 'UPDATE_PRODUCT':
            return {
                ...state, products: state.products.map(prod => {
                    if (prod.id === action.payload.id) {
                        return action.payload;
                    }
                    return prod;
                })
            };
        case 'DELETE_PRODUCT':
            return {
                ...state, products: state.products.filter(prod => prod.id !== action.id)
            };
        default:
            return state;
    }
}
export default productsReducer;