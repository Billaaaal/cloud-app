import React, { memo, useEffect, useState } from 'react';
import styles from './newFolderModal.module.css';
import Modal from 'react-modal'
import { create } from 'domain';

const NewFolderModal = (props:any) => {


    //alert(props.modalTextInputDefaultValue)  


    const [folderNameInputText, setFolderNameInputText] = useState("");

    const newFolderModalIsOpen = props.newFolderModalIsOpen



    useEffect(() => {

      setFolderNameInputText("")

    }, [props.newFolderModalIsOpen]);

    const currentPath = props.currentPath
  

    //const modalTextInputDefaultValueFromProps = props.modalTextInputDefaultValue

  


    //const openModal = props.openModal
    
    const closeNewFolderModal = props.closeNewFolderModal



    const createNewFolder = props.createNewFolder




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
        isOpen={newFolderModalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeNewFolderModal}
        style={customStyles}
        id={styles.modal}
        contentLabel="Example Modal"
      >


          <div id={styles.topModalContainer}>


            <h1 id={styles.createNewFolderTitle}>Create new folder</h1>
          
            <button id={styles.closeModalButton} onClick={()=>{closeNewFolderModal()}}>&times;</button>


          </div>


          <input id={styles.modalTextInput} onKeyDown={(e)=>{if(e.key === "Enter"){createNewFolder(folderNameInputText)}}} onChange={(e)=>{setFolderNameInputText(e.target.value)}} autoFocus={true} value={folderNameInputText} type="text" placeholder="Name"/>


          <div id={styles.bottomModalContainer}>
        
            <button id={styles.createNewFolderButton} onClick={()=>{createNewFolder(folderNameInputText)}}>Create</button>
            <button id={styles.cancelButton} onClick={()=>{closeNewFolderModal()}}>Cancel</button>

          </div>





      </Modal>

  
      )
        
      
    }
  




export default NewFolderModal;