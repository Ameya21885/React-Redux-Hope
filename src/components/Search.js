import { useTheme } from "@emotion/react";
import { InputAdornment, SvgIcon, TextField } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';


function Search({ query, columnQuery, setQuery, setColumnQuery }) {
    const theme = useTheme()
    const styles = {
        root: {},
        importButton: {
            marginRight: theme.spacing(1)
        },
        exportButton: {
            marginRight: theme.spacing(1)
        }
    };
    return (

        <div >
            <TextField
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SvgIcon
                                fontSize="small"
                                color="action"
                            >
                                <SearchIcon />
                            </SvgIcon>
                        </InputAdornment>
                    )
                }}
                placeholder="Search"
                variant="outlined"
                value={query}
                onChange={(e) => { setQuery(e.target.value) }}
                name="query"

            />
        </div>

    )
}

export default Search
