import { Container } from '@mui/material';
import Header from './Header';

const layout = (props) => {
    return (
        <Container>
            <Header />
            {props.children}
        </Container> 
    );
};

export default layout;