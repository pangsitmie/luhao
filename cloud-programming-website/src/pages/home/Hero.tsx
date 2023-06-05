import { useTranslation } from 'react-i18next';
import { H0, H1, P } from '../../components/styles/Typography.styled';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
    const { t } = useTranslation();

    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <div className={`text-center h-full relative z-0 px-[15%] ${isMobile ? 'pt-24' : 'py-36'}`}>

            <div className='z-1'>
                <H0 >{t('home_hero_title')}</H0>
                <H1>{t('home_hero_desc')}</H1>

                <P className='my-12 text-[#272D4D]'>
                    {t('home_hero_description')}
                </P>
            </div>
        </div>

    )
}

export default Hero
