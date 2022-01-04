import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBar,Toolbar,Typography,Button,Avatar,Grid,Divider} from '@mui/material';

const header = () => {
    const router = useRouter();
    return (
        <AppBar position="sticky" color="inherit" elevation={0}>
            <Toolbar disableGutters={true}>
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <Link href="/">
                            <Typography variant="h1">
                            Mercury.
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item md={6} xs={12} textAlign="center" alignSelf="center">
                        <Link href="/">
                            <Button variant={router.pathname == "/" ? "menuActive" : "menu"} >Home</Button>
                        </Link>
                        <Link href="/marketplace">
                            <Button variant={router.pathname == "/marketplace" ? "menuActive" : "menu"}>Marketplace</Button>
                        </Link>
                        <Button variant="menu">Documentation</Button>
                    </Grid>
                    <Grid item container md={3} xs={12} justifyContent="right">
                        <Grid item>
                            <Button variant="outlined2" startIcon={<Avatar src={"/metamaskIcon.png"} variant="square" sx={{ height: '20px', width: '20px' }}/>}>Connect Wallet</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
            <Divider style={{marginTop:5}}/>
        </AppBar>
    );
}

export default header;