import React from 'react'
import logo from '../../image/yumemi.png'
import './LoadingScreen.css'

const LoadingScreen = () => (
  <div className="loading-screen">
    <img src={logo} alt="yumemi-logo" className="center" />
  </div>
)

export default LoadingScreen
