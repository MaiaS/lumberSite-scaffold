
import { contentful } from '../client'
import { gql } from '@apollo/client'
import { THREE_WAY_GRID } from '../fragments/ThreeWayGrid'
import { MAIN_FEATURE } from '../fragments/mainFeature'



export const queryPage = async (slug) => {
  const { data } = await contentful.query({
    query: gql`
      query pageData {
        pageCollection(where: {slug: "${slug}"}, limit: 1) {
          items { 
            name
            slug
            contentCollection(limit: 30) {
              items{
                __typename
                ... on ThreeWayGrid {
                  ${THREE_WAY_GRID}
                } 
                ...  on MainFeature {
                ${MAIN_FEATURE}
                }
              }
            }

          }
        }
      }
    `})

    return {data}
}