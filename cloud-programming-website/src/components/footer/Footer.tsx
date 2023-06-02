// import './footer.css'
// import { BsFacebook } from 'react-icons/bs'
// import { MdMail } from 'react-icons/md'

// import { useTranslation } from 'react-i18next';
// const Footer = () => {
//   const { t } = useTranslation();
//   return (
//     <footer>
//       <div className='contact_container'>
//         <h2 className='footer__logo'>Contact Us</h2>
//         <div className="footer__socials">
//           <p>cloudprogramingservice@gmail.com</p>
//           <div className='footer__socials__icons'>
//             <a href="mailto:cloudprogramingservice@gmail.com" target='_blank' rel="noreferrer"><MdMail /></a>
//             <a href="https://zh-tw.facebook.com/cloudprogrammingonline/" target='_blank' rel="noreferrer"><BsFacebook /></a>
//           </div>
//         </div>
//       </div>

//       <div className='footer_menu'>
//         <div className='col'>
//           <h3>{t('business')}</h3>
//           <a href="/line"><p>{t('line')}</p></a>
//           <a href="/search-system"><p>{t('search_system')}</p></a>
//         </div>
//         <div className='col'>
//           <h3>{t('service')}</h3>
//           <a href="/marketing-system"><p>{t('marketing_system')}</p></a>
//           <a href="/xiaodi"><p>{t('xiaodi')}</p></a>
//         </div>
//         <div className='col'>
//           <h3>{t('entertainment')}</h3>
//           <a href="/ipickpro"><p>iPickPro</p></a>
//           <a href="/galaxy-city"><p>{t('app_dev')}</p></a>
//         </div>
//         <div className='col'>
//           <a href="/media-design"><h3>{t('design')}</h3></a>
//         </div>
//         <div className='col'>
//           <a href="/about"><h3>{t('about')}</h3></a>
//         </div>
//       </div>



//       <div className="footer__copyright">
//         <small>&copy; 雲程在線 - winprocloud.com</small>
//       </div>
//     </footer >
//   )
// }

// export default Footer

import { BsFacebook } from 'react-icons/bs'
import { MdMail } from 'react-icons/md'

import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-20 w-full bottom-0 bg-gray-900 text-white p-12 rounded-t-3xl">
      <div className="grid grid-cols-2 pb-12">
        <h2 className="text-xl font-medium py-2 text-center">Contact Us</h2>
        <div className="flex items-center justify-center gap-4">
          <p>cloudprogramingservice@gmail.com</p>
          <div className='flex gap-4'>
            <a href="mailto:cloudprogramingservice@gmail.com" target='_blank' rel="noreferrer" className="bg-gray-900 text-white py-3 px-4 rounded-full text-lg transition-colors"><MdMail /></a>
            <a href="https://zh-tw.facebook.com/cloudprogrammingonline/" target='_blank' rel="noreferrer" className="bg-gray-900 text-white py-3 px-4 rounded-full text-lg transition-colors"><BsFacebook /></a>
          </div>
        </div>
      </div>

      <div className='w-5/6 mx-auto flex flex-wrap justify-between text-center'>
        <div className='col'>
          <h3 className="py-1 text-sm mb-4 font-bold">{t('business')}</h3>
          <a href="/line"><p className="text-gray-200 mt-2 text-sm">{t('line')}</p></a>
          <a href="/search-system"><p className="text-gray-200 mt-2 text-sm">{t('search_system')}</p></a>
        </div>
        <div className='col'>
          <h3 className="py-1 text-sm mb-4 font-bold">{t('service')}</h3>
          <a href="/marketing-system"><p className="text-gray-200 mt-2 text-sm">{t('marketing_system')}</p></a>
          <a href="/xiaodi"><p className="text-gray-200 mt-2 text-sm">{t('xiaodi')}</p></a>
        </div>
        <div className='col'>
          <h3 className="py-1 text-sm mb-4 font-bold">{t('entertainment')}</h3>
          <a href="/ipickpro"><p>iPickPro</p></a>
          <a href="/galaxy-city"><p className="text-gray-200 mt-2 text-sm">{t('app_dev')}</p></a>
        </div>
        <div className='col'>
          <a href="/media-design"><h3 className="text-sm py-1 font-bold">{t('design')}</h3></a>
        </div>
        <div className='col'>
          <a href="/about"><h3 className="text-sm py-1 font-bold">{t('about')}</h3></a>
        </div>
      </div>

      <div className="mt-8 mb-2 text-lg text-white text-center">
        <small>&copy; 雲程在線 - winprocloud.com</small>
      </div>
    </footer >
  )
}

export default Footer
