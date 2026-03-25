const KEY_TOKEN ='access_token'

function setAcessToken(token: string) {
  localStorage.setItem(KEY_TOKEN, token)
}

function getAcessToken(): string | null {
  const token = localStorage.getItem(KEY_TOKEN)
  if (!token) return null
  return token
}

function clearAccessToken() {
  localStorage.removeItem(KEY_TOKEN)
}

export {
  setAcessToken,
  getAcessToken,
  clearAccessToken
}
