import * as React from 'react'
import {Route} from 'react-router-dom';
import ZSZO from '../pages/snippet/2020120701'
import Error from "../pages/Error";

interface Props {
    history: any;
    location: any;
    match: any
}

const Snippet = () => {
    return (

        <Route path="/snippet/2020120701" component={ZSZO}></Route>
    )
}

export default Snippet

