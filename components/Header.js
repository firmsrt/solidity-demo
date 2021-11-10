import React from 'react';
import Link from 'next/link';
import { AppBar,Toolbar,Typography,Button,Box,Avatar } from '@mui/material';

const header = () => {
    return (
        <AppBar position="sticky" color="inherit" elevation={0}>
            <Toolbar> 
                <Link href="/">
                    <Typography variant="h1" sx={{ flexGrow: 1 }}>
                    Mercury.
                    </Typography>
                </Link>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/">
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link href="/marketplace">
                        <Button color="inherit">Marketplace</Button>
                    </Link>
                    <Button color="inherit">Documentation</Button>
                </Box>
                <Button variant="outlined2" startIcon={<Avatar src={"/metamaskIcon.png"} variant="square" sx={{ height: '20px', width: '20px' }}/>}>Connect Wallet</Button>
            </Toolbar>
        </AppBar>
    );
}

export default header;