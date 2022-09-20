import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";

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

    const handleAddProduct = () => {
        if (name && category && description && expiryDate && costPrice && sellPrice && discount && discountedSellPrice && finalPrice) {
            const product = {
                name, category, description, expiryDate: new Date(expiryDate), costPrice, sellPrice, discount, discountedSellPrice, finalPrice
            };
            console.log(product)
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
        const costPrc = costPrice ? costPrice : 0;
        setFinalPrice(costPrc - discountedSellPrc);
    }

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
                        <Card sx={{ minWidth: 450, maxWidth: 450 }}>
                            <CardContent>
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                <Button size="small" onClick={handleAddProduct} variant="contained"
                                    disabled={!(name && category && description && expiryDate && costPrice && sellPrice && discount && discountedSellPrice && finalPrice)}
                                >
                                    Add Product</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default AddEditProducts;