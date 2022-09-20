import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './styles.css';

const AddEditProducts = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [expiryDate, setExpiryDate] = useState(null);
    const [costPrice, setCostPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [discountedSellPrice, setDiscountedSellPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const dispatch = useDispatch();
    const reduxStore = useSelector(state => state);
    const productsReducer = reduxStore.productsReducer;
    const { id } = useParams();
    const [updateFlag, setUpdateFlag] = useState(false);
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const validateFields = () => {
        const expiryDt = new Date(expiryDate);
        if (expiryDt < new Date()) {
            setErrorFlag(true);
            setErrorMsg("Expiry Date Can't Past Date");
            return false;
        }
        if (costPrice < sellPrice) {
            setErrorFlag(true);
            setErrorMsg("Cost Price Can't be lesser than Sell Price");
            return false;
        }
        if (discount > 100) {
            setErrorFlag(true);
            setErrorMsg("Discount % can't be more than 100%");
            return false;
        }
        setErrorFlag(false);
        setErrorMsg("");
        return true;
    }
    const handleAddProduct = () => {
        if (name && category && description && expiryDate && costPrice && sellPrice && finalPrice) {
            if (validateFields()) {
                const product = {
                    name, category, description, expiryDate: moment(new Date(expiryDate)).format('MM/DD/YYYY'), costPrice, sellPrice, discount, discountedSellPrice, finalPrice
                };
                product.id = uuidv4();
                console.log(product)
                dispatch({
                    type: 'ADD_PRODUCT',
                    payload: product
                });
                navigate('/product-list');
            }
        }
    }

    const handleUpdateProduct = () => {
        if (name && category && description && expiryDate && costPrice && sellPrice && finalPrice) {
            const product = {
                name, category, description, expiryDate: moment(new Date(expiryDate)).format('MM/DD/YYYY'), costPrice, sellPrice, discount, discountedSellPrice, finalPrice
            };
            product.id = id;
            console.log(product)
            dispatch({
                type: 'UPDATE_PRODUCT',
                payload: product
            });
            navigate('/product-list');
        }
    }

    const handleDiscountSellPriceCal = () => {
        const sellP = sellPrice ? sellPrice : 0;
        const dis = discount ? discount : 0;
        setDiscountedSellPrice(sellP * (dis / 100));
        handleFinalPrice(sellP * (dis / 100));
    }

    const handleFinalPrice = (arg) => {
        const discountedSellPrc = arg || discountedSellPrice ? arg || discountedSellPrice : 0;
        const sellPrc = sellPrice ? sellPrice : 0;  // As we allowed discount % editable, then considering sell price as actual price instead of cost price
        setFinalPrice(sellPrc - discountedSellPrc);
    }

    useEffect(() => {
        if (id) {
            const found = productsReducer.products.find(item => item.id === id);
            if (found) {
                setName(found.name);
                setCategory(found.category);
                setDescription(found.description);
                setExpiryDate(moment(new Date(found.expiryDate)));
                setCostPrice(found.costPrice);
                setSellPrice(found.sellPrice);
                setDiscount(found.discount);
                setDiscountedSellPrice(found.discountedSellPrice);
                setFinalPrice(found.finalPrice);
                setUpdateFlag(true);
            }
        }
    }, [id]);

    return (
        <div>
            <form>
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Grid item>
                        <Card sx={{ minWidth: 450, maxWidth: 450, marginTop: '1rem' }}>
                            <CardContent>
                                {errorFlag && <small className="error-cls">{errorMsg}</small>}
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Name" size="small" value={name} onChange={e => setName(e.target.value)} />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <InputLabel id="category-select-label">Category </InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category-select"
                                        value={category}
                                        label="Category"
                                        onChange={e => setCategory(e.target.value)}
                                    >
                                        <MenuItem value="mobile">Mobile</MenuItem>
                                        <MenuItem value="laptop">Laptop</MenuItem>
                                        <MenuItem value="tv">TV</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Description" size="small" value={description} onChange={e => setDescription(e.target.value)} />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            label="Expiry Date"
                                            inputFormat="MM/DD/YYYY"
                                            value={expiryDate}
                                            onChange={value => setExpiryDate(value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Cost Price" size="small" type="number" value={costPrice} onChange={e => { setCostPrice(Number(e.target.value)); }} onBlur={() => handleFinalPrice()} />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Sell Price" size="small" type="number" value={sellPrice} onChange={e => { setSellPrice(Number(e.target.value)); }} onBlur={(e) => { handleDiscountSellPriceCal(); }} />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Discount(%)" size="small" type="number" value={discount} onChange={e => { setDiscount(Number(e.target.value)); }} onBlur={(e) => { handleDiscountSellPriceCal(); }} />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Discounted Sell Price" size="small" type="number" value={discountedSellPrice} disabled />
                                </FormControl>
                                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                    <TextField label="Final Price" size="small" type="number" value={finalPrice} disabled />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                {updateFlag ?
                                    <Button size="small" onClick={handleUpdateProduct} variant="contained"
                                        disabled={!(name && category && description && expiryDate && costPrice && sellPrice && finalPrice)}
                                    >
                                        Update Product</Button>
                                    : <Button size="small" onClick={handleAddProduct} variant="contained"
                                        disabled={!(name && category && description && expiryDate && costPrice && sellPrice && finalPrice)}
                                    >
                                        Add Product</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AddEditProducts;