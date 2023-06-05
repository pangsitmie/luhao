import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import StyledMenuItem from '../styles/MenuItem.styled';
import LOGOFULL from '../../assets/logo_full.png';
import { useMediaQuery } from 'react-responsive';


const Nav: React.FC = () => {
    const { t } = useTranslation();
    const [showSubmenu1, setShowSubmenu1] = useState(false);
    const [showSubmenu2, setShowSubmenu2] = useState(false);
    const [showSubmenu3, setShowSubmenu3] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });


    const renderDesktopMenu = () => {
        return (
            <nav className="flex justify-between items-center absolute py-8 px-20  w-[100%] z-[100000]">
                <div>
                    <Link to="/">
                        <img src={LOGOFULL} className='h-[30px] w-auto' alt="" />
                    </Link>
                </div>
                <div className="flex items-center gap-10">
                    <div className="relative group" onMouseEnter={() => setShowSubmenu1(true)} onMouseLeave={() => setShowSubmenu1(false)}>
                        <Link to="#" className="text-white inline-flex items-center">{t('business')} <FiChevronDown /></Link>
                        {showSubmenu1 && (
                            <div className="absolute left-0 space-y-2 w-[250px] bg-white bg-opacity-30 text-white p-2 rounded-xl shadow border border-white">
                                <StyledMenuItem><Link to="/line">{t('line')}</Link></StyledMenuItem>
                                <StyledMenuItem><Link to="/search-system">{t('search_system')}</Link></StyledMenuItem>
                            </div>
                        )}
                    </div>

                    <div className="relative group" onMouseEnter={() => setShowSubmenu2(true)} onMouseLeave={() => setShowSubmenu2(false)}>
                        <Link to="#" className="text-white inline-flex items-center">{t('service')} <FiChevronDown /></Link>
                        {showSubmenu2 && (
                            <div className="absolute left-0 space-y-2 w-[250px] bg-white bg-opacity-30 text-white p-2 rounded-xl shadow border border-white">
                                <StyledMenuItem><Link to="/bearpay">小熊 Pay</Link></StyledMenuItem>
                                <StyledMenuItem><Link to="/xiaodi">{t('xiaodi')}</Link></StyledMenuItem>
                            </div>
                        )}
                    </div>

                    <div className="relative group" onMouseEnter={() => setShowSubmenu3(true)} onMouseLeave={() => setShowSubmenu3(false)}>
                        <Link to="#" className="text-white inline-flex items-center">{t('entertainment')} <FiChevronDown /></Link>
                        {showSubmenu3 && (
                            <div className="absolute left-0 space-y-2 w-[250px] bg-white bg-opacity-30 text-white p-2 rounded-xl shadow border border-white">
                                <StyledMenuItem><Link to="/ipickpro">iPickPro</Link></StyledMenuItem>
                                <StyledMenuItem><Link to="/galaxy-city">{t('app_dev')}</Link></StyledMenuItem>
                            </div>
                        )}
                    </div>

                    <div>
                        <Link to="/media-design" className="text-white">{t('design')}</Link>
                    </div>

                    <div>
                        <Link to="/About" className="text-white">{t('about')}</Link>
                    </div>
                </div>
            </nav>
        );
    };

    const renderMobileMenu = () => {
        return (
            <nav className="relative">
                <div className="flex items-center justify-between p-6 bg-transparent]">
                    <div>
                        <Link to="/">
                            <img src={LOGOFULL} className='h-[30px] w-auto' alt="" />
                        </Link>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        <FiMenu />
                    </button>
                </div>
                <div className={`overflow-hidden max-h-[100vh] transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 h-auto visible' : 'opacity-0 h-0 invisible'}`}>
                    <div className="flex flex-col bg-transparent text-[#272D4D] px-4 py-10 gap-6">
                        <div className="mb-2" onClick={() => setShowSubmenu1(!showSubmenu1)}>
                            <Link to="#" className="flex items-center justify-between">{t('business')} <FiChevronDown /></Link>
                            {showSubmenu1 && (
                                <div className="mt-2">
                                    <StyledMenuItem>
                                        <Link to="/line">
                                            {t('line')}
                                        </Link>
                                    </StyledMenuItem>
                                    <StyledMenuItem><Link to="/search-system">{t('search_system')}</Link></StyledMenuItem>
                                </div>
                            )}
                        </div>
                        <div className="mb-2" onClick={() => setShowSubmenu2(!showSubmenu2)}>
                            <Link to="#" className="flex items-center justify-between">{t('service')} <FiChevronDown /></Link>
                            {showSubmenu2 && (
                                <div className="mt-2">
                                    <StyledMenuItem><Link to="/bearpay">小熊 Pay</Link></StyledMenuItem>
                                    <StyledMenuItem><Link to="/xiaodi">{t('xiaodi')}</Link></StyledMenuItem>
                                </div>
                            )}
                        </div>
                        <div className="mb-2" onClick={() => setShowSubmenu3(!showSubmenu3)}>
                            <Link to="#" className="flex items-center justify-between">{t('entertainment')} <FiChevronDown /></Link>
                            {showSubmenu3 && (
                                <div className="mt-2">
                                    <StyledMenuItem><Link to="/ipickpro">iPickPro</Link></StyledMenuItem>
                                    <StyledMenuItem><Link to="/galaxy-city">{t('app_dev')}</Link></StyledMenuItem>
                                </div>
                            )}
                        </div>
                        <div>
                            <Link to="/media-design" className="text-[#272D4D]">{t('design')}</Link>
                        </div>
                        <div>
                            <Link to="/About" className="text-[#272D4D]">{t('about')}</Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };

    return isMobile ? renderMobileMenu() : renderDesktopMenu();


};

export default Nav;
