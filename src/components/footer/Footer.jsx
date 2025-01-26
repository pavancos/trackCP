import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="bg-blue-100 text-center text-xs p-3 w-full">
            <p className="font-mono">track code &copy;</p>
            <Link to='/login'>Login Super</Link>
        </footer>
    )
}

export default Footer