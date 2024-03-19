import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'

function Catalog() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  return (
    <>
      <Head>
        <title>LegoLand | {shouldLoadContent ? 'Каталог' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <h1>Catalog</h1>
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Catalog
