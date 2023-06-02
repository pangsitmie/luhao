import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import StyledMenuItem from '../styles/MenuItem.styled';
import LOGOFULL from '../../assets/logo_full.png'

const Nav: React.FC = () => {
    const { t } = useTranslation();
    const [showSubmenu1, setShowSubmenu1] = useState(false);
    const [showSubmenu2, setShowSubmenu2] = useState(false);
    const [showSubmenu3, setShowSubmenu3] = useState(false);

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
                            <StyledMenuItem><Link to="/marketing-system">{t('marketing_system')}</Link></StyledMenuItem>
                            <StyledMenuItem><Link to="/xiaodi">{t('xiaodi')}</Link></StyledMenuItem>
                            <StyledMenuItem><Link to="/bearpay">Bear Pay</Link></StyledMenuItem>
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

export default Nav;
