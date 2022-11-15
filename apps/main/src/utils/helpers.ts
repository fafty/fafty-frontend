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
