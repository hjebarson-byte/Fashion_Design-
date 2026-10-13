// Illustrative size charts (measurements in inches, body measurements).
// Must be verified against real product specifications before launch.

const S = ['S', 'M', 'L', 'XL', 'XXL']

export const sizeGuide = {
  men: {
    tops: {
      label: 'Tops & T-Shirts',
      columns: ['Size', 'Chest', 'Waist', 'Shoulder', 'Length'],
      rows: [
        ['S', '36–38', '30–32', '17.0', '27.0'],
        ['M', '38–40', '32–34', '17.5', '28.0'],
        ['L', '40–42', '34–36', '18.0', '29.0'],
        ['XL', '42–44', '36–38', '18.5', '30.0'],
        ['XXL', '44–46', '38–40', '19.0', '31.0'],
      ],
    },
    shirts: {
      label: 'Shirts',
      columns: ['Size', 'Chest', 'Neck', 'Sleeve', 'Length'],
      rows: [
        ['S', '38', '15.0', '24.5', '28.0'],
        ['M', '40', '15.5', '25.0', '29.0'],
        ['L', '42', '16.0', '25.5', '30.0'],
        ['XL', '44', '16.5', '26.0', '31.0'],
        ['XXL', '46', '17.0', '26.5', '32.0'],
      ],
    },
    jeans: {
      label: 'Jeans',
      columns: ['Size', 'Waist', 'Hip', 'Thigh', 'Inseam'],
      rows: [
        ['S', '30', '37', '22.0', '31.5'],
        ['M', '32', '39', '23.0', '32.0'],
        ['L', '34', '41', '24.0', '32.0'],
        ['XL', '36', '43', '25.0', '32.5'],
        ['XXL', '38', '45', '26.0', '32.5'],
      ],
    },
    trousers: {
      label: 'Trousers',
      columns: ['Size', 'Waist', 'Hip', 'Rise', 'Inseam'],
      rows: S.map((s, i) => [s, `${30 + i * 2}`, `${37 + i * 2}`, `${10 + i * 0.25}`, `${31 + i * 0.5}`]),
    },
  },
  women: {
    tops: {
      label: 'Tops & T-Shirts',
      columns: ['Size', 'Bust', 'Waist', 'Shoulder', 'Length'],
      rows: [
        ['S', '33–35', '26–28', '14.5', '23.0'],
        ['M', '35–37', '28–30', '15.0', '24.0'],
        ['L', '37–39', '30–32', '15.5', '25.0'],
        ['XL', '39–41', '32–34', '16.0', '26.0'],
        ['XXL', '41–43', '34–36', '16.5', '27.0'],
      ],
    },
    shirts: {
      label: 'Shirts',
      columns: ['Size', 'Bust', 'Waist', 'Sleeve', 'Length'],
      rows: [
        ['S', '35', '28', '23.0', '26.0'],
        ['M', '37', '30', '23.5', '27.0'],
        ['L', '39', '32', '24.0', '28.0'],
        ['XL', '41', '34', '24.5', '29.0'],
        ['XXL', '43', '36', '25.0', '30.0'],
      ],
    },
    jeans: {
      label: 'Jeans',
      columns: ['Size', 'Waist', 'Hip', 'Thigh', 'Inseam'],
      rows: [
        ['S', '27', '37', '21.0', '30.0'],
        ['M', '29', '39', '22.0', '30.0'],
        ['L', '31', '41', '23.0', '30.5'],
        ['XL', '33', '43', '24.0', '30.5'],
        ['XXL', '35', '45', '25.0', '31.0'],
      ],
    },
    trousers: {
      label: 'Trousers',
      columns: ['Size', 'Waist', 'Hip', 'Rise', 'Inseam'],
      rows: S.map((s, i) => [s, `${27 + i * 2}`, `${37 + i * 2}`, `${10.5 + i * 0.25}`, `${29.5 + i * 0.5}`]),
    },
    dresses: {
      label: 'Dresses',
      columns: ['Size', 'Bust', 'Waist', 'Hip', 'Length'],
      rows: [
        ['S', '34', '27', '37', '44.0'],
        ['M', '36', '29', '39', '45.0'],
        ['L', '38', '31', '41', '46.0'],
        ['XL', '40', '33', '43', '47.0'],
        ['XXL', '42', '35', '45', '48.0'],
      ],
    },
  },
}

/** Which size-chart tab best matches a product category. */
export const categoryToChart = {
  tshirts: 'tops', tops: 'tops', hoodies: 'tops', sweatshirts: 'tops', knitwear: 'tops', jackets: 'tops', activewear: 'tops',
  shirts: 'shirts', jeans: 'jeans', trousers: 'trousers', shorts: 'trousers', skirts: 'trousers', dresses: 'dresses',
}
