import { faArrowRightArrowLeft, faCheck, faPhoneVolume, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../styles/banners.css"

const Banners = () => {
  return (
    <div className='b-container'>
      <div className="b-row">
          <div className="b-col">
                <FontAwesomeIcon icon={faCheck} />
                <span>Calidad</span>
          </div>
          <div className="b-col">
                <FontAwesomeIcon icon={faTruckFast} />
                <span>Envio Gratis</span>
          </div>
          <div className="b-col">
                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                <span>14 dias para devolucion</span>
          </div>
          <div className="b-col">
                <FontAwesomeIcon icon={faPhoneVolume} />
                <span>Soporte 24/7</span>
          </div>
      </div>
    </div>
  )
}

export default Banners
