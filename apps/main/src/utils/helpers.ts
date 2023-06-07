export const isEmpty = (value: unknown): boolean => {
  if (!value) {
    return true
  }

  if (Array.isArray(value)) {
    return !value.length
  }

  if (typeof value === 'object') {
    return !Object.keys(value).length
  }

  return false
}

export const isObjectEmpty = (value: object | string | null) => {
  return (
    (!value && value == null) ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    (typeof value === 'object' &&
      Object.keys(value).length === 0 &&
      Object.getPrototypeOf(value) === Object.prototype)
  )
}
