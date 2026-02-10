export const getCookie = function(name){
  const cookieArr = document.cookie.split('; ');
  for (let cookie of cookieArr) {
    const [cookieName, cookieValue] = cookie.split('=')
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null
}
