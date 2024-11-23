import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Checkbox, ListItemText, OutlinedInput, Stack } from '@mui/material';

const Filter = (props: { category: { slug: string; }[]; helperfn: any }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setselectedProduct] = useState<string[]>([]);
    const [productInput, setProductInput] = useState([])
    const [disable, setDisable] = useState(true)
    let categories: string[] = props.category.map((value: { slug: string; }) => value.slug)

    useEffect(() => {
        const api = async () => {
            const response = await fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
            if (response.ok) {
                let apidata = await response.json()
                let products = apidata.products.map((value: { title: string; }) => value.title)
                setProductInput(products)
            }
        }
        selectedCategory && api()
    }, [selectedCategory])

    const clearHandler = () => {
        setSelectedCategory('')
        setselectedProduct([])
        props.helperfn({ selectedCategory: '', selectedProduct: [] })
    }

    const categoryHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedCategory(e.target.value)
        setselectedProduct([])
        setDisable(false)
    }

    const buttonHandler = () => {
        props.helperfn({ selectedCategory: selectedCategory, selectedProduct: selectedProduct })
        setDisable(true)
    }

    const productHandler = (e: SelectChangeEvent<string[]>) => {
        setselectedProduct(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
        setDisable(false)
    }

    return (
        <div>
            <Stack direction="row" spacing={5} sx={{
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: '30px'
            }}>
                <h3>Filters</h3>
                <Button size="small" variant="text" style={{ textTransform: 'none' }} onClick={clearHandler}>Clear</Button>
            </Stack>

            <FormControl fullWidth margin='dense'>
                <InputLabel key='category' id="Category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={(e: any) => categoryHandler(e)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categories.map((value) =>
                        (<MenuItem value={value}>{value}</MenuItem>)
                    )}
                </Select>
            </FormControl>

            <FormControl fullWidth margin='dense' >
                <InputLabel key='product' id="Product-label">Product</InputLabel>
                <Select
                    disabled={!selectedCategory ? true : false}
                    multiple
                    labelId="Product-label"
                    id="Product-select"
                    value={selectedProduct}
                    label="Product"
                    input={<OutlinedInput label="Product" />}
                    renderValue={(selected) => selected.join(', ')}
                    onChange={(e) => productHandler(e)}
                >
                    {productInput.map((value, index) => (
                        <MenuItem key={index} value={value}>
                            <Checkbox checked={selectedProduct.includes(value)} />
                            <ListItemText primary={value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                sx={{ marginTop: '40px', marginBottom: '20px' }}
                disabled={disable}
                onClick={() => buttonHandler()} >
                Run Report
            </Button>
        </div>
    )
}

export default Filter