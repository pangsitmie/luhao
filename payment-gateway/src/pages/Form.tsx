import { useState } from 'react';

const NewbPayForm = () => {
    const [merchantID, setMerchantID] = useState("");
    const [tradeInfo, setTradeInfo] = useState("");
    const [tradeSha, setTradeSha] = useState("");
    const [version, setVersion] = useState("");

    return (
        <form
            method="POST"
            action="https://ccore.newebpay.com/MPG/mpg_gateway"
        >
            <div>
                <input type="text" name="MerchantID" value={merchantID} onChange={(e) => setMerchantID(e.target.value)} />
            </div>
            <div>
                <input type="text" name="TradeInfo" value={tradeInfo} onChange={(e) => setTradeInfo(e.target.value)} />
            </div>
            <div>
                <input type="text" name="TradeSha" value={tradeSha} onChange={(e) => setTradeSha(e.target.value)} />
            </div>
            <div>
                <input type="text" name="Version" value={version} onChange={(e) => setVersion(e.target.value)} />
            </div>

            {/* Additional form fields or UI elements */}
            {/* ... */}

            <button type="submit">Submit</button>
        </form>
    );
};

export default NewbPayForm;
