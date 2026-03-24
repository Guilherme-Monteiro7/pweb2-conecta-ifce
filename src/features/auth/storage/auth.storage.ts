const KEY_TOKEN ='access_token'

function setAcessToken(token: string) {
  localStorage.setItem('KEY_TOKEN', token)
}

function getAcessToken() {
  localStorage.getItem('KEY_TOKEN')
}

function clearAccessToken() {
  localStorage.removeItem(KEY_TOKEN)
}

export {
  setAcessToken,
  getAcessToken,
  clearAccessToken
}
