import React, { useState } from 'react';
import { Modal } from '../../../Context/Modal';
import SignUpForm from './SignUpForm';
import '../Login/index.css'

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className='auth-button'
                onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
