import React from 'react';
import { useState } from 'react';
import { FaBusinessTime, FaHouseUser, FaLightbulb, FaMicrochip, FaPlusCircle, FaSmile, FaStethoscope } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ProfileEditModal from './ProfileEditModal'
import './ProfilePage.css';



function ProfileDisplay() {
    const user = useSelector(state => state.session.user)
    const [showMore, setShowMore] = useState(false);


    const text = "All investing involves risk, including the loss of principal. No investments are FDIC insured. The Stonks Financial LLC (member SIPC), is an introducing registered broker-dealer. Your securities are custodied by our affiliate, The Stonks Securities, LLC (member SIPC), a clearing broker-dealer, which services your account by executing, clearing and settling your securities trades; preparing and distributing your account statements and trade confirmations; and extending credit to margin enabled accounts. The Stonks Crypto, LLC provides cryptocurrency custodial and trading services and is not a member of SIPC. The Stonks Financial, The Stonks Securities and The Stonks Crypto (together, 'The Stonks') are wholly-owned subsidiaries of The Stonks Markets, Inc., a publicly traded company under the ticker HOOD on the NASDAQ.Certain fundamental, market data, or other information is provided directly or indirectly by, or based on information provided by, third party data providers, which may include FactSet Research Systems, Inc. (Copyright © 2021 FactSet Research Systems Inc. All rights reserved.), Morningstar, Inc. (Copyright © 2021 Morningstar. All rights reserved.), and/or other third party providers. The Stonks does not make any warranty or guarantee relating to the accuracy, timeliness or completeness of any third-party information. Any Morningstar information (1) is proprietary to Morningstar and/or its content providers; (2) may not be copied or distributed; and (3) is not warranted to be accurate, complete or timely. Third party data providers and their content providers are not responsible for any damages or losses arising from any use of this information. Past performance is no guarantee of future results. The provision of this information does not constitute investment advice or a recommendation of any security, transaction, account type, investment strategy involving securities, or order. "

    return (
        <div className='outer__container'>
            <div className='top__container'>
                <div className='profile__pic__container'>
                    <div>
                    <img className='profile__pic' src="https://www.kindpng.com/picc/m/163-1634256_stonks-meme-transparent-hd-png-download.png"></img>
                        {/* <FaSmile className='profile__pic' /> */}
                        {/* <FaPlusCircle className='change__profile__pic' /> */}
                    </div>
                </div>
                <div className='user__info__display'>
                    <div className='username__display'>
                        <h3 onChange={e => (e.target.value)}>Welcome, {user.username}</h3>
                    </div>
                    <div className='email__display'>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className='edit__profile__container'>
                    <ProfileEditModal />
                </div>
            </div>
            <div className='mid__container'>
                <div className='owned__stock__percentage'>
                    <button>Financials 68%</button>
                </div>
                <div className='learn__more'>
                    <p>Stocks are pieces of a company that investors can own <a className='learn__stocks' target="_blank" href="https://www.investopedia.com/articles/investing/082614/how-stock-market-works.asp">Learn more</a></p>

                </div>
                <div className='stock__categories'>
                    <div className='industry__category'>
                        <a target="_blank" href="https://www.fool.com/investing/stock-market/market-sectors/"><button><FaBusinessTime className='icon' /> Financials</button></a>
                        <a target="_blank" href="https://www.fool.com/investing/stock-market/market-sectors/"><button><FaLightbulb className='icon' /> Energy</button></a>
                        <a target="_blank" href="https://www.fool.com/investing/stock-market/market-sectors/"><button><FaHouseUser className='icon' /> Real Estate</button></a>
                        <a target="_blank" href="https://www.fool.com/investing/stock-market/market-sectors/"><button><FaMicrochip className='icon' /> Technology</button></a>
                        <a target="_blank" href="https://www.fool.com/investing/stock-market/market-sectors/"><button><FaStethoscope className='icon' /> Healthcare</button></a>
                    </div>
                </div>
            </div>
            <div className='lower__container'>
                <footer className='footer__text'>
                    {showMore ? text : `${text.substring(0, 539)}`}
                    <button className='showMoreLessbtn' onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "...Show more"}</button>
                </footer>
            </div>
        </div>
    )
}

export default ProfileDisplay;



// import React, { useState } from 'react';
// import { Modal } from '../../../Context/Modal';
// import LoginForm from './LoginForm';
// import './index.css'

// function LoginFormModal({ prop = false }) {
//     const [showModal, setShowModal] = useState(prop);

//     const hideButtonStyle = {
//         display: 'none',
//     }

//     return (
//         <>
//             <button
//                 className='auth-button'
//                 onClick={() => setShowModal(true)}
//                 style={prop ? hideButtonStyle : null}
//             >
//                 Sign In
//             </button>
//             {showModal && (
//                 <Modal onClose={() => setShowModal(false)}>
//                     <LoginForm />
//                 </Modal>
//             )}
//         </>
//     );
// }
// dsaf

// export default LoginFormModal;
