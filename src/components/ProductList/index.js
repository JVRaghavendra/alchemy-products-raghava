import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                display: false
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "expiryDate",
            label: "Expiry Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "costPrice",
            label: "Cost Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "sellPrice",
            label: "Sell Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "discount",
            label: "Discount",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "discountedSellPrice",
            label: "Discounted Sell Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "finalPrice",
            label: "Final Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Actions",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button onClick={() => navigate('/add-edit-products/' + tableMeta.rowData[0])}>
                                Edit
                            </button>
                            <button onClick={() => dispatch({
                                type: 'DELETE_PRODUCT',
                                id: tableMeta.rowData[0]
                            })}>
                                Delete
                            </button>
                        </>
                    )
                }
            }
        }
    ];

    const options = {
        filterType: 'checkbox',
    };
    const reduxStore = useSelector(state => state);
    const productsReducer = reduxStore.productsReducer;

    return (
        <div>
            <MUIDataTable
                title={"Product List"}
                data={productsReducer.products}
                columns={columns}
                options={options}
            />
        </div>
    )
}

export default ProductList;