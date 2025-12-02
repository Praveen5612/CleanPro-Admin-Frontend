import React from 'react'
import "../styles/Navbar.css"
const Navbar = () => {
  return (
    <>
        <div className="nav">
            <div className="left">
                <h3>Logo</h3>
            </div>
            
            <div className="right">
                <h3>Home</h3>
                <h3>About</h3>
                <h3>Profile</h3>
            </div>
            
        </div>
    </>
  )
}

export default Navbar