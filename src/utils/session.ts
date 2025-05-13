export const ReadSession = (key: string) => sessionStorage.getItem(key)
export const WriteSession = (key: string, value: string) =>
  sessionStorage.setItem(key, value)
export const ClearSession = () => sessionStorage.clear()
