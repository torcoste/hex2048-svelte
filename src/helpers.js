import { AVALIABLE_RADIUS_VALUES } from "./constants.js"

export const getRadiusFromUrl = () => {
  const url = document.location.href
  const urlParts = url.split("/#test")
  const radius = urlParts && urlParts[1] && parseInt(urlParts[1])
  if (radius && AVALIABLE_RADIUS_VALUES.includes(radius)) return radius
  return undefined
}
