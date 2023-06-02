import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    const { ref: visibleRef, inView: elementIsVisible } = useInView();
    return (
        <div className="text-center h-full relative px-36 py-36">
            <h1 className='text-7xl font-bold mb-[-1rem]'>{t('home_hero_title')}</h1>
            <h2 className='text-5xl'>{t('home_hero_desc')}</h2>

            <h3 className='text-lg mx-8 my-16 tracking-wider px-40 text-gray-300'>
                {t('home_hero_description')}
            </h3>

            <a href='mailto:cloudprogramingservice@gmail.com'>
                <button className={`btn btn-fill-white glow-on-hover hidden ${elementIsVisible ? 'show' : ''}`} ref={visibleRef}>
                    {t('contact_us')}
                </button>
            </a>
        </div>
    )
}

export default Hero
