import { createTheme } from "@mui/material";

const primaryColor = "#834DE9";
const primaryLight = "#9b70ed";
const subtitle1Color = "#A3A3A3";

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
        },
        h2: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "26px",
            lineHeight: "31px",
        },
        subtitle1: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "15px",
            color: subtitle1Color
        },
        body1: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "17px",
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
                },
                {
                    props: { variant:"menu" },
                    style: {
                        fontFamily: "inter",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "16px",
                        backgroundColor: "white",
                        color: "black",
                        width:"auto",
                        boxShadow: "none",
                        borderRadius: "0px",
                        textTransform: "none",
                        "&:hover": {
                            color: primaryColor,
                            backgroundColor: "white",
                        }
                    }
                },
                {
                    props: { variant:"menuActive" },
                    style: {
                        fontFamily: "inter",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "16px",
                        backgroundColor: "white",
                        color: primaryColor,
                        width:"auto",
                        borderBottom: "3px solid",
                        borderRadius: "0px",
                        boxShadow: "none",
                        textTransform: "none",
                        "&:hover": {
                            color: primaryColor,
                            backgroundColor: "white",
                        }
                    }
                }
            ]
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    width: "255px",
                    height: "387px",
                    borderColor: "transparent",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "rgb(0 0 0 / 20%) 0px 0px 20px 0px;"
                    }
                },
            }
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    width: "255px",
                    height: "255px"
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: "16px"
                }
            }
        }
    },
});

export default customTheme