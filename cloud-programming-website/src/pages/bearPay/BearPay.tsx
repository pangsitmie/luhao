import BEARPAY_BACKGROUND from '../../assets/bearpay_background.png'
import BEARPAY_MOCK1 from '../../assets/bearpay_mock1.png'
import { StyledButtonStroke } from '../../components/styles/ButtonStroke.styled'
import { H1 } from '../../components/styles/H1.styled'
import { H2 } from '../../components/styles/H2.styled'
import { H3 } from '../../components/styles/H3.styled'
import { H4 } from '../../components/styles/H4.styled'
import { P } from '../../components/styles/P.styled'



type Props = {}

const BearPay = (props: Props) => {

    return (
        <div>

            {/* HERO */}
            <div
                className="h-screen flex items-center justify-center pl-[10%] gap-10"
                style={{
                    backgroundImage: `url(${BEARPAY_BACKGROUND})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className='pr-20'>
                    <H1 className='mb-4 text-white'> The Future of <br /> Claw Machines</H1>
                    <P className='text-white'>Say goodbye to traditional coins, meet the new inovative way to play with Bear Pay</P>
                    <StyledButtonStroke
                        className='mt-10'>
                        Download Now
                    </StyledButtonStroke>
                </div>
                <div>
                    <img src={BEARPAY_MOCK1} alt="" />
                </div>
            </div>

            {/* SECTION 1 */}
            <div className="items-center justify-center py-52 px-[8%] ">
                <div>
                    <H4 className='text-[#9485FB]'>The easiest and fastest way to play</H4>
                    <H2>Benefits and Features</H2>
                </div>

                <div className='flex gap-10 justify-center mt-20'>
                    <div className='flex flex-col gap-4 p-4 border-2 border-slate-500'>
                        <H3>Instant Mobile Payments</H3>

                        <P>Say goodbye to fumbling for coins or searching for change.
                            Our revolutionary mobile payment solution allows you to seamlessly pay
                            for your claw machine games with just a few taps on your smartphone. No more hassle, just pure convenience
                        </P>

                    </div>
                    <div className='flex flex-col gap-4 p-4'>
                        <H3>Personalized Gaming Experience</H3>

                        <P>
                            With our cutting-edge app, you'll have access to a personalized gameplay experience like never before.
                            Track your progress, view your gameplay history, and unlock achievements as you become a claw machine champion.
                            Our app keeps you engaged and motivated to keep playing and winning
                        </P>

                    </div>
                    <div className='flex flex-col gap-4 p-4'>
                        <H3>Exciting Rewards and Bonuses</H3>

                        <P>
                            As a valued player, we love to reward you for your skills and loyalty.
                            Our app offers exclusive rewards and bonuses that enhance your claw machine experience.
                            Earn loyalty points, unlock special discounts, and receive exciting offers that make every play session even more rewarding.
                        </P>

                    </div>
                </div>
            </div>

            {/* section 2 */}
            <div>
                asdf
            </div>

        </div>
    )
}
export default BearPay