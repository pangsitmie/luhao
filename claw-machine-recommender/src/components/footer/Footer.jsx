import React from 'react'
import './footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
const Footer = () => {

    return (
        <footer>
            <div className='contact_container'>
                <h2 className='footer__logo'>Contact Us</h2>
                <div className="footer__socials">
                    <p>cloudprogramingservice@gmail.com</p>
                    <div className='footer__socials__icons'>
                        <a href="mailto:cloudprogramingservice@gmail.com" target='_blank' rel="noreferrer"><EmailIcon /></a>
                        <a href="https://zh-tw.facebook.com/cloudprogrammingonline/" target='_blank' rel="noreferrer"><FacebookIcon /></a>
                    </div>
                </div>
            </div>




            <div className="footer__copyright">
                <small>
                    <a href="https://roundbytes.com">&copy; </a>
                    雲程在線
                </small>
            </div>
        </footer >
    )
}

export default Footer