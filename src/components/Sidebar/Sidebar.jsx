import React from 'react'
import "./Sidebar.css"
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
      <div id="sidebar">
        <div>
          <form id="search-form" role="search">
            <input
              className='sidebar-input'
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />

          </form>
          <form method="post">
            <button className='btn-sidebar  ' type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/teste">Tempo do dia</Link>
            </li>
            <li>
              <Link to="/dashboard/teste2">Item 2</Link>
            </li>
            <li>
              <Link to="/contacts/1">Mapa do tempo</Link>
            </li>
            <li>
              <Link to="/contacts/2">Item 4</Link>
            </li>
            <li>
              <Link to="/contacts/1">Item 5</Link>
            </li>
          </ul>
        </nav>
      </div>

    </>
  )
}

export default Sidebar