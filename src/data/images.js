// -----------------------------------------------------------------
// IMAGE LIBRARY
//
// All photography is hosted on Unsplash (https://unsplash.com) and loaded via
// images.unsplash.com. Every photo ID below was checked to resolve (HTTP 200)
// when this project was built. Unsplash photos are free to use under the
// Unsplash License, but you should review it (and any model/brand releases)
// before using them commercially. To use your own licensed product photography,
// replace the entries in PHOTO_IDS / the `u()` helper, or point products at local
// files in src/assets/images — nothing else needs to change.
//
// Every <img> is rendered through <SmartImage />, which falls back to a neutral
// VELORA placeholder if a remote image ever fails to load.
// -----------------------------------------------------------------

const PHOTO_IDS = [
  '1515886657613-9f3515b0c78f', '1490481651871-ab68de25d43d', '1483985988355-763728e1935b', '1441984904996-e0b6ba687e04',
  '1521572163474-6864f9cf17ab', '1503342217505-b0a15ec3261c', '1434389677669-e08b4cac3105', '1445205170230-053b83016050',
  '1469334031218-e382a71b716b', '1496747611176-843222e1e57c', '1529139574466-a303027c1d8b', '1539109136881-3be0616acf4b',
  '1507679799987-c73779587ccf', '1552374196-1ab2a1c593e8', '1617137968427-85924c800a22', '1516257984-b1b4d707412e',
  '1556905055-8f358a7a47b2', '1576566588028-4147f3842f27', '1583743814966-8936f5b7be1a', '1556821840-3a63f95609a7',
  '1542272604-787c3835535d', '1541099649105-f69ad21f3246', '1594938298603-c8148c4dae35', '1591047139829-d91aecb6caea',
  '1551028719-00167b16eac5', '1558769132-cb1aea458c5e', '1583496661160-fb5886a0aaaa', '1594633312681-425c7b97ccd1',
  '1572804013309-59a88b7e92f1', '1595777457583-95e059d581b8', '1515372039744-b8f02a3ae446', '1509631179647-0177331693ae',
  '1487222477894-8943e31ef7b2', '1523381210434-271e8be1f52b', '1489987707025-afc232f7ea0f', '1525507119028-ed4c629a60a3',
  '1488161628813-04466f872be2', '1520975916090-3105956dac38', '1562157873-818bc0726f68', '1578587018452-892bacefd3f2',
  '1620799140408-edc6dcb6d633', '1558618666-fcd25c85cd64', '1556906781-9a412961c28c', '1485968579580-b6d095142e6e',
  '1500648767791-00dcc994a43e', '1492562080023-ab3db95bfbce', '1534528741775-53994a69daeb', '1544005313-94ddf0286df2',
  '1524504388940-b1c1722653e1', '1529626455594-4ff0802cfb7e', '1581044777550-4cfa60707c03', '1591369822096-ffd140ec948f',
  '1598033129183-c4f50c736f10', '1584273143981-41c073dfe8f8', '1503944583220-79d8926ad5e2', '1550614000-4895a10e1bfd',
  '1495385794356-15371f348c31', '1475180098004-ca77a66827be', '1509319117193-57bab727e09d', '1479064555552-3ef4979f8908',
  '1532453288672-3a27e9be9efd', '1554568218-0f1715e72254', '1519238263530-99bdd11df2ea', '1583744946564-b52ac1c389c8',
  '1560243563-062bfc001d68', '1564584217132-2271feaeb3c5', '1618354691373-d851c5c3a990', '1622445275576-721325763afe',
  '1605518216938-7c31b7b14ad0', '1507680434567-5739c80be1ac', '1602293589930-45aad59ba3ab', '1618517351616-38fb9c5210c6',
  '1485230895905-ec40ba36b9bc', '1566174053879-31528523f8ae', '1581338834647-b0fb40704e21', '1475178626620-a4d074967452',
  '1551232864-3f0890e580d9', '1543163521-1bf539c55dd2', '1548036328-c9fa89d128fa', '1553062407-98eeb64c6a62',
  '1594223274512-ad4803739b7c', '1600185365926-3a2ce3cdb9eb', '1595950653106-6c9ebd614d3a', '1460353581641-37baddab0fa2',
  '1512436991641-6745cdb1723f', '1558171813-4c088753af8f', '1571945153237-4929e783af4a', '1604176354204-9268737828e4',
]

/** Base URL (no size params) for photo number `i` of PHOTO_IDS. */
export const u = (i) => `https://images.unsplash.com/photo-${PHOTO_IDS[i]}`

/**
 * Add sizing/quality params to an Unsplash base URL.
 * Non-Unsplash URLs (e.g. local assets) are returned unchanged.
 */
export function optimize(url, width = 800, quality = 75) {
  if (!url || !url.includes('images.unsplash.com')) return url
  return `${url}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Neutral inline SVG used when an image fails to load. */
export const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#EFEDE8"/><path d="M150 190l50 110 50-110" fill="none" stroke="#B79A70" stroke-width="6"/><text x="200" y="360" font-family="Georgia,serif" font-size="22" letter-spacing="8" text-anchor="middle" fill="#777">VELORA</text></svg>`,
  )

/**
 * Photo groups — each list contains indexes into PHOTO_IDS that suit a garment type.
 * Products pick their gallery from these so related items look coherent.
 */
export const photoGroups = {
  menTee: [4, 86, 71, 17, 18, 65, 66],
  menShirt: [52, 85, 12, 44, 41, 67],
  menJacket: [13, 14, 15, 22, 32, 36, 37, 45, 62, 69],
  menHoodie: [19, 40, 69],
  menJeans: [20, 68, 70],
  menTrousers: [22, 15, 41, 14],
  menKnit: [16, 6, 38, 87],
  menShorts: [41, 67, 35],
  womenTop: [5, 63, 61, 46, 47, 48, 49, 50],
  womenShirt: [57, 74, 26],
  womenDress: [9, 28, 29, 30, 55, 72, 73, 51],
  womenJeans: [21, 75, 11],
  womenTrousers: [27, 31, 53, 10],
  womenSkirt: [26, 49, 50],
  womenJacket: [2, 10, 11, 43, 53],
  womenKnit: [6, 16, 38, 87, 47],
  active: [0, 8, 56, 39],
  accessories: [42, 59, 77, 78, 79, 80, 81, 82, 83],
}

/** Campaign / editorial imagery used across the site (full-size photos). */
export const campaign = {
  heroMen: u(37),
  heroWomen: u(28),
  editorial: u(10),
  editorialWide: u(2),
  men: u(45),
  women: u(29),
  menCollection: u(13),
  womenCollection: u(9),
  newArrivals: u(43),
  bestSellers: u(30),
  sale: u(28),
  promo: u(55),
  streetwear: u(69),
  accessories: u(78),
  aboutStory: u(8),
  aboutDesign: u(14),
  aboutQuality: u(50),
  aboutWide: u(1),
  megaMen: u(36),
  megaWomen: u(73),
  megaCollections: u(3),
  authSide: u(72),
  gallery: [8, 62, 29, 14, 55, 15, 9, 45, 50, 70].map(u),
}
