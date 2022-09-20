const initialState = {
    products: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TEST':
            return state;
        default:
            return state;
    }
}
export default productsReducer;