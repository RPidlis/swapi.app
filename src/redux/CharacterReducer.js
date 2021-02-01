import { charactersApi, filmsApi, planetsApi, vehiclesApi } from '../services/ApiService'
import { photoService } from '../services/PhotoService'

const SET_CHARACTERS = 'SET_CHARACTERS'
const SET_LIKE = 'SET_LIKE'
const SET_DISLIKE = 'SET_DISLIKE'
const REDIRECT_TO = 'REDIRECT_TO'
const SET_PROFILE = 'SET_PROFILE'
const SET_PLANET_TO_PROFILE = 'SET_PLANET_TO_PROFILE'
const SET_VEHICLES_TO_PROFILE = 'SET_VEHICLES_TO_PROFILE'
const SET_FILMS_TO_PROFILE = 'SET_FILMS_TO_PROFILE'
const SET_PHOTO_TO_PROFILE = 'SET_PHOTO_TO_PROFILE'

const instance = {
    items: [],
    likesId: [],
    profile: {
        vehicle: [],
        film: []
    }
}


const CharacterReducer = (state = instance, action) => {

    switch (action.type) {
        case SET_CHARACTERS:
            return {
                ...state,
                items: action.characters.map((character, index) => {
                    /**
                     * Since the API does not return character's ID, we should rely on the index in response
                     */
                    return {
                        ...character,
                        id: ++index,
                        photo: null
                    }
                })
            }
        case SET_LIKE:
            return {
                ...state,
                likesId: [...state.likesId, action.id]
            }

        case SET_DISLIKE:
            return {
                ...state,
                likesId: state.likesId.filter((id) => id !== action.id)
            }

        case SET_PROFILE:
            return {
                ...state,
                profile: {...action.profile, vehicle: [], film: [], photo: null}
            }

        case SET_PLANET_TO_PROFILE:
            return {
                ...state,
                profile: {...state.profile, planets: action.planets}
            }

        case SET_VEHICLES_TO_PROFILE:

            return {
                ...state,
                profile: {
                    ...state.profile,
                    vehicle: [...state.profile.vehicle, action.vehicle]
                }
            }

        case SET_FILMS_TO_PROFILE:

            return {
                ...state,
                profile: {
                    ...state.profile,
                    film: [...state.profile.film, action.film]
                }
            }

        case SET_PHOTO_TO_PROFILE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photo: action.file
                }
            }
        default:
            return {...state}
    }
}

export default CharacterReducer

// Action creators
export const setCharacters = (characters) => ({type: SET_CHARACTERS, characters})
export const redirectToProfile = (id) => ({type: REDIRECT_TO, id})
export const setLike = (id) => ({type: SET_LIKE, id})
export const setDislike = (id) => ({type: SET_DISLIKE, id})
export const setProfile = (profile) => ({type: SET_PROFILE, profile})
export const setPlanetsToProfile = (planets) => ({type: SET_PLANET_TO_PROFILE, planets: planets})
export const setVehiclesToProfile = (vehicle) => ({type: SET_VEHICLES_TO_PROFILE, vehicle})
export const setFilmsToProfile = (film) => ({type: SET_FILMS_TO_PROFILE, film})
export const storeCharacterPhoto = (file) => ({type: SET_PHOTO_TO_PROFILE, file})

// Thunk creators
export const requestCharacters = () => async (dispatch) => {
    const response = await charactersApi.getAll()
    dispatch(setCharacters(response.data.results))
}
export const getProfile = (id) => async (dispatch) => {
    // get profile from API by id
    const profile = await charactersApi.getProfile(id)
    // set profile in state
    dispatch(setProfile(profile.data))
    // get planets from API by id
    const planetId = profile.data.homeworld.split('http://swapi.dev/api/planets/')[1]
    const planet = await planetsApi.get(Number.parseInt(planetId))
    // set planets in state
    dispatch(setPlanetsToProfile(planet.data.name))
    // get all vehicles
    const vehiclesId = profile.data.vehicles.map((i) => {
        return Number.parseInt(i.split('http://swapi.dev/api/vehicles/')[1])
    })
    if (vehiclesId) {
        await Promise.all(vehiclesId.map(async (i) => {
            const result = await vehiclesApi.get(i)
            dispatch(setVehiclesToProfile(result.data.name))
        }))
    }
    // get all films
    const filmsId = profile.data.films.map((i) => {
        return Number.parseInt(i.split('http://swapi.dev/api/films/')[1])
    })

    if (filmsId) {
        await Promise.all(filmsId.map(async (i) => {
            const result = await filmsApi.get(i)
            dispatch(setFilmsToProfile(result.data.title))
        }))
    }

}

export const storePhoto = (file) => async (dispatch) => {
    // store file as string by converting it to base64
    const base64 = await photoService.convertToBase64(file)
    dispatch(storeCharacterPhoto(base64))
}

