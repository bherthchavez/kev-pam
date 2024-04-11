import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './Navbar'
import Head from './Head'
import Venue from './Venue'
import Entourage from './Entourage'
import RSVP from './RSVP'
import Outfit from './Outfit'

const Home = () => {
  return (
    <>
     <Navbar />
     <Head />
     <Venue />
     <Entourage />
     <RSVP />
     <Outfit />
     <Analytics />
    </>
  )
}

export default Home