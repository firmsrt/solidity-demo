import { Container, ThemeProvider } from '@mui/material';
import Header from './Header';
import customTheme from '../assets/customTheme';

const layout = (props) => {
    return (
        <ThemeProvider theme={customTheme}>
            <Container maxWidth="false" >
                <Header />
                {props.children}
            </Container> 
        </ThemeProvider>
    );
};

export default layout;