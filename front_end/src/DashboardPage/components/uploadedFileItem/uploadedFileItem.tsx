import React, { memo, useEffect, useState } from 'react';
import styles from './uploadedFileItem.module.css';
//const SidePannelButton = (props: { icon:String ; text: String; }) => {

const UploadedFileItem = (props: any) => {
  const file = props.object;

  var fileType = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();

  var fileTypeIcongBg: string;
  var fileTypeIconTextBg: string;
  const [fileSizeProgressText, setFileSizeProgressText] = useState('');

  switch (fileType) {
    case 'pdf':
      fileTypeIcongBg = '#ffeddf';
      fileTypeIconTextBg = '#f6b375';
      break;
    case 'docx':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#656be0;';
      break;
    case 'jpg':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#656be0;';

      break;
    case 'jpeg':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#656be0;';

      break;
    case 'png':
      fileTypeIcongBg = '#fca7a7';
      fileTypeIconTextBg = '#656be0;';

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
      fileTypeIconTextBg = '#c66fe5';

      break;
  }

  function convertSize(sizeToConvert: number) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB'],
      bytes = sizeToConvert,
      i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
      bytes /= 1024;
    }

    return bytes.toFixed(1) + units[i];
  }

  const progress = file.progress;

  console.log('Logging progress from the item itself' + progress);

  //const [progress, setProgress] = useState(0);

  //useEffect(() => {
  // Function to update progress at regular intervals
  //  const updateProgress = () => {
  //    if (progress < 100) {
  // Increase progress by 0.5 every 50ms
  //      setProgress(prevProgress => prevProgress + 0.5);
  //      setFileSizeProgressText(
  //        `${convertSize(file.size * (progress / 100))} of ${convertSize(
  //          file.size,
  //        )}`,
  //      );
  //    }
  //     if (progress == 100) {
  //      setFileSizeProgressText(`${convertSize(file.size)}`);
  //    }
  //  };

  // Start updating progress after 50ms and repeat every 50ms
  //  const progressInterval = setInterval(updateProgress, 12.5);

  // Clear interval after 3.5 seconds (3500ms)
  //  setTimeout(() => {
  //    clearInterval(progressInterval);
  //  }, 3500);

  // Clean up the interval on component unmount
  //  return () => {
  //    clearInterval(progressInterval);
  //  };
  //}, [progress]);

  return (
    <div className={styles.uploadedFileContainer}>
      <div
        className={styles.uploadedFileIcon}
        style={{ backgroundColor: fileTypeIcongBg, color: fileTypeIconTextBg }}
      >
        <h1 className={styles.fileTypeIconText}>{fileType.toUpperCase()}</h1>
      </div>

      <div className={styles.uploadedFileDetailsContainer}>
        <h1 className={styles.uploadedFileNameText}>{file.name}</h1>

        <div className={styles.uploadedFileProgressBarContainer}>
          <div
            style={{ width: `${progress * 100}%` }}
            className={styles.uploadedFileProgressBar}
          ></div>
        </div>

        <div className={styles.uploadedFileProgressTextContainer}>
          <h1 className={styles.uploadedFileSizeProgressText}>
            {fileSizeProgressText}
          </h1>
          <h1 className={styles.uploadedFileSizeProgressPercentageText}>
            {Math.floor(progress * 100)}%
          </h1>
        </div>
      </div>
    </div>
  );
};

export default memo(UploadedFileItem);
