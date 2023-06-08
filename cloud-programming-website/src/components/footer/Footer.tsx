import LOGOFULL from '../../assets/logo_full.png'
import { BsFillChatTextFill, BsFacebook } from 'react-icons/bs'
import { IconButtonStyled } from '../styles/IconButton.styled'
import { HiOutlineMail } from 'react-icons/hi'
// import Copy from '../copy/Copy'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

const Footer = () => {

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const renderDesktopMenu = () => {
    return (
      <footer>
        <div className="px-[10%] pt-10 bg-[#272D4D]">
          {/* row1 */}
          <div className='flex justify-between'>
            <div>
              {/* logo */}
              <a
                href="/">
                <img src={LOGOFULL} className='h-[40px] w-auto' alt="" />
              </a>
            </div>
            <div className='flex gap-20 items-center'>
              <div className='flex gap-10 items-center'>
                <a href='/bearpay'>
                  <span className='text-white'>Bear Pay</span>
                </a>
                <a href='about'>
                  <span className='text-white'>About</span>
                </a>
                <a href='mailto:cloudprogramingservice@gmail.com'>
                  <span className='text-white'>Contact Us</span>
                </a>
              </div>
              <a href="mailto:cloudprogramingservice@gmail.com">
                <div className='flex items-center gap-2 text-white'>
                  <BsFillChatTextFill />
                  Got Questions
                </div>
              </a>
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent my-10"></div>


          {/* row2 */}
          <div className='flex justify-between items-center text-white'>
            <div>
              <span className='text-[12px] text-white'>All rights reserved. View our Privacy Policy and Terms of Cloudprogrammingonline.com</span>
            </div>

            <div className='flex gap-4 items-center '>
              <IconButtonStyled>
                <Link
                  to="mailto:cloudprogramingservice@gmail.com">
                  <HiOutlineMail
                    className='text-lg' />
                </Link>

              </IconButtonStyled>
              <IconButtonStyled>
                <Link
                  to="https://zh-tw.facebook.com/cloudprogrammingonline/">
                  <BsFacebook
                    className='text-lg' />
                </Link>
              </IconButtonStyled>
            </div>
          </div>
          {/* <Copy /> */}
        </div>
      </footer >
    )
  };

  const renderMobileMenu = () => {
    return (
      <footer>
        <div className="px-5 pt-10 bg-[#272D4D]">
          {/* row1 */}
          <div className='flex flex-col items-center mb-8'>
            {/* logo */}
            <a
              href="/">
              <img src={LOGOFULL} className='h-10 w-auto' alt="" />
            </a>
            <div className='flex mt-4'>
              <a
                href="/bearpay">
                <span className='text-white mr-4'>Bear Pay</span>
              </a>
              <a href="/about">
                <span className='text-white mr-4'>About</span>
              </a>
              <a href='mailto:cloudprogramingservice@gmail.com'>
                <span className='text-white'>Contact Us</span>
              </a>
            </div>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent my-6"></div>

          {/* row2 */}
          <div className='flex justify-between items-center text-white'>
            <div>
              <span className='text-xs text-white'>All rights reserved. Cloudprogrammingonline.com</span>
            </div>
            <div className='flex gap-4 items-center '>
              <IconButtonStyled>
                <Link to="mailto:cloudprogramingservice@gmail.com">
                  <HiOutlineMail className='text-lg' />
                </Link>
              </IconButtonStyled>
              <IconButtonStyled>
                <Link to="https://zh-tw.facebook.com/cloudprogrammingonline/">
                  <BsFacebook className='text-lg' />
                </Link>
              </IconButtonStyled>
            </div>
          </div>
          {/* <Copy /> */}
        </div>
      </footer>
    )
  };

  return isMobile ? renderMobileMenu() : renderDesktopMenu();


}

export default Footer