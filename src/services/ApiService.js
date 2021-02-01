import axios from 'axios'

const instance = axios.create({
    withCredentials: false,
    baseURL: 'http://swapi.dev/api/'
});

export const charactersApi = {
    path: 'people/',
    getAll() {
        return instance.get(this.path)
    },
    getProfile(id) {
        return instance.get(this.path + `${id}`)
    }
}

export const planetsApi = {
    path: 'planets/',
    get(id) {
        return instance.get(this.path + `${id}`)
    }
}

export const vehiclesApi = {
    path: 'vehicles/',
    get(id) {
        return instance.get(this.path + `${id}`)
    }
}
export const filmsApi = {
    path: 'films/',
    get(id) {
        return instance.get(this.path + `${id}`)
    }
}