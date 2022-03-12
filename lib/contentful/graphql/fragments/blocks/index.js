import { IMAGE_FRAGMENT } from "../imageFragment";
import { LUMBER_CLIENT } from "../lumberClient";

export const SMALL_BLOCK = `
sys {
  id
}
name
type
title
subtitle
mainColor
secondaryColor
timeZone
image {
  ${IMAGE_FRAGMENT}
}
`;

export const FEATURE_BLOCK = `
name
mainImage {
  ${IMAGE_FRAGMENT}
}
client {
  ${LUMBER_CLIENT}
}
title
description
tags
`;
