// import { FaArrowAltCircleRight } from "react-icons/fa";
import GetStartedModal from '../auth/SignUp';
import LoginFormModal from '../auth/Login';

import './index.css'

const Splash = () => {

    return (
        <div className='container'>
            <div className='content'>
                <h1> The Stonks </h1>
                <h3>Investing for everyone</h3>
            </div>

            <div className='buttonWrapper'>
                <LoginFormModal />
                <GetStartedModal />
                <button className='authButton'>Demo</button>
            </div>
        </div>
    );
};

export default Splash;
