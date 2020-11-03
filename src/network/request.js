import axios from 'axios'

const api = axios.create({
	// baseURL:'http://localhost:3000',
	// baseURL:'http://188.131.130.80',
	baseURL:'http://175.24.114.151',
	// baseURL:'http://musicapi.leanapp.cn/',
	timeout:6000,
	withCredentials: true
})

export default api