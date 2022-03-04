import { FEATURE_BLOCK, SMALL_BLOCK } from "../blocks";

export const THREE_WAY_GRID = `
  sys {
    id
  }
  name
  smallBoxesCollection(limit: 2) {
    items {
      ${SMALL_BLOCK}
    }
  }
  largeBox {
    ${FEATURE_BLOCK}
  }
  position
`;
