import BEARPAY_BACKGROUND from '../../assets/bearpay_background.png'
import BEARPAY_BACKGROUND1 from '../../assets/bearpay_background1.png'
import BEARPAY_BACKGROUND2 from '../../assets/bearpay_background2.png'
import BEARPAY_MOCK1 from '../../assets/bearpay_mock1.png'
import BEARPAY_MOCK2 from '../../assets/bearpay_mock2.png'
import { StyledButtonStroke } from '../../components/styles/ButtonStroke.styled'
import BEARPAY_ICON1 from '../../assets/bearpay_icon1.png'
import BEARPAY_ICON2 from '../../assets/bearpay_icon2.svg'
import BEARPAY_ICON3 from '../../assets/bearpay_icon3.svg'
import { H0, H1, H2, H3, P } from '../../components/styles/Typography.styled'
import { StyledButtonFill } from '../../components/styles/ButtonFill.styled'
import BEARPAY_ITEMS from '../../assets/bearpay_items.png'
import { IconButtonStyled } from '../../components/styles/IconButton.styled'
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai'
import QUESTION_ICON from '../../assets/question_icon.jpg'
import BEARPAY_PRE_FOOTER from '../../assets/bearpay_pre_footer.png'

type Props = {}

const BearPay = (props: Props) => {

    return (
        <div>

            {/* HERO */}
            <div
                className="h-[95vh] flex items-center justify-center pl-[8%] gap-6 "
                style={{
                    backgroundImage: `url(${BEARPAY_BACKGROUND1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom', // Updated background position
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className=''>
                    <H1 className='mb-4 text-white'>娃娃機的未來</H1>
                    <P className='text-white w-[80%]'>告別傳統投幣，讓我們以「Bear Pay」的創新方式體驗抓娃娃機。</P>
                    <StyledButtonStroke
                        className='mt-10'>
                        立即下載
                    </StyledButtonStroke>
                </div>
                <div className=''>
                    <div className='h-[50vh]'></div>
                    <img src={BEARPAY_MOCK1} alt="Bear Pay" className='w-full' />
                </div>
            </div>

            {/* SECTION 1 */}
            <div className="items-center justify-center pt-64 pb-52 px-[8%] ">
                <div>
                    <P className='text-[#9485FB]'>最簡單、最快速的遊玩方式</P>
                    <H2>好處與特點</H2>
                </div>

                <div className='grid grid-cols-3 gap-10 justify-center mt-16'>
                    <div className='flex flex-col gap-4 p-4 '>
                        <img src={BEARPAY_ICON1} alt="" className='w-16' />
                        <H3>即時手機支付</H3>

                        <P>
                            告別對硬幣的翻找或找零的困擾。我們的革命性手機支付解決方案讓您只需在智能手機上輕點幾下，就能無縫支付您的抓娃娃機遊戲。不再有麻煩，只有純粹的便利。
                        </P>
                    </div>
                    <div className='flex flex-col gap-4 p-4'>
                        <img src={BEARPAY_ICON2} alt="" className='w-16' />

                        <H3>個性化的遊戲體驗</H3>

                        <P>
                            透過我們最新的應用程式，您將享有前所未有的個性化遊戲體驗。追蹤您的進度，查看您的遊戲歷史，並在成為抓娃娃機冠軍的過程中解鎖成就。我們的應用程式讓您保持參與，激勵您繼續遊玩並贏得勝利。
                        </P>

                    </div>
                    <div className='flex flex-col gap-4 p-4'>
                        <img src={BEARPAY_ICON3} alt="" className='w-16' />

                        <H3>精彩獎勵和紅利</H3>

                        <P>
                            作為我們珍貴的玩家，我們樂於為您的技巧和忠誠提供獎勵。我們的應用程式提供獨家獎勵和紅利，增強您的抓娃娃機體驗。賺取忠誠度點數，解鎖特殊折扣，並接收精彩優惠，讓每次遊玩都更加有益。
                        </P>
                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div className=" flex items-center justify-center pl-[45vh] pr-[30vh] h-[100vh] gap-[8vh] mb-10"
                style={{
                    backgroundImage: `url(${BEARPAY_BACKGROUND2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center', // Updated background position
                }}
            >
                <img src={BEARPAY_MOCK2} alt="Bear Pay" className='h-[500px]' />
                <div>
                    <P className='text-[#9485FB]'>釋放我們應用程式的力量</P>
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
                        className='mt-6'>
                        立即下載
                    </StyledButtonFill>
                </div>
            </div>

            {/* section 3 */}
            <div className='py-20'>
                <div className='flex flex-col items-center mb-10 justify-center'>
                    <P className='mb-2 text-[#9485FB]'>每天的新獎勵</P>
                    <H2 className='mb-6 text-center'>
                        方便的遊玩和保持
                        <span>最新的訊息</span>
                        {/* <br />
                        Play and <span>Stay Updated</span> */}
                    </H2>
                </div>
                <div>
                    <img src={BEARPAY_ITEMS} alt="" />
                </div>
                <div className='flex items-center justify-center px-24 mt-20 gap-10'>
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
            <div className='grid grid-cols-2 py-40'>
                <div className='bg-[#FFF6EF] flex flex-col  px-[20%] py-24'>
                    <div className='mb-10'>
                        <img src={QUESTION_ICON} alt="" className='w-52' />
                    </div>

                    <span className='text-[#FFA45A]'>有問題嗎？</span>
                    <H2 className='mb-4'>
                        我們擁有您所需的 <br />
                        <span className='text-[#FFA45A]'>所有答案</span>
                    </H2>
                    <P>以下是一些常見問題，可能對您有所幫助。</P>
                </div>
                <div className='px-20 flex flex-col gap-4'>
                    <H2 className='mb-10'>
                        常見問題
                    </H2>

                    <div className='border rounded-lg border-[#FFA45A] p-8'>
                        <H3 className='mb-4'>如何處理付款？</H3>
                        <P>
                            只需下載我們的應用程式，連結您偏好的支付方式，然後選擇您想要的機台。只需輕點幾下即可付款，無需使用硬幣。盡情享受無麻煩的抓娃娃機樂趣！                        </P>
                    </div>

                    <div className='border rounded-lg border-[#FFA45A] p-8'>
                        <H3 className='mb-4'>
                            我能追蹤我的進度和交易嗎？
                        </H3>
                        <P>
                            透過我們的應用程式，輕鬆追蹤您的進度和獲勝紀錄！只需進入您的個人檔案部分，您將找到完整的遊戲歷史紀錄。其中包括遊玩的次數、勝利次數、最高分數等等。
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
                <div className='mr-40'>
                    <H1>
                        <span>現在加入</span>，
                        <br /> 並獲得免費新客獎勵！
                    </H1>
                    <StyledButtonFill
                        className='mt-6'>
                        立即下載
                    </StyledButtonFill>
                </div>
            </div>
        </div>
    )
}
export default BearPay