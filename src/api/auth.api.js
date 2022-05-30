const authApi = (apiInstance) => {

	const login = async (credentials) => {
		const loggedInUserInfo = apiInstance.post('/auth/login', credentials)
		return loggedInUserInfo
	}

    const register = async (credentials) => {
		const registeredUserInfo = apiInstance.post('/auth/register', credentials)
		return registeredUserInfo
	}

	return {
		login,
        register
	}

}

export default authApi