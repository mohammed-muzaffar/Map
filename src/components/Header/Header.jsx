import React, {useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import { Search } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { useEffect } from "react";

const Header = ({setCoordinates}) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const classes = useStyles();

    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng })
    } 

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Map Advisor
                </Typography>
                <Box>
                <Typography variant="h6" className={classes.title}>
                   Explor new places
                </Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search..." classes={{ root: classes.InputRoot, input: classes.inputInput}}>

                        </InputBase>
                    </div>
                </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;