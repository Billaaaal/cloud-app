import React from 'react';
import styles from './recentFilesButton.module.css';
//const SidePannelButton = (props: { icon:String ; text: String; }) => {
import pdfIcon from '../../assets/pdf_icon.svg';
import { Dropdown, Menu } from 'antd';

const RecentFilesButton = (props: any) => {
  const thumbnail =
    'https://media.istockphoto.com/id/1364253812/fr/vid%C3%A9o/vue-a%C3%A9rienne-a%C3%A9rienne-de-haut-en-bas-des-rues-traversant-lavenue-grands-immeubles.jpg?s=640x640&k=20&c=IdCFC99VGGhCKlG8U8Tm910cqjSeXmNUuPrKfEzRBrE=';

  var fileTypeIcongBg: string;
  var fileTypeIconTextBg: string;

  var item = props.itemObject;

  switch (item.type) {
    case 'pdf':
      fileTypeIcongBg = '#ffeddf';
      fileTypeIconTextBg = '#f6b375';
      break;
    case 'docx':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#fff';
      break;
    case 'jpg':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#fff';

      break;
    case 'jpeg':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#fff';

      break;
    case 'png':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#fff';

      break;
    case 'gif':
      fileTypeIcongBg = '#f8e3ff';
      fileTypeIconTextBg = '#c66fe5';
      break;
    case 'mp4':
      fileTypeIcongBg = '#f8e3ff';
      fileTypeIconTextBg = '#c66fe5';

      break;
    case 'mp3':
      fileTypeIcongBg = '#f8e3ff';
      fileTypeIconTextBg = '#c66fe5';

      break;
    default:
      fileTypeIcongBg = '#f8e3ff';
      fileTypeIconTextBg = '#fff';

      break;
  }

  const dropDownMenuOptions = props.dropDownMenuOptions;

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{
        items: dropDownMenuOptions(item),
      }}
    >
      <div className={styles.recentFilesButton} title={item.elementName}>
        <img className={styles.thumbnail} src={thumbnail}></img>

        <div className={styles.detailsContainer}>
          <div
            className={styles.fileTypeIcon}
            style={{
              backgroundColor: fileTypeIcongBg,
              color: fileTypeIconTextBg,
            }}
          >
            {item.type.toUpperCase().slice(0, 9)}
          </div>

          <h1 className={styles.fileNameText}>{item.elementName}</h1>
        </div>
      </div>
    </Dropdown>
  );
};

export default RecentFilesButton;
