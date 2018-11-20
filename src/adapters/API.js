class API {

  static signup (email, password) {
    return fetch(API.signupURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    }).then(resp => resp.json())
  }

  static signin (email, password) {
    return fetch(API.signinURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    }).then(resp => resp.json())
    .then(res => console.log(res))
  }

  static validate (token) {
    return fetch(API.validateURL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then(resp => resp.json())
  }

  static getItems () {
    const token = localStorage.getItem('token')
    return fetch(API.itemsURL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then(resp => resp.json())
  }
}

API.baseURL = 'https://gallerize-api.herokuapp.com/api/v1'
API.signinURL = API.baseURL + '/signin'
API.validateURL = API.baseURL + '/validate'
API.itemsURL = API.baseURL + '/items'
API.signupURL = API.baseURL + '/signup'

export default API
