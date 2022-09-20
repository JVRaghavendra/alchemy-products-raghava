import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import './styles.css';
const Home = () => {
    const navigate = useNavigate();
    const handleAddEditProd = () => {
        navigate("/add-edit-products")
    }

    const handleProductList = () => {
        navigate("/product-list")
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Alchemy Products
                    </Typography>
                    <Button color="inherit" onClick={handleAddEditProd}>Add/Edit Product</Button>
                    <Button color="inherit" onClick={handleProductList}>Products List</Button>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    )
};

export default Home;