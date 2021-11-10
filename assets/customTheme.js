import { createTheme } from "@mui/material";

const primaryColor = "#834DE9"
const primaryLight = "#9b70ed"

const customTheme = createTheme({
    palette:{
        primary:{
            main: primaryColor
        }
    },
    typography: {
        h1: {
            fontFamily: "Montserrat",
            fontStyle: "normal",
            fontWeight: "800",
            fontSize: "30px",
            lineHeight: "37px",
            background: "-webkit-linear-gradient(.25turn, #6357EC 30%, #844DE8 70%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant:"outlined2" },
                    style: {
                        backgroundColor: "white",
                        color: primaryColor,
                        borderColor: primaryColor,
                        width:"auto",
                        height: "40px",
                        border: "1px solid",
                        borderRadius:"24px",
                        padding:"0 30px",
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: primaryLight,
                            color: "white"
                        }
                    }
                }
            ]
        }
    },
});

export default customTheme