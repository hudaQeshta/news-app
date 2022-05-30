import Axios from "axios"
import authApi from "./auth.api"
import newsApi from "./news.api"

const authApiInstance = Axios.create({
	baseURL: process.env.REACT_APP_BASE_FAKE_AUTH_URL
})

const nyTimesApiInstance = Axios.create({
    baseURL: process.env.REACT_APP_NYTIMES_BASE_URL
})

// export const attachAuthToken = (token) => {
// 	[nyTimesApiInstance]?.map(apiInstance => {
// 		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
// 	})
// 	localStorage.setItem('accessToken', token)
// }


// apis
export const auth = authApi(authApiInstance)
export const news = newsApi(nyTimesApiInstance)


const api = {
	auth,
    news
}

export default api
