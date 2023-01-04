import React from 'react'

const Jumbotron = ({title, subtitle="Welcome to Aethletix Store"}) => {
  return (
    <div className='container-fluid bg-primary'>
        <div className='row'>
            <div className='col text-center p-4 bg-light'>
                <h1 className='fw-bold'>{title}</h1>
                <p className='lead'>{subtitle}</p>
            </div>
        </div>
    </div>
  )
}

export default Jumbotron