import React, { useEffect, useRef, useState } from 'react'
import CategoryChart from './Pie-Chart'
import Box from '@mui/material/Box';
import ProductChart from './Product-Chart'
import { CircularProgress, Grid2 } from '@mui/material';

interface Product {
    id: number;
    title: string;
    [key: string]: any;
}
interface CategoryData {
    category: string;
    products: Product[];
}

const Chart = (props: { category: any, FilteredValues: any }) => {
    const [data, setData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const valueRef = useRef(props);
    valueRef.current = props;
    const urls = valueRef.current.category.map((value: { url: string }) => value.url)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const responses = await Promise.all(
                    urls.map((url: RequestInfo | URL) =>
                        fetch(url).then((response) => {
                            if (!response.ok) {
                                throw new Error(`Error fetching ${url}: ${response.statusText}`);
                            }
                            return response.json();
                        })
                    )
                );
                setData(responses);
            } catch (err) {
                console.log(err)
            }
        };
        data.length === 0 && fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        if (props.FilteredValues.selectedCategory) {
            setLoading(true);
        }
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [props.FilteredValues.selectedCategory])

    return (
        <div>
            <Box sx={{
                flexGrow: 1, minHeight: '90vh', display: 'flex',
                justifyContent: 'center', alignItems: 'center'
            }}>
                {loading && <CircularProgress size="3rem" />}
                {!loading && (props.FilteredValues.selectedCategory ?
                    <ProductChart data={props.FilteredValues} productData={data} /> :
                    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data.map(value =>
                            <CategoryChart data={value.products} />
                        )}
                    </Grid2>
                )}
            </Box>
        </div>
    )
}

export default Chart