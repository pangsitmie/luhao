import BEARPAY_BACKGROUND1 from '../../assets/bearpay_background1.png'
import BEARPAY_BACKGROUND2 from '../../assets/bearpay_background2.png'
import BEARPAY_MOCK1 from '../../assets/bearpay_mock1.png'
import BEARPAY_MOCK2 from '../../assets/bearpay_mock2.png'
import { StyledButtonStroke } from '../../components/styles/ButtonStroke.styled'
import BEARPAY_ICON1 from '../../assets/bearpay_icon1.png'
import BEARPAY_ICON2 from '../../assets/bearpay_icon2.svg'
import BEARPAY_ICON3 from '../../assets/bearpay_icon3.svg'
import { H1, H2, H3, P } from '../../components/styles/Typography.styled'
import { StyledButtonFill } from '../../components/styles/ButtonFill.styled'
import BEARPAY_ITEMS from '../../assets/bearpay_items.png'
import { IconButtonStyled } from '../../components/styles/IconButton.styled'
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai'
import QUESTION_ICON from '../../assets/question_icon.jpg'
import BEARPAY_PRE_FOOTER from '../../assets/bearpay_pre_footer.png'
import { useMediaQuery } from 'react-responsive';
import BearPayItems from './BearPayItems'


const BearPay = () => {

    const isMobile = useMediaQuery({ maxWidth: 767 });

    //detect if mobile is android or ios
    const handleDownload = () => {
        const userAgent = navigator.userAgent;

        // Check if the user is accessing the website from a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

        // Determine the appropriate store URL based on the mobile device platform
        const storeURL = isMobile && /iPhone|iPad|iPod/i.test(userAgent)
            ? 'https://apps.apple.com/tw/app/%E5%B0%8F%E7%86%8A-pay/id1665519760'
            : 'https://play.google.com/store/apps/details?id=com.cloudprogramming.OnlineMarketingSystem';

        console.log(storeURL);
        // Redirect the user to the store URL
        window.location.href = storeURL;
    };

    return (
        <div >
            {/* HERO */}
            <div
                className={`flex justify-between gap-10 ${isMobile ? 'flex-col pt-32 pb-8' : 'pl-[15vh] h-[95vh] items-center'}`}
                style={{
                    backgroundImage: `url(${BEARPAY_BACKGROUND1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom', // Updated background position
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className={`${isMobile ? 'p-6' : ''}`}>
                    <H1 className='mb-4 text-white'>娃娃機的未來</H1>
                    <P className='text-white'>
                        告別傳統投幣，讓我們以「Bear Pay」體驗夾娃娃機。
                    </P>

                    <StyledButtonStroke
                        onClick={handleDownload}
                        className='mt-10'
                    >
                        立即下載
                    </StyledButtonStroke>
                </div>
                <div className={''}>
                    {!isMobile && (
                        <div className='h-[40vh]'></div>
                    )}
                    <img src={BEARPAY_MOCK1} alt="Bear Pay" className={`${isMobile ? '' : ''}`} />
                </div>
            </div>

            {/* SECTION 1*/}
            <div className={`items-center justify-center pb-52 px-[8vw] ${isMobile ? 'pt-16' : 'pt-52'}`}>
                <div>
                    <P className='text-[#FCC945]'>最簡單、最快速的遊玩方式</P>
                    <H2>優勢與特點</H2>
                </div>

                <div className={`grid  gap-10 justify-center mt-16 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    <div className='flex flex-col gap-4 '>
                        <img src={BEARPAY_ICON1} alt="" className='w-16' />
                        <H3>即時手機支付</H3>

                        <P>
                            解決找零的困擾。手機支付讓您只需在智慧型手機上輕點幾下，就能輕鬆支付遊玩娃娃機。省下麻煩，更加便利。
                        </P>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <img src={BEARPAY_ICON2} alt="" className='w-16' />
                        <H3>客製化的遊戲體驗</H3>

                        <P>
                            透過Bear pay ，您可以體驗前所未有的客製化遊戲。追蹤您的進度，查看您的遊玩歷史，並在成為夾娃娃冠軍的過程中解鎖成就。我們的應用程式讓您擁有參與感，激勵您繼續遊玩並贏得勝利。
                        </P>

                    </div>
                    <div className='flex flex-col gap-4'>
                        <img src={BEARPAY_ICON3} alt="" className='w-16' />

                        <H3>精彩獎勵和紅利</H3>

                        <P>
                            作為我們珍貴的玩家，我們樂於為您的技巧和黏著度提供獎勵。我們提供獨家獎勵和紅利，增強您的夾娃娃機體驗。賺取點數，解鎖特殊折扣，並獲收划算優惠，讓每次遊玩都更加有益。
                        </P>
                    </div>
                </div>
            </div>



            {/* SECTION 2 DESKTOP */}
            {!isMobile && (
                <div className=" flex items-center justify-center pl-[45vh] pr-[30vh] h-[100vh] gap-[8vh] mb-10"
                    style={{
                        backgroundImage: `url(${BEARPAY_BACKGROUND2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center', // Updated background position
                    }}
                >
                    <img src={BEARPAY_MOCK2} alt="Bear Pay" className='h-[500px]' />
                    <div>
                        <P className='text-[#FCC945]'>釋放我們應用程式的力量</P>
                        <H2
                            className='mb-6'>
                            進入無窮可能的
                            <br />
                            精彩世界
                        </H2>
                        <P>
                            小熊 Pay 是通往愉快、便利和無窮可能的大門。讓我們先來一探究竟您即將會遇到的
                        </P>
                        <StyledButtonFill
                            onClick={handleDownload}
                            className='mt-10'
                        >
                            立即下載
                        </StyledButtonFill>
                    </div>
                </div>
            )}

            {/* SECTION 2 MOBILE */}
            {isMobile && (
                <div className='px-[8vw]'>
                    <div >
                        <img src={BEARPAY_MOCK2} alt="" />
                    </div>
                    <div className='mt-12'>
                        <P className='text-[#FCC945]'>釋放我們應用程式的力量</P>
                        <H2
                            className='mb-6'>
                            進入無窮可能的
                            <br />
                            精彩世界
                        </H2>
                        <P>
                            小熊 Pay 是通往興奮、便利和無窮可能的大門。讓我們先來一探究竟您即將會遇見的：
                        </P>
                        <StyledButtonFill
                            onClick={handleDownload}
                            className='mt-6'>
                            立即下載
                        </StyledButtonFill>
                    </div>
                </div>
            )}

            {/* section 3 */}
            <div className='py-20 '>
                {isMobile && (
                    <div className='grid place-content-center pb-10'>
                        <div className="w-[2px] h-[30vh] bg-gradient-to-b from-transparent rounded-full via-transparent to-[#FFA45A]"></div>
                    </div>
                )}
                <div className='flex flex-col items-center mb-10 justify-center px-[8vw]'>
                    <P className='mb-2 text-[#FCC945]'>每天的新獎勵</P>
                    <H2 className='mb-6 text-center'>
                        便捷的遊玩以及不錯過任何
                        <span>最新的訊息</span>
                        {/* <br />
                        Play and <span>Stay Updated</span> */}
                    </H2>
                </div>

                {/* desktop */}
                {!isMobile && (
                    <div>
                        <img src={BEARPAY_ITEMS} alt="" />
                    </div>
                )}

                {/* mobile */}
                {isMobile && (
                    <div className='flex flex-col gap-4 px-[8vw]'>
                        <BearPayItems
                            text={"生日禮物"}
                        />
                        <BearPayItems
                            text={"贏得勝利，稱霸排行榜"}
                        />
                        <BearPayItems
                            text={"追蹤熱門品牌並領取獎勵"}
                        />
                        <BearPayItems
                            text={"客製化推薦"}
                        />
                        <BearPayItems
                            text={"使用線上免費幣"}
                        />
                        <BearPayItems
                            text={"在實體店面儲值"}
                        />
                        <BearPayItems
                            text={"用Qr Code或是感應NFC支付"}
                        />
                    </div>
                )}


                <div className={`flex items-center justify-center mt-20 gap-8 ${isMobile ? 'flex-col text-center' : 'px-24'}`}>
                    <small>
                        以及更多供您在所有通信渠道中分享的內容。
                        <br />
                        <span className='text-[#272D4D] font-bold'>請關注我們的</span>
                    </small>
                    <div>
                        <IconButtonStyled className='ml-4 bg-[#FFF6EF]'>
                            <AiOutlineInstagram style={{ color: '#FFA45A' }} />
                        </IconButtonStyled>
                        <IconButtonStyled className='ml-4 bg-[#FFF6EF]'>
                            <AiOutlineTwitter style={{ color: '#FFA45A' }} />
                        </IconButtonStyled>
                        <IconButtonStyled className='ml-4 bg-[#FFF6EF]'>
                            <AiOutlineFacebook style={{ color: '#FFA45A' }} />
                        </IconButtonStyled>
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <div className={`grid  py-40 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <div className='bg-[#FFF6EF] flex flex-col px-[8vw] py-24'>
                    <div className='mb-10'>
                        <img src={QUESTION_ICON} alt="" className='w-1/2' />
                    </div>

                    <span className='text-[#FFA45A]'>有問題嗎？</span>
                    <H2 className='mb-4'>
                        我們擁有您所需的 <br />
                        <span className='text-[#FFA45A]'>所有答案</span>
                    </H2>
                    <P>以下是一些常見問題，可能對您有所幫助。</P>
                </div>
                <div className='px-[10vw] py-12 flex flex-col gap-4'>
                    <H2 className='mb-10'>
                        常見問題
                    </H2>

                    <div className='border rounded-lg border-[#FFA45A] p-8'>
                        <H3 className='mb-4'>如何察看獲得的獎勵?</H3>
                        <P>
                            首頁 - 通知 - 獎勵通知 - 點選有紅點的獎勵
                        </P>
                    </div>

                    <div className='border rounded-lg border-[#FFA45A] p-8'>
                        <H3 className='mb-4'>
                            哪裡可以使用這個APP?
                        </H3>
                        <P>
                            全台灣任何機台上有貼小熊pay貼紙的皆可使用，貼紙上都有載點以及簡易操作
                        </P>
                    </div>
                </div>
            </div>

            {/* section 5 */}
            <div className=" flex items-center justify-center mb-52"
                style={{
                    backgroundImage: `url(${BEARPAY_PRE_FOOTER})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', // Updated background position
                }}
            >
                <div className={`${isMobile ? 'text-center' : ''}`}>
                    <H1>
                        <span>現在加入</span>
                        <br />並獲得新客獎勵
                    </H1>
                    <StyledButtonFill
                        onClick={handleDownload}
                        className='mt-6'>
                        立即下載
                    </StyledButtonFill>
                </div>
            </div>
        </div>
    )
}
export default BearPay