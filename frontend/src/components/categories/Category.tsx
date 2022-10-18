import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CategoryActions from './CategoryActions';
import { Link } from "react-router-dom";
import {CategoryProps} from '../interfaces/appInterfaces';




function Category({category}: CategoryProps) {

    const url = `/categories/${category.id}`;
    
    return (
        <Box sx={{display:'flex', justifyContent:'center', m:10}}>
            <Card sx={{display:'flex', justifyContent:'center', minWidth:600}}>
                <CardActions>
                    <Link to={url} ><Button   sx={{color:'#b55b59', "&:hover": { backgroundColor:'#282c34', color:'white'}}}>{category.name}</Button></Link>  
                </CardActions>    
            </Card>
            <CategoryActions categoryId={category.id}/> 
        </Box>
    )
}

export default Category