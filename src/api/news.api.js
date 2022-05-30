import { attachAuthToken } from "."

const newsApi = (apiInstance) => {

	const listTopStories = async (category) => {
		const topStories = apiInstance.get(
            `/topstories/v2/${category}.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
        )
		return topStories
	}

    const listComments = async (articleUrl) => {
        // attachAuthToken(localStorage.getItem("accessToken"))
        const comments = apiInstance.get(
            `/community/v3/user-content/url.json?api-key=${process.env.REACT_APP_NYTIMES_API_KEY}&offset=0&url=${articleUrl}`
        )
        return comments
    }

    const searchResults = async (keyword) => {
        const searchResult = apiInstance.get(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${process.env.REACT_APP_NYTIMES_API_KEY}`
        )

        return searchResult
    }

	return {
		listTopStories,
        listComments,
        searchResults
	}

}

export default newsApi