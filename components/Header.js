import React from 'react';
import Link from 'next/link'
import { Toolbar, Typography, Button } from '@mui/material';

const header = () => {
    return (
        <Toolbar>
            <Link href="/">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mercury
                </Typography>
            </Link>
            <Link href="/">
                <Button color="inherit">Home</Button>
            </Link>
            <Link href="/marketplace">
                <Button color="inherit">Marketplace</Button>
            </Link>
            <Button color="inherit">Documentation</Button>
        </Toolbar>
    );
}

export default header;