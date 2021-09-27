import axios from 'axios'

const API_KEY = process.env.REACT_APP_RESAS_API_KEY

export default axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
  headers: {
    "X-API-KEY": API_KEY,
  }
})
