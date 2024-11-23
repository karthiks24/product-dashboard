import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Filter from './Filter'
import { useState } from 'react';
import Chart from './Chart';
import { Container } from './Landing-Page.styles'

export interface Category {
    slug: string;
    name: string;
    url: string;
}

export default function Landingpage() {
    const [category, setCategory] = useState<Category[]>([]);
    const [loader, setLoader] = useState(false);
    const [FilteredValues, setFilteredValues] = useState(true);
    React.useEffect(() => {
        const api = async () => {
            setLoader(true)
            const response = await fetch('https://dummyjson.com/products/categories')
            if (response.ok) {
                let apidata = await response.json()
                setCategory(apidata)
            }
            setLoader(false)
        }
        api()
    }, [])

    const helperfn = (value: any) => {
        setFilteredValues(value)
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1, margin: '15px' }}>
                {!loader && category.length > 1 &&
                    <Grid container spacing={2}>
                        <Grid size={3}>
                            <Container>
                                <Filter category={category} helperfn={helperfn} />
                            </Container>
                        </Grid>
                        <Grid size={9}>
                            <Container>
                                <Chart category={category} FilteredValues={FilteredValues} />
                            </Container>
                        </Grid>
                    </Grid>
                }
            </Box>
        </div>
    );
}
