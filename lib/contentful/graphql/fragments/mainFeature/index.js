import { LUMBER_CLIENT } from "../lumberClient";

export const MAIN_FEATURE = `
sys {
  id
}
title
stringList
clientsCollection(limit:10) {
  items {
  ${LUMBER_CLIENT}
  }
}
type
marqueeText
marqueePosition
`;
