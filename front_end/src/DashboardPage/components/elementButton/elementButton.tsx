//import React from 'react';
import styles from './elementButton.module.css';
import folderIcon from '../../assets/documents.svg';
import {
  Dropdown,
  //  Menu
} from 'antd';
import { useNavigate } from 'react-router-dom';
import convertSize from '../../methods/convertSize';
//const SidePannelButton = (props: { icon:String ; text: String; }) => {

const ElementButton = (props: any) => {
  //check if the elementName has a file extension if not then it is a folder

  var item = props.itemObject;

  //console.log("Handling element "+ item.elementName +" " + item.type)

  const isAFile = item.type === 'folder' ? false : true;

  var fileTypeIcongBg: string;
  var fileTypeIconTextBg: string;

  const dropDownMenuOptions = props.dropDownMenuOptions;

  const navigate = useNavigate();

  const path = item.path;

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

  const dt_object = new Date(item.date);

  const formatted_date = dt_object
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    .split(' ')
    .join(', ');

  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={{
        items: dropDownMenuOptions(item),
      }}
    >
      <div
        className={styles.elementButton}
        onClick={
          isAFile
            ? () => {
                // console.log('Clicked on ' + item.elementName);
              }
            : () => {
                navigate('/dashboard' + path);
              }
        }
      >
        {isAFile ? (
          <div
            className={styles.fileTypeIcon}
            style={{
              backgroundColor: fileTypeIcongBg,
              color: fileTypeIconTextBg,
            }}
          >
            {item.type.toUpperCase()}
          </div>
        ) : (
          <img className={styles.folderIcon} src={folderIcon}></img>
        )}

        <h1 className={styles.elementName}>{item.elementName}</h1>
        <h1
          className={styles.date}
          title={dt_object.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        >
          {formatted_date}
        </h1>
        <h1 className={styles.size}>{isAFile ? convertSize(item.size) : ''}</h1>
      </div>
    </Dropdown>
  );
};

export default ElementButton;
