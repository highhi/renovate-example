import foo from '../../client/src'

describe('foo', () => {
  it('foo("world") to be "hello world"', () => {
    expect(foo('world')).toBe('hello world')
  }) 
}) 