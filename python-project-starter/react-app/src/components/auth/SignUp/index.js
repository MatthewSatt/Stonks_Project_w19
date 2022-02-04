import React, { useState } from 'react';
import { Modal } from '../../../Context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Get Started</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
