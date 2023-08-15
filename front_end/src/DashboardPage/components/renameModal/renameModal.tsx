import React, { memo, useEffect, useState } from 'react';
import styles from './renameModal.module.css';
import Modal from 'react-modal';

const RenameModal = (props: any) => {
  //alert(props.modalTextInputDefaultValue)

  const [modalTextInputDefaultValue, setModalTextInputDefaultValue] =
    useState('');

  useEffect(() => {
    setModalTextInputDefaultValue('');
  }, [props.renameModalIsOpen]);

  useEffect(() => {
    //alert(props.modalTextInputDefaultValue)
    setModalTextInputDefaultValue(props.selectedItem.elementName);
  }, [props.selectedItem]);

  const selectedItem = props.selectedItem;

  //const modalTextInputDefaultValueFromProps = props.modalTextInputDefaultValue

  const renameModalIsOpen = props.renameModalIsOpen;

  //const openModal = props.openModal

  const closeRenameModal = props.closeRenameModal;

  const renameItem = props.renameItem;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal
      isOpen={renameModalIsOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeRenameModal}
      style={customStyles}
      id={styles.modal}
      contentLabel="Example Modal"
    >
      <div id={styles.topModalContainer}>
        <h1 id={styles.renameTitle}>Rename</h1>

        <button
          id={styles.closeModalButton}
          onClick={() => {
            closeRenameModal();
          }}
        >
          &times;
        </button>
      </div>

      <input
        id={styles.modalTextInput}
        onChange={e => {
          setModalTextInputDefaultValue(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            renameItem(selectedItem, modalTextInputDefaultValue);
          
          }
        }}
        autoFocus={true}
        value={modalTextInputDefaultValue}
        type="text"
        placeholder="Name"
      />

      <div id={styles.bottomModalContainer}>
        <button
          id={styles.renameButton}
          onClick={() => {
            renameItem(selectedItem, modalTextInputDefaultValue);
          }}
        >
          Rename
        </button>
        <button
          id={styles.cancelButton}
          onClick={() => {
            closeRenameModal();
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default RenameModal;
