import { getLegoSetFx } from '@/app/api/legoSets'
import Layout from '@/components/layout/Layout'
import { $legoSet, setLegoSet } from '@/context/legoSet'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import SetPage from '@/components/templates/SetPage/SetPage'
import Custom404 from '../404'

function CatalogSetPage({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const legoSet = useStore($legoSet)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadLegoSet()
  }, [router.asPath])

  const loadLegoSet = async () => {
    try {
      const data = await getLegoSetFx(`/lego-sets/find/${query.setId}`)

      if (!data) {
        setError(true)
        return
      }

      setLegoSet(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>LegoLand | {shouldLoadContent ? legoSet.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <SetPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogSetPage
