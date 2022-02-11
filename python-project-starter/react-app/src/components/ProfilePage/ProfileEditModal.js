import React, { useState } from 'react';
import { Modal } from '../../Context/Modal';
import EditForm from './EditForm';



function EditProfile({ prop = false }) {
    const [showModal, setShowModal] = useState(prop);


    const hideButtonStyle = {
        display: 'none',
    }

    return (
        <>
            <button
                className='edit__profile__btn'
                onClick={() => setShowModal(true)}
                style={prop ? hideButtonStyle : null}
            >Edit Profile
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditForm />
                </Modal>
            )}
        </>
    );
}

export default EditProfile;
