import Layout from '../components/layout'
import { queryPage } from '../lib/contentful/graphql/queries/queryPage';
import { queryResult } from '../lib/contentful/graphql/queries/queryResults'

export async function getStaticProps() {
  const data = await queryPage('home');
  console.log(data)
  const allPosts ={}
  const preview = {}
  return {
    props: {preview, allPosts, data},
  }
}


export default function Index({ preview, allPosts, data }) {

  return (
    <>
      <Layout preview={preview}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      </Layout>
    </>
  )
}
