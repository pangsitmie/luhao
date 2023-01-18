import React from 'react'
import "./maintenance.css"

import MAINTENANCE from '../../assets/maintenance_img.png'

const Maintenance = () => {
    return (
        <div className='Maintenance_container'>
            <div className='  maintenance'>
                <div className='maintenance_left'>
                    <img src={MAINTENANCE} alt="" />
                </div>
                <div className='maintenance_right maintenance_flexbox'>
                    <div>
                        <h2>Oops!</h2>
                        <h3>Website Under Construction</h3>
                        <p>We are working on it. Please wait for our latest update or contact us for more information.</p>
                        <a href="mailto:cloudprogramingservice@gmail.com">
                            <button className="btn btn-stroke btn_maintenance">
                                Contact Us
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Maintenance