import React, { useState } from 'react';
import Modal from 'react-modal';
import { db } from '../firebase';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #2B426A',
  },
};

export default function List({ getProviders, id, email }) {
  const [checked, setChecked] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleCheckbox = () => {
    setChecked(!checked);
    if (!checked) {
      openModal();
      return;
    }
    closeModal();
  };

  const confirmVerify = async () => {
    console.log(id);
    try {
      await db.collection('providers').doc(id).update({ isVerified: true });
      getProviders();
      closeModal();
    } catch {
      setError('Failed to Delete procedure');
    }
  };
  return (
    <div className="text-center  my-2 ">
      <input type="checkbox" checked={checked} onClick={handleCheckbox} />
      <label htmlFor="" className="mx-2">
        {email}
      </label>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <p className="font-black text-sm md:text-lg uppercase">
          ARE YOU SURE YOU WANT TO VERIFY?
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="uppercase confirm-btn w-24 py-1 rounded-md"
            onClick={confirmVerify}
          >
            YES
          </button>
          <button
            className="secondary-btn mx-2 text-white uppercase w-24 py-1 rounded-md"
            onClick={handleCheckbox}
          >
            cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
