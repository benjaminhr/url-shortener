const base = require('./base58')

test('encodes an id', () => {
  expect(base.encode(1000011111)).toBe('2ow6XS')
})