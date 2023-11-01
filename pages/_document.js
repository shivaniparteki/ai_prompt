import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Provider>
          <Main />
          <NextScript />
        </Provider>
      </body>
    </Html>
  )
}
