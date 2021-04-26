import * as React from "react"
import {AppBar, Tab, Tabs} from "@material-ui/core";
import CrunchySvg from "../Icons/svg/crunchy.svg";
import DbSvg from "../Icons/svg/db40.svg";
import MucapiSvg from "../Icons/svg/mucapi.svg";
import AmalgamSvg from "../Icons/svg/amalgam.svg";
import UwbSvg from "../Icons/svg/uwb.svg";

type Props = {
    value: number,
    onChange: (value: number) => void;
}
const Navbar = ({value, onChange} : Props) => {

    const handleChange = (e, newValue) => {
        onChange(newValue);
    };

    return (
        <AppBar position="static" color="default" style={{backgroundColor: '#48342b'}}>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                <Tab component={props =>
                    <div {...props}>
                        <CrunchySvg/>
                    </div>}/>
                    <Tab component={props =>
                    <div {...props}>
                        <UwbSvg/>
                    </div>}/>
                <Tab component={props =>
                    <div {...props}>
                        <MucapiSvg/>
                    </div>}/>
                <Tab component={props =>
                    <div {...props}>
                        <DbSvg/>
                    </div>}/>
                <Tab component={props =>
                    <div {...props}>
                        <AmalgamSvg/>
                    </div>}/>
            </Tabs>
        </AppBar>);
}

export default Navbar;
