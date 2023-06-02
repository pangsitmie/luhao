// import { BsFacebook } from 'react-icons/bs'
// import { MdMail } from 'react-icons/md'

// import { useTranslation } from 'react-i18next';
// const Footer = () => {
//   const { t } = useTranslation();
//   return (
//     <footer className="mt-20 w-full bottom-0 bg-gray-900 text-white p-12 rounded-t-3xl">
//       <div className="grid grid-cols-2 pb-12">
//         <h2 className="text-xl font-medium py-2 text-center">Contact Us</h2>
//         <div className="flex items-center justify-center gap-4">
//           <p>cloudprogramingservice@gmail.com</p>
//           <div className='flex gap-4'>
//             <a href="mailto:cloudprogramingservice@gmail.com" target='_blank' rel="noreferrer" className="bg-gray-900 text-white py-3 px-4 rounded-full text-lg transition-colors"><MdMail /></a>
//             <a href="https://zh-tw.facebook.com/cloudprogrammingonline/" target='_blank' rel="noreferrer" className="bg-gray-900 text-white py-3 px-4 rounded-full text-lg transition-colors"><BsFacebook /></a>
//           </div>
//         </div>
//       </div>

//       <div className='w-5/6 mx-auto flex flex-wrap justify-between text-center'>
//         <div className='col'>
//           <h3 className="py-1 text-sm mb-4 font-bold">{t('business')}</h3>
//           <a href="/line"><p className="text-gray-200 mt-2 text-sm">{t('line')}</p></a>
//           <a href="/search-system"><p className="text-gray-200 mt-2 text-sm">{t('search_system')}</p></a>
//         </div>
//         <div className='col'>
//           <h3 className="py-1 text-sm mb-4 font-bold">{t('service')}</h3>
//           <a href="/marketing-system"><p className="text-gray-200 mt-2 text-sm">{t('marketing_system')}</p></a>
//           <a href="/xiaodi"><p className="text-gray-200 mt-2 text-sm">{t('xiaodi')}</p></a>
//         </div>
//         <div className='col'>
//           <h3 className="py-1 text-sm mb-4 font-bold">{t('entertainment')}</h3>
//           <a href="/ipickpro"><p>iPickPro</p></a>
//           <a href="/galaxy-city"><p className="text-gray-200 mt-2 text-sm">{t('app_dev')}</p></a>
//         </div>
//         <div className='col'>
//           <a href="/media-design"><h3 className="text-sm py-1 font-bold">{t('design')}</h3></a>
//         </div>
//         <div className='col'>
//           <a href="/about"><h3 className="text-sm py-1 font-bold">{t('about')}</h3></a>
//         </div>
//       </div>

//       <div className="mt-8 mb-2 text-lg text-white text-center">
//         <small>&copy; 雲程在線 - winprocloud.com</small>
//       </div>
//     </footer >
//   )
// }

// export default Footer


import React from 'react'
import LOGOFULL from '../../assets/logo_full.png'
import { BsFillChatTextFill, BsFacebook } from 'react-icons/bs'
import { IconButtonStyled } from '../styles/IconButton.styled'
import { HiOutlineMail } from 'react-icons/hi'
import Copy from '../copy/Copy'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="px-[10%] py-10 bg-[#FFA45A]">
        {/* row1 */}
        <div className='flex justify-between'>
          <div>
            {/* logo */}
            <img src={LOGOFULL} className='h-[50px] w-auto' alt="" />
          </div>
          <div className='flex gap-20 items-center'>
            <div className='flex gap-10 items-center'>
              <a>
                <span>Bear Pay</span>
              </a>
              <a>
                <span>About</span>
              </a>
              <a>
                <span>Contact Us</span>
              </a>
            </div>
            <div className='flex items-center gap-2'>
              <BsFillChatTextFill />
              Got Questions
              {/* cloudprogramingservice@gmail.com */}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent my-10"></div>


        {/* row2 */}
        <div className='flex justify-between items-center'>
          <div>
            <span className='text-[12px]'>All rights reserved. View our Privacy Policy and Terms of Cloudprogrammingonline.com</span>
          </div>

          <div className='flex gap-4 items-center'>
            <span >Our Socials</span>
            <IconButtonStyled>
              <HiOutlineMail
                className='text-lg' />
            </IconButtonStyled>
            {/* <IconButtonStyled>
              <HiOutlineMail
                className='text-lg' />
            </IconButtonStyled> */}
            <IconButtonStyled>
              <BsFacebook
                className='text-lg' />
            </IconButtonStyled>
          </div>
        </div>
      </div>
      <Copy />




    </footer >
  )
}

export default Footer