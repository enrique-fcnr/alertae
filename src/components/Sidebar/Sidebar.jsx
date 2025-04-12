import React from 'react'
import "./Sidebar.css"

function Sidebar() {
  return (
    <>
      <div id="sidebar">

        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Item 1</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Item 2</a>
            </li>
            <li>
              <a href={`/contacts/1`}>Item 3</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Item 4</a>
            </li>
            <li>
              <a href={`/contacts/1`}>Item 5</a>
            </li>

          </ul>
        </nav>
      </div>

    </>
  )
}

export default Sidebar