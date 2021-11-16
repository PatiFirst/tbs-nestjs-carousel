import Document, { Head, Html, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
render() {
    return (
    <Html lang="en">
      <Head >
        {/* <meta name="viewport" content="width=device-width, initial-   scale=1" /> */}
        {/* <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/antd/3.22.0/antd.min.css' /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}}