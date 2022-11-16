import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/footer.css"

const Footer = () => {
  return (
    <div className='f-container'>
        <div className="f-row">
          <div className="f-col">
            <img src="/images/logo/logo.png" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, nesciunt! Ipsum repellat saepe, similique magnam aut ducimus eveniet nobis ut sunt neque harum consequatur.</p>
          </div>
          <div className="f-col">
            <h2>Acceso Rapido</h2>
            <ul>
              <li>
                <NavLink to="/">Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/shop">Tienda</NavLink>
              </li>
              <li>
                <NavLink to="/about">Info</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contacto</NavLink>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h2>Categorias</h2>
            <ul>
              <li>
                <NavLink to="/">Men</NavLink>
              </li>
              <li>
                <NavLink to="/">Women</NavLink>
              </li>
              <li>
                <NavLink to="/">Kids</NavLink>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h2>Siguenos</h2>
            <div className="socials">
                <a href="/"><img src="/images/socials/facebook.png" alt="" /></a>
                <a href="/"><img src="/images/socials/instagram.png" alt="" /></a>
                <a href="/"><img src="/images/socials/twitter.png" alt="" /></a>
                <a href="/"><img src="/images/socials/youtube.png" alt="" /></a>
            </div>
          </div>
        </div>
        <div className="f-copyrow">
            <p>&copy; 2022. All Rights Reserved. Powered by Colarie.</p>
        </div>
    </div>
  )
}

export default Footer