import Head from 'next/head'
import AdminPage from '@/components/templates/AdminPage/AdminPage'

function About() {
  return (
    <>
      <Head>
        <title>LegoLand | Admin</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <main>
        <AdminPage />
        <div className="overlay" />
      </main>
    </>
  )
}

export default About
