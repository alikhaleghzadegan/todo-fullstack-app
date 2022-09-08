import * as React from 'react';
import axios from 'axios';
import { SearchContext } from '../context/SearchContext';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function AddTask({ setTasks }) {

    const [enteredText, setEnteredText] = React.useState('');
    const { isSearching, setIsSearching } = React.useContext(SearchContext);

    React.useEffect(() => {
        if (!isSearching)
            setEnteredText("");
    }, [isSearching]);

    const handleChange = (event) => {
        setEnteredText(event.target.value);
    };

    const handleClickAdd = () => {
        if (enteredText.length !== 0) {
            axios.request({
                method: "POST",
                baseURL: 'http://localhost:5000',
                url: "/api/tasks",
                data: { text: enteredText },
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                }
            }).then(response => {
                setTasks(response.data);
                setEnteredText("");
            }).catch(error => {
                console.error(error);
                alert(error)
            });
        } else {
            alert("please first enter task description");
        }
    }

    const handleClickSearch = () => {
        if (enteredText.length !== 0) {
            axios.request({
                method: "GET",
                baseURL: 'http://localhost:5000',
                url: "/api/search",
                params: {
                    searchTerm: enteredText
                },
                withCredentials: true,
                headers: {
                    "Content-type": "application/json",
                }
            }).then(response => {
                setTasks(response.data);
                setIsSearching(true);
            }).catch(error => console.error(error));
        } else {
            alert("please first enter the search terms");
        }
    }

    const handleDeactivateSearch = () => {
        axios.request({
            method: "GET",
            baseURL: 'http://localhost:5000',
            url: "/api/tasks",
            withCredentials: true,
            headers: {
                "Content-type": "application/json",
            }
        }).then(response => {
            setTasks(response.data);
            setIsSearching(false);
            setEnteredText("");
        }).catch(error => console.error(error));
    }


    return (
        <div>
            <Grid container>
                <Grid item xs>
                    <TextField fullWidth placeholder="Add or Search" size="small" onChange={handleChange} value={enteredText} />
                </Grid>
                <Grid item style={{ marginLeft: 10 }}>
                    <Button variant="contained"
                        style={{ borderRadius: 35 }}
                        onClick={handleClickAdd}>Add</Button>
                </Grid>

                {
                    isSearching ?
                        <Grid item style={{ marginLeft: 10 }}>
                            <Button variant="contained"
                                style={{
                                    borderRadius: 35, backgroundColor: "#ffcc5c"
                                }}
                                onClick={handleDeactivateSearch}>Clear</Button>
                        </Grid>
                        :
                        <Grid item style={{ marginLeft: 10 }}>
                            <Button variant="contained"
                                style={{
                                    borderRadius: 35,
                                    backgroundColor: "#86af49"
                                }}
                                onClick={handleClickSearch}>Search</Button>
                        </Grid>
                }
            </Grid>
        </div>
    )
}