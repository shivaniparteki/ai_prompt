import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from './layout'


export default function App({ Component, pageProps }) {
  return (
    <>
      <div className='main'>
        <div className='gradient' />
      </div>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
