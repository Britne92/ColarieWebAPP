import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../styles/newsletter.css"

const Newsletter = () => {
  return (
    <div className='new-container'>
        <div className="new-row">
            <div className="new-col">
                <h2 className="new-title">Recibe Noticias</h2>
                <p className="new-desc">Informate de nuestros nuevos productos/descuentos</p>
                <div className="input-container">
                    <input type="text" placeholder='Pon tu e-mail' />
                    <button><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newsletter
