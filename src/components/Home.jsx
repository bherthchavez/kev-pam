import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './Navbar'
import Head from './Head'
import Venue from './Venue'
import Entourage from './Entourage'

const Home = () => {
  return (
    <>
     <Navbar />
     <Head />
     <Venue />
     <Entourage />
     <Analytics />
    </>
  )
}

export default Home