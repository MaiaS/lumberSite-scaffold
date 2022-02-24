
import { ApolloClient, InMemoryCache } from '@apollo/client';

const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID;
const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT;

export const contentful = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${contentfulSpaceId}/environments/${contentfulEnvironment}/`,
  headers: { Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}` },
  cache: new InMemoryCache(),
});