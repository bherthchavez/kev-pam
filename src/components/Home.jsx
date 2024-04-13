import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './Navbar'
import Head from './Head'
import Venue from './Venue'
import Entourage from './Entourage'
import RSVP from './RSVP'
import Outfit from './Outfit'
import Footer from './Footer'

const Home = () => {
  return (
    <>
     <Navbar />
     <Head />
     <Venue />
     <Entourage />
     <RSVP />
     <Outfit />
     <Footer />
     <Analytics />
    </>
  )
}

export default Home