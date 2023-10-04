import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    // fade,
} from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import AllProducts from './AllProducts';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
const Navbar = () => {
    const appBarStyle = {
        backgroundColor: '#333',
    };

    const logoStyle = {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    };

    const titleStyle = {
        // display: 'none',
        // '@media (min-width: 600px)': {
        //     display: 'block',
        // },
        color: 'white',
        fontWeight: '700'
    };

    const searchContainerStyle = {
        display: 'flex',
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
        },
        marginRight: '20px',
        marginLeft: '20px',
        width: 'auto',
    };

    const searchIconStyle = {
        // padding: '10px',
        height: '100%',
        // position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        margin: '6px'
    };

    const inputRootStyle = {
        color: 'inherit',
    };

    const inputInputStyle = {
        padding: '10px',
        paddingLeft: '30px',
        width: '200px',
        '@media (min-width: 600px)': {
            width: '300px',
        },
    };
    const [products, setProducts] = useState([])

    const [isSearching, setIsSearching] = useState(false)
    const searchproducts = (e) => {
        console.log("searching")
        setIsSearching(true)
        let searchtext = e.target.value
        if (e.target.value) {
            const options = {
                method: "GET",
                url: `http://localhost:3000/search-products/${searchtext}`

            };

            axios(options)
                .then((response) => {
                    console.log("searched", response.data)
                    setProducts(response.data)
                })
                .catch((error) => {
                    if (error?.response?.status === 401) {
                        console.log(error)
                    }
                });
        }
        else {
            setProducts([])
            setIsSearching(false)
        }


    }
    useEffect(() => {
        // AllProducts component will be rendered whenever products state is updated
        console.log('Products updated:', products);
    }, [products]); // useEffect will be triggered whenever products state changes

    return (
        <>
            <AppBar position="static" style={appBarStyle}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <img src="logo.png" alt="Company Logo" style={logoStyle} /> */}
                    <Typography variant="h6" noWrap style={titleStyle}>
                        <div style={{ display: 'flex' }}>  <div style={{ marginRight: '5px' }}><FaShoppingCart style={{ fontSize: 36, color: 'white' }} /></div>
                            <div>Shop!</div></div>
                    </Typography>
                    <div style={searchContainerStyle}>

                        <InputBase
                            placeholder="Search Products"
                            style={inputInputStyle}
                            inputProps={{ 'aria-label': 'search' }} endAdornment={isSearching ? '' : <SearchIcon style={{ color: 'gray' }} />}
                            onChange={(e) => searchproducts(e)}
                        />
                        {/* {!isSearching && <div style={searchIconStyle} onClick={(e) => searchproducts(e)}>
                            <BiSearch style={{ fontSize: 36, color: 'black' }} />
                        </div>} */}
                    </div>
                </Toolbar >
            </AppBar >
            <AllProducts productsArray={products} isSearching={isSearching} />
        </>
    );
};

export default Navbar;
