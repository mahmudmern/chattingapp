import { Box, Grid } from '@mui/material'
import React from 'react'
import'./layout.css'
import { Outlet } from 'react-router-dom'
import Sideber from './Sideber'

const RootLayout = () => {
  return (
    <Box>
        <Grid container spacing={0}>
        <Grid item xs={2}>
           <Sideber/>
        </Grid>
        <Grid item xs={10}>
          <div className='outletbox'>
            <Outlet/>
          </div>
        </Grid>
        </Grid>
    </Box>
  )
}

export default RootLayout