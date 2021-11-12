import { Container, ThemeProvider } from '@mui/material';
import Head from 'next/head';
import Header from './Header';
import customTheme from '../assets/customTheme';

const layout = (props) => {
    return (
        <ThemeProvider theme={customTheme}>
            <Head>
                <title>Mercury</title>
            </Head>
            <Container maxWidth="false" disableGutters={true} style={{ padding: "0px 85px"}}>
                <Header />
                {props.children}
            </Container> 
        </ThemeProvider>
    );
};

export default layout;