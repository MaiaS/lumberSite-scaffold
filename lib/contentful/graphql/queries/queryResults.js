import { contentful } from "../client";
import { gql } from "@apollo/client";
import { LUMBER_CLIENT } from "../fragments/lumberClient";

export const queryAllClients = async () => {
  const { data } = await contentful.query({
    query: gql`
      query clientCollection {
       clientCollection {
         items {
           ${LUMBER_CLIENT}
         }
       }
      }
    `,
  });
  console.log(data);
  return data;
};
