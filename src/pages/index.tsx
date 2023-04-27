import Head from 'next/head'
import { Inter } from 'next/font/google'
import { dehydrate, QueryClient } from '@tanstack/react-query'

import JobSearch from '@/components/JobSearch'

import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <Head>
        <title>Power To  Fly Challenge</title>
        <meta name="description" content="Created By Alex Wong" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <JobSearch />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home;
