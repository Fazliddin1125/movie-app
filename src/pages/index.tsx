import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { useEffect, useContext } from 'react'
import { Header, Hero, Modal } from 'src/components'
import Row from 'src/components/row/row'
import { AuthContext } from 'src/context/auth.context'
import { IMovie } from 'src/interfaces/app.interface'
import { API_REQUEST } from 'src/services/api.service'
import { useInfoStore } from 'src/store'





export default function Home({ trending, topRated, topTV, popular, documentary, family, comedy }: HomeProps): JSX.Element {
  const { isLoading } = useContext(AuthContext);
  const {modal, setModal} = useInfoStore();

  if (isLoading) { return <>{null}</>; }
  else {
    return (
      <div className='relative h-[100vh]'>
        <Head>
          <title>Home - Movie</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Header />
        <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16' >
          <Hero trending={trending} />
          <section>
            <Row title='Top Rated' movies={topRated} />
            <Row title='Tv Show' movies={topTV} isBig={true} />
            <Row title='Popular' movies={popular} />
            <Row title='Documentry' movies={documentary.reverse()} />
            <Row title='Comedy' isBig={true} movies={comedy} />
            <Row title='Family' movies={topTV} />
            {/* BigRow */}
            {/* Row */}
            {/* BigRow */}
          </section>

        </main>
        {modal && <Modal/>}

      </div>
    )
  }


}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
const [trending, topRated, topTV, popular, documentary, comedy, family] = await Promise.all([
  fetch(API_REQUEST.trending).then(res => res.json()),
  fetch(API_REQUEST.top_rated).then(res => res.json()),
  fetch(API_REQUEST.top_tv).then(res => res.json()),
  fetch(API_REQUEST.popular).then(res => res.json()),
  fetch(API_REQUEST.documentary).then(res => res.json()),
  fetch(API_REQUEST.comedy).then(res => res.json()),
  fetch(API_REQUEST.family).then(res => res.json())
]);



  return {
    props: {
      trending: trending.results,
      topRated: topRated.results,
      topTV: topTV.results,
      popular: popular.results,
      documentary: documentary.results,
      comedy: comedy.results,
      family: family.results,
    }
  }
}

interface HomeProps {
  trending: IMovie[];
  topRated: IMovie[];
  topTV: IMovie[];
  popular: IMovie[];
  documentary: IMovie[];
  comedy: IMovie[]
  family: IMovie[]
}