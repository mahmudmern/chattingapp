import React from 'react'

const RegiImg = ({source,alt,style}) => {
  return (
    <img className={style} src={source} alt={alt}/>
  )
}
export default RegiImg