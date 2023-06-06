import CHECK_CIRCLE from '../../assets/check_circle.png'
import { P } from '../../components/styles/Typography.styled'

type Props = {
    text: string
}

const BearPayItems = ({ text }: Props) => {
    return (
        <div className="bg-[#F2F0FE] rounded-lg py-3 px-4 flex gap-4 items-center">
            <div className="w-8 h-8 flex-shrink-0">
                <img src={CHECK_CIRCLE} alt="" className='w-full h-full' />
            </div>
            <div>
                <P>
                    {text}
                </P>
            </div>

        </div>
    )
}
export default BearPayItems