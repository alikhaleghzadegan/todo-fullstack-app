import * as React from 'react';
import * as Router from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import TasksContainer from './TasksContainer';


export default function Protected() {
    
    const { user } = React.useContext(AuthContext);

    if (user) {
        return (<TasksContainer />);
    } else {
        return (<Router.Navigate to="/auth/login" />)
    }
}