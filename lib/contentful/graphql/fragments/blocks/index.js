import { IMAGE_FRAGMENT } from "../imageFragment"
import { LUMBER_CLIENT } from "../lumberClient"

export const SMALL_BLOCK = `
name
type
title
mainColor
secondaryColor
latLong
image {
  ${IMAGE_FRAGMENT}
}
`

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
`