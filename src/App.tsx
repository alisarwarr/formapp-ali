import React, { useState } from 'react';
import Main from './Main';
import { Typography, Chip, Switch, CardActionArea } from '@material-ui/core';
import Brightness4SharpIcon from '@material-ui/icons/Brightness4Sharp';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useWebAnimations, { backInRight, fadeIn } from '@wellyshen/use-web-animations';

const useStyles = makeStyles({
    app: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        //for cover entire screen of any size
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        bottom: 0,
        overflow: "hidden"
        //for cover entire screen of any size
    },
    themechip: {
        display: "flex",
        alignItems: "center"
    }
})

function App() {
    const [ darkMode, setDarkMode ] = useState(true);
    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
            background: {        //black     //white
                paper: darkMode ? "#000000" : "#FFFFFF"
            }
        },
        overrides: {
            MuiStepIcon: {
                root: {
                    '&$completed': {
                        color: darkMode ? 'rgba(214, 69, 65, 1)' : 'rgba(83, 51, 237, 1)'
                    },
                    '&$active': {
                        color: darkMode ? 'rgba(214, 69, 65, 1)' : 'rgba(83, 51, 237, 1)'
                    }
                }
            }
        }
    })

    const btnAnimation = useWebAnimations({ ...backInRight });
    const chipAnimation = useWebAnimations({ ...fadeIn });

    const classes = useStyles();
    const screen400 = useMediaQuery('(max-width: 400px)');

    return (
        <ThemeProvider theme={theme}>
            <div
                className={classes.app}
                style={darkMode ?
                    { backgroundColor: "rgba(214, 69, 65, 1)" } : { backgroundColor: "rgba(83, 51, 237, 1)" }
                }
            >
                <Main
                />
                <div
                    onClick={() => setDarkMode(x => !x)}
                    ref={btnAnimation.ref as React.RefObject<HTMLDivElement>}
                >
                    <CardActionArea
                        className="chip"
                        ref={chipAnimation.ref as React.RefObject<HTMLButtonElement>}
                        onClick={() => chipAnimation?.getAnimation()?.play()}
                    >
                        <Chip
                            icon={
                                <Switch
                                    checked={!darkMode}
                                    style={{ color : darkMode ? "#000000" : "#FFFFFF" }}
                                    size={screen400 ? "small" : "medium"}
                                    className="hideon335"
                                />
                            }
                            label={
                                <Typography className={classes.themechip} style={{ color : darkMode ? "#000000" : "#FFFFFF" }}>
                                    <Brightness4SharpIcon id="icon"/>
                                    <span
                                        style={{ marginLeft: 7, fontWeight: "bold", fontStyle: "italic" }}
                                        className="hideon275"
                                    > theme </span>
                                </Typography>
                            }
                            className="fade_effect"
                            color= {darkMode ? "secondary" : "primary"}
                        />
                    </CardActionArea>
                    <span className="hideabove275"style={{ color : darkMode ? "#000000" : "#FFFFFF" }}> theme </span>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default App;