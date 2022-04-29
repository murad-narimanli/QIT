import React from 'react'

import {useDispatch, useSelector} from 'react-redux'

import {makeStyles, useTheme, Theme, createStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TablePagination from '@material-ui/core/TablePagination'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress';
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'

import Search from "../Search/Search";
import CountryCard from '../CountryCard/CountryCard'

import _ from 'lodash'

import {fetchAllCountries} from '../../redux/actions'
import {AppState} from '../../types'

import './countrylist.scss'







//table pagination action component
const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);






interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

// pagination component
function TablePaginationActions(props: TablePaginationActionsProps) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}









// Country list with pagination and sorting 
const CountryList = () => {
    // sorttype
    const [asc, setAsc] = React.useState(true)

    // changetype
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAsc(event.target.checked);
    };


    //get all countries from redux state
    const countries = useSelector((state: AppState) => state.countryReducer.countries)
    const isLoading = useSelector((state: AppState) => state.countryReducer.isLoading)


    // for filtered countries
    const [filteredCountries, setFilteredCountries] = React.useState(countries)
    //for paginated
    const [paginatedCountries, setPaginatedCountries] = React.useState(countries)


    React.useEffect(() => {
        setFilteredCountries(countries)
    }, [countries])


    //filter country by keyword
    const searchKeyword = useSelector((state: AppState) => state.uiReducer.searchKeyWord)
    React.useEffect(() => {
        const _tempCountries: [] = countries.filter((country) => country.name.toLowerCase().includes(searchKeyword?.toLowerCase())) as []
        setFilteredCountries(_tempCountries)
    }, [searchKeyword, countries])





    //Sorting related
    const [sortBy, setSortBy] = React.useState('name')





    //handle sort
    const handleSort = (event: any) => {
        //set sort type
        setSortBy(event.target.value)
    }


    //initialize dispatch
    const dispatch = useDispatch()


    //dispatch fetchAllCountries when page loads
    React.useEffect(() => {
        dispatch(fetchAllCountries())
    }, [dispatch])


    //pagination related
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredCountries.length - page * rowsPerPage);

    // sort effect and pagination fix
    React.useEffect(() => {
        const tempSorted = _.orderBy(filteredCountries, [sortBy], [asc ? "asc" : "desc"]) as []
        const paginedC = tempSorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) as []
        setPaginatedCountries(paginedC)
    }, [sortBy, filteredCountries, asc ,page, rowsPerPage])


    // page change
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }


    return (
        <div className="country-list">
            {/*search*/}
            <div className="country-list__topList">
                <div className="country-list__search">
                    <Search/>
                </div>
                {/* sorting  */}
                <div className="country-list__sort">

                    {/*sortype changer*/}
                    <div className="country-list__sort__type">
                        <div> Descending</div>
                        <Switch checked={asc} onChange={handleChange}/>
                        <div> Ascending</div>
                    </div>



                    {/*sort by dropdown*/}
                    <p>Sort by</p>
                    <Select
                        labelId="sort-country-select-label"
                        id="sort-country-select"
                        onChange={handleSort}
                        disableUnderline={true}
                        defaultValue="name"
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="region">Region</MenuItem>
                        <MenuItem value="population">Population</MenuItem>
                    </Select>

                </div>
            </div>

            {/* country lists */}
            <div className="country-list__cards">
                {isLoading &&
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%', margin: '50px'}}>
                        <CircularProgress color="primary"/>
                    </div>
                }

                {!isLoading && paginatedCountries &&
                    paginatedCountries.map((country) => (
                        <CountryCard key={country.name} {...country}   />
                    ))
                }
            </div>

            {/* pagination */}
            {
                !isLoading &&
                    <div className="country-list__pagination">
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={filteredCountries.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </div>
            }


        </div>
    )
}

export default CountryList
