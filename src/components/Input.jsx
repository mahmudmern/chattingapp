import { TextField } from '@mui/material'
import React from 'react'

const Input = ({variant,labeltext,style,name,type,onChange,value}) => {
  return (
    <TextField onChange={onChange} name={name} type={type} value= {value} className={style} label={labeltext} variant={variant}/>
  )
}

export default Input