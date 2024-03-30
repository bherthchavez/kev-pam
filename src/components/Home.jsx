import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './Navbar'
import Head from './Head'
import Venue from './Venue'

const Home = () => {
  return (
    <>
     <Navbar />
     <Head />
     <Venue />

    </>
  )
}

export default Home