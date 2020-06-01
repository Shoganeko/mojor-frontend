import React from 'react';
import './assets/scss/base.scss';
import Container from "@material-ui/core/Container";
import Header from "./handle/Header";
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme} from "@material-ui/core";
import grey from '@material-ui/core/colors/cyan';
import {ThemeProvider} from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import Footer from "./handle/Footer";
import {makeStyles} from "@material-ui/core/styles";

function App() {
    const theme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#1a1a1a"
            }
        }
    });

    let classes = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '85.5vh',
        },
        main: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(2),
        }
    }));

    return (
        <ThemeProvider theme={theme} className={classes.root}>
            <CssBaseline/>
            <Header/>
            <Container className={classes.main}>
                <h1>shog.dev</h1>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}

export default App;
