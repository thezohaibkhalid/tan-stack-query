import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=' bg-gray-200'  >
        <nav className=' p-4 flex justify-between items-center h-16 max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold'>Header</h1>
        <div>
            <ul className='flex gap-4 items-center'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/trad">Trad</Link>
                </li>
                <li>
                    <Link to="/rq">RQ</Link>
                </li>
            </ul>
        </div>
        </nav>
    </header>
  )
}

export default Header