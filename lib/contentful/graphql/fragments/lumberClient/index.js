import { IMAGE_FRAGMENT, VIDEO_FRAGMENT } from "../imageFragment";


export const LUMBER_CLIENT = `
   __typename
   sys {
     id
   }
    title
    url
    image {
      ${IMAGE_FRAGMENT}
    }
    video {
      ${VIDEO_FRAGMENT}
    }
`;