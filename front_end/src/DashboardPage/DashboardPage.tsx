import React, { useEffect, useRef } from 'react';
//import css
import styles from './DashboardPage.module.css';
import search from './assets/search.svg';
import filterIcon from './assets/filter_icon.svg';
import logOutIcon from './assets/logOutIcon.svg';
import SidePannelButton from './components/sidePannelButton/sidepannelButton';
import SideButtonsList from './SideButtonsList';
import ScrollContainer from 'react-indiana-drag-scroll';
import RecentFilesButton from './components/recentFilesButton/recentFilesButton';
import ElementButton from './components/elementButton/elementButton';
//import folderIcon from './assets/folder.svg'
//import { Dropdown, Menu } from 'antd';
//import type { MenuProps } from 'antd';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import DragDropSuccessfullAnimation from './components/dragDropSuccessfullAnimation/dragDropSuccessfullAnimation';
import UploadedFileItem from './components/uploadedFileItem/uploadedFileItem';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';
//haha
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import RenameModal from './components/renameModal/renameModal';
import addIcon from './assets/addIcon.svg';
import NewFolderModal from './components/newFolderModal/newFolderModal';
import {
  child,
  equalTo,
  get,
  getDatabase,
  off,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import { Dropdown } from 'antd';
import axios from 'axios';

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyC0WzN8b1WZ1BKvYObM_bEOEA7h0NiHmEU',

    authDomain: 'cloudapp-b1e10.firebaseapp.com',

    databaseURL:
      'https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app',

    projectId: 'cloudapp-b1e10',

    storageBucket: 'cloudapp-b1e10.appspot.com',

    messagingSenderId: '306526058417',

    appId: '1:306526058417:web:ca2a5ec2035ec1b6806f90',

    measurementId: 'G-G600B1ZV35',
  };

  //const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
  const auth = getAuth();

  const navigate = useNavigate();

  function signOutFromFirebase() {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/login');
    });
  }

  //alert("Listening even from the dashboard")

  const [currentUserEmail, setCurrentUserEmail] = useState<String | null>('');

  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any | null>('');

  //console.log(location.pathname)

  //const [currentPath, setCurrentPath] = useState("")

  //console.log("The current uri is : '"+location.pathname+ "'")

  //useEffect(() => {

  //if (location.pathname === '/dashboard'){

  //  navigate('/dashboard/My Files/')

  //}else{
  //setCurrentPath(location.pathname.split('/dashboard').join('').split('%20').join(' '))
  //console.log("The URI has changed to : " + location.pathname)

  //}

  //if(location.pathname==='/dashboard'){

  // alert("You are in the root folder")

  //   setCurrentPath("/My Files/")

  // }

  //setCurrentPath(location.pathname.split('/dashboard').join(''))

  //}, [location.pathname])

  //useEffect(() => {

  //navigate("/dashboard" + currentPath)

  //}, [currentPath])

  const [currentIdToken, setCurrentIdToken] = useState('');

  const [newFolderModalIsOpen, setNewFolderModalIsOpen] = useState(false);

  useEffect(() => {
    //console.log("This is supposed to run once")

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        //alert(user.email)
        setCurrentUserEmail(user.email);

        navigate('/dashboard/My Files');
        //console.log("The URI issssss " + location.pathname)

        //if(location.pathname.split('/').join('') === "dashboard"){
        //if(location.pathname === '/dashboard/'){
        //  navigate("/dashboard/My Files/")
        //}

        user
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            //alert(idToken)

            //listenToDatabaseChanges()

            setCurrentIdToken(idToken);
          })
          .catch(function (error) {
            // Handle error
          });

        //alert(uid)
        //then navigate to the dashboard
        // ...a
        //console.log("You are signed in")
      } else {
        // User is signed out
        // ...

        //alert("You are not signed in")
        navigate('/login');
      }
    });

    return () => {
      unsubscribe();

      // Clean up side effects or subscriptions here when the component unmounts
    };
  }, []);

  function getFileExtension(filename: string) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return filename; // No file extension found
    }
    return filename.slice(lastDotIndex + 1);
  }

  function extractFromMyFiles(inputString: string) {
    const startIndex = inputString.indexOf('/My Files');
    if (startIndex !== -1) {
      const extractedText = inputString.substring(startIndex);
      return extractedText;
    } else {
      return '';
    }
  }

  useEffect(() => {
    //var pathToListen:string

    //if(currentPath === '/My Files/' || currentPath === '/My Files'){

    //  pathToListen = "users/" + auth.currentUser?.uid + "/My Files/"
    //console.log("Listening to nicely " + pathToListen)

    //}else{

    //  pathToListen = "users/" + auth.currentUser?.uid + currentPath

    //}

    if (auth.currentUser === null) {
      navigate('/dashboard');
    }

    console.log('The user is ');
    console.log(auth.currentUser);

    //var pathToListen = "users/" + auth.currentUser?.uid + decodeURI(location.pathname.replace('dashboard/My Files', '/'))

    //var pathToListen = decodeURI(location.pathname)

    if (
      decodeURI(location.pathname) === '/dashboard/My Files' ||
      decodeURI(location.pathname) === '/dashboard/My Files/'
    ) {
      var pathToListen = 'users/' + auth.currentUser?.uid + '/My Files';

      //      pathToListen = "users/" + auth.currentUser?.uid + "/My Files/"
      console.log("Condition met, you're at the root folder");
    } else {
      var pathToListen =
        'users/' +
        auth.currentUser?.uid +
        decodeURI(location.pathname.replace('dashboard/', ''));
      console.log("Condition not met, you're elsewhere");
    }

    const db = getDatabase();

    const tasksRef = ref(db, pathToListen);

    const queryRef = query(tasksRef);

    console.log("Let's listen to " + pathToListen);

    if (auth.currentUser) {
      //    console.log("Listening to " + pathToListen)

      //if (currentPath === "" || auth.currentUser === null || !location.pathname.includes('My App')){
      //console.log("Not listening to DB because the path is empty and the uid is not defined")
      //navigate("/dashboard")
      //  navigate("/dashboard/My Files/")

      //}
      //else{
      //console.log("Attempting to listen to " +  pathToListen)

      //console.log("Listening in zeee db in " + pathToListen)

      //  console.log("Listening to " + "users/" + auth.currentUser?.uid + currentPath)

      onValue(queryRef, snapshot => {
        //      console.log("There have been changes inside " + "users/" + auth.currentUser?.uid + currentPath)

        
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Tell the data i'm coming");
          console.log(data);

          setAllItemsList([]);
          for (const key in data) {
            if (
              Object.hasOwnProperty.call(data, key) &&
              typeof data[key] === 'object'
            ) {
              const item = data[key];
              // Extracting the desired properties
              const name = item.name;
              const date = item.date;
              const type =
                item.type === 'folder' ? 'folder' : getFileExtension(item.name);
              const size = item.size;
              const path = item.path;

              //          console.log(item)

              //    console.log(type)

              //  console.log(data[key])

              // Now you can use the extracted properties as needed
              // console.log("Name:", name);
              //console.log("Date:", date);
              //console.log("Type:", type);

              //allItemsList.push({elementName: name, type: type, date: date})

              //console.log("Pushing a " + type)

              setAllItemsList(allItemsList => [
                ...allItemsList,
                {
                  elementName: name,
                  type: type,
                  date: date,
                  size: size,
                  path: path,
                },
              ]);
            }
          }
        } else {
          navigate('/dashboard/My Files');
        }

        //const data = snapshot.val();
        //console.log(data);

        //console.log(allItemsList)
      });

      //console.log("not listening to " + "users/" + auth.currentUser?.uid + currentPath)

      //const pathSegments = currentPath.split('/');

      // Remove the last segment
      //pathSegments.pop();

      // Join the segments back to form the updated path
      // const updatedPath = pathSegments.join('/');

      //navigate("/dashboard/My Files/")

      //console.log("The current path has changed to " + currentPath)

      //}
    }
    return () => {
      off(queryRef);

      //console.log("The current path has changed to " + currentPath + " and the listener is unmounting")
      // Clean up side effects or subscriptions here when the component unmounts
    };
  }, [location.pathname]);

  useEffect(() => {
    function logNonFolderItems(obj: any) {
      for (const key in obj) {
        const item = obj[key];

        if (item.type && item.type !== 'folder') {
          console.log("here's a file");
          console.log(item);

          const name = item.name;
          const date = item.date;
          const type =
            item.type === 'folder' ? 'folder' : getFileExtension(item.name);
          const size = item.size;
          const path = item.path;

          // arr.push({elementName: name, type: type, date: date, size: size, path: path})

          setRecentFilesList(recentFilesList => [
            ...recentFilesList,
            {
              elementName: name,
              type: type,
              date: date,
              size: size,
              path: path,
            },
          ]);
          //setRecentFilesList([...recentFilesList].sort((a, b) => b.date - a.date))

          //            setRecentFilesList((recentFielesList) => [...recentFilesList, {elementName: name, type: type, date: date, size: size, path: path}])
        }

        if (typeof item === 'object' && item !== null) {
          logNonFolderItems(item);
        } else {
          //setRecentFilesList(arr)
        }
      }
    }

    var pathToListen = 'users/' + auth.currentUser?.uid + '/My Files';

    const db = getDatabase();

    const tasksRef = ref(db, pathToListen);

    const queryRef = query(tasksRef);

    //    console.log("Listening to " + pathToListen)

    //if (currentPath === "" || auth.currentUser === null || !location.pathname.includes('My App')){
    //console.log("Not listening to DB because the path is empty and the uid is not defined")
    //navigate("/dashboard")
    //  navigate("/dashboard/My Files/")

    //}
    //else{
    //console.log("Attempting to listen to " +  pathToListen)

    //console.log("Listening in zeee db in " + pathToListen)

    //  console.log("Listening to " + "users/" + auth.currentUser?.uid + currentPath)

    onValue(queryRef, snapshot => {
      //      console.log("There have been changes inside " + "users/" + auth.currentUser?.uid + currentPath)
      //const data = snapshot.val();
      //console.log("ALl the data")
      //console.log(data);

      setRecentFilesList([]);

      logNonFolderItems(snapshot.val());

      //setAllItemsList([])
      //for (const key in data) {
      //if (Object.hasOwnProperty.call(data, key) && typeof data[key] === "object") {
      //    const item = data[key];
      //    // Extracting the desired properties
      //      const name = item.name
      //      const date = item.date
      //      const type = (item.type === "folder") ? "folder" : getFileExtension(item.name)
      //      const size = item.size
      //      const path = item.path

      //          console.log(item)

      //    console.log(type)

      //  console.log(data[key])

      // Now you can use the extracted properties as needed
      // console.log("Name:", name);
      //console.log("Date:", date);
      //console.log("Type:", type);

      //allItemsList.push({elementName: name, type: type, date: date})

      //console.log("Pushing a " + type)

      //  setAllItemsList((allItemsList) => [...allItemsList, {elementName: name, type: type, date: date, size: size, path: path}])

      //}
      //}
      //const data = snapshot.val();
      //console.log(data);

      //console.log(allItemsList)
    });

    //console.log("not listening to " + "users/" + auth.currentUser?.uid + currentPath)

    //const pathSegments = currentPath.split('/');

    // Remove the last segment
    //pathSegments.pop();

    // Join the segments back to form the updated path
    // const updatedPath = pathSegments.join('/');

    //navigate("/dashboard/My Files/")

    //console.log("The current path has changed to " + currentPath)

    //}

    return () => {
      off(queryRef);

      //console.log("The current path has changed to " + currentPath + " and the listener is unmounting")
      // Clean up side effects or subscriptions here when the component unmounts
    };
  }, [location.pathname]);

  //fetch(`http://127.0.0.1:5000/api/check`)
  //.then(res => res.json())
  //.then((res: any) => {
  // res is now an Actor

  //    alert(res.message)

  //});

  //const recentFilesList = [{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},{elementName: "revenues.jpg", type: "jpg"},{elementName: "revenues.pdf", type: "pdf"},];

  const elementsList = [
    {
      elementName: 'a folder',
      type: 'folder',
      size: '28 KB',
      date: 'time-stamp',
    },
    {
      elementName: 'another one',
      type: 'folder',
      size: '28 KB',
      date: 'time-stamp',
    },
    { elementName: 'lol', type: 'folder', size: '28 KB', date: 'time-stamp' },
    {
      elementName: 'revenues_folder',
      type: 'folder',
      size: '28 KB',
      date: 'time-stamp',
    },
    {
      elementName: 'revenues_folder',
      type: 'folder',
      size: '28 KB',
      date: 'time-stamp',
    },
    {
      elementName: 'revenues_folder',
      type: 'folder',
      size: '28 KB',
      date: 'time-stamp',
    },
    {
      elementName: 'revenues_folder',
      type: 'folder',
      size: '28 KB',
      date: 'time-stamp',
    },
    {
      elementName: 'document.docx',
      type: 'docx',
      size: '54 KB',
      date: 'time-stamp',
    },
    {
      elementName: 'image.jpg',
      type: 'jpg',
      size: '136 KB',
      date: 'time-stamp',
    },
  ];

  const uploadedFilesContainerRef = useRef<any | HTMLElement>(null);

  function downloadItem(item: any) {
    //setModalTextInputDefaultValue(item.elementName)

    console.log(`Downloading ${item.type} ${item.elementName}...`);
  }

  function openRenameModal(item: any) {
    setSelectedItem(item);
    setRenameModalIsOpen(true);
    //console.log(`Renaming ${item.type} ${item.elementName}...`)
  }

  function renameItem(item: any, newName: String) {
    setRenameModalIsOpen(false);
    //console.log(item)
    //console.log(`Renaming ${item.type} ${item.elementName}... to ${newName}`);
    fetch('http://localhost:5000/api/rename', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentIdToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: item.path,
        newName: newName,
        originalName: item.elementName,
      }), // body data type must match "Content-Type" header
    })
      .then(response => {
        //setNewFolderModalIsOpen(false);

        if (response.status === 200) {
        } else {
        }

        //response.json()
      })
      .then(data => {
        //console.log('Upload success:', data);
      })
      .catch(error => {
        //console.error('Upload error:', error);
      });
  }

  function createNewFolder(folderName: String) {
    console.log(
      'Creating new folder named ' +
        folderName +
        ' in ' +
        extractFromMyFiles(decodeURI(location.pathname)),
    );

    fetch('http://localhost:5000/api/new-folder', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentIdToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderName: folderName,
        path: extractFromMyFiles(decodeURI(location.pathname)),
      }), // body data type must match "Content-Type" header
    })
      .then(response => {
        setNewFolderModalIsOpen(false);

        if (response.status === 200) {
        } else {
        }

        //response.json()
      })
      .then(data => {
        //console.log('Upload success:', data);
      })
      .catch(error => {
        //console.error('Upload error:', error);
      });
  }

  function deleteItem(item: any) {
    //setModalTextInputDefaultValue(item.elementName)
    //console.log(`Deleting ${item.type} ${item.elementName}...`)

    fetch('http://localhost:5000/api/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentIdToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: item.path,
      }), // body data type must match "Content-Type" header
    })
      .then(response => {

        if (response.status === 200) {
        } else {
        }

        //response.json()
      })
      .then(data => {
        //console.log('Upload success:', data);
      })
      .catch(error => {
        //console.error('Upload error:', error);
      });
  }

  const dropDownMenuOptions = (item: object) => [
    {
      label: (
        <div
          onClick={() => {
            downloadItem(item);
          }}
        >
          Download
        </div>
      ),
      key: 'download',
    },
    {
      label: (
        <div
          onClick={() => {
            openRenameModal(item);
          }}
        >
          Rename
        </div>
      ),
      key: 'rename',
    },
    {
      label: (
        <div
          onClick={() => {
            deleteItem(item);
          }}
        >
          Delete
        </div>
      ),
      key: 'delete',
    },
  ];

  const dropDownMenuOptionsNewFolder = () => [
    {
      label: (
        <div
          onClick={() => {
            setNewFolderModalIsOpen(true);
          }}
        >
          New Folder
        </div>
      ),
      key: 'new folder',
    },
  ];

  function dragDropStyle(currentDragDropState: string) {
    switch (currentDragDropState) {
      case 'isDraggedOver':
        return styles.dragDropSurfaceDraggedOver;
      case 'isNotDraggedOver':
        return styles.dragDropSurfaceNotDraggedOver;
      case 'isDropAccepted':
        return styles.dragDropSurfaceDropAccepted;
    }
  }

  const [dragDropSurfaceState, setDragDropSurfaceState] =
    useState('isNotDraggedOver');

  const [listOfUploaded, setListOfUploaded] = React.useState<any[]>([]);

  const [allItemsList, setAllItemsList] = React.useState<any[]>([]);

  const [recentFilesList, setRecentFilesList] = React.useState<any[]>([]);

  //console.log(allItemsList)

  function openModal() {
    setRenameModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {}

  function uploadFiles(files: File[]) {
    //console.log(files)

    setDragDropSurfaceState('isDropAccepted');

    // Send files to the backend

    var arr: any = [];

    setListOfUploaded([]);

    for (let i = 0; i < files.length; i++) {
      //console.log(files[i].size)

      const formData = new FormData();

      //console.log(`The last uploaded file is : ${files[Math.max(files.length-1, 0)].name}`)

      formData.append('path', extractFromMyFiles(decodeURI(location.pathname)));

      console.log('Uploading ' + files[i].name + '...');

      formData.append('files', files[i]);

      //setListOfUploaded([
      //  ...listOfUploaded,
      //  { name: files[i].name, size: files[i].size },
      //]);

      uploadedFilesContainerRef.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      axios
        .request({
          method: 'post',
          url: 'http://localhost:5000/api/upload',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${currentIdToken}`,
          },

          data: formData,

          onUploadProgress: p => {
            console.log('it is progressing... ' + p.loaded / p.total!);
            //var arr = arr.filter(file_ => file_.name != files[i].name);
            //const index = arr.findIndex(e => e.name === files[i].name);
            //if (index === -1) {
            //arr.push({
            //  name: files[i].name,
            //  size: files[i].size,
            //  progress: p.loaded / p.total!,
            //});
            //setListOfUploaded(arr);

            //} else {
            //arr[index].progress = p.loaded / p.total!;
            //              console.log(arr[index].progress + "changed to haaa")
            //setListOfUploaded(arr);
            //}

            arr.push({
              name: files[i].name,
              size: files[i].size,
              progress: p.loaded / p.total!,
            });

            setListOfUploaded(
              Array.from(
                new Map(
                  arr.map((filez: { name: any }) => [filez.name, filez]),
                ).values(),
              ),
            );

            //console.log("Progress "+(p.loaded / p.total));
            //this.setState({
            //fileprogress: p.loaded / p.total
            //})

            //you will actually use that : while there is progress... you will take the first files's size and divide it by the total size of the uploaded files. and then compare that number to p.loaded. if it is bigger then switch to the next file uploaded and so on

            // 10/35

            // 5/35

            // 1/35

            //const sumSizeFiles = files.reduce(
            //  (total, item) => total + item.size,
            //  0,
            //);
            //each file might just have its own api request so  its own listener
            //is it okay to upload files multiple api calls
            //I would go for individual images and above all, make the processing asynchronous

            //wait for the last item in the files list to stop the upload animation

            //const endTime = new Date().getTime() / 1000;

            //console.log('Time ' + (endTime - startTime));

            //console.log(p);

            //if (endTime - startTime <= 6 && p.loaded === p.total) {
            //.// setTimeout(
            //() => {
            //setDragDropSurfaceState('isNotDraggedOver');
            //},
            //6500 - (endTime - startTime),
            //);
            //}

            //if (p.loaded === p.total) {
            //setDragDropSurfaceState('isNotDraggedOver');
            //}
          },
        })
        .then(response => {
          if (response.status === 200) {
          } else {
          }

          if (i === files.length - 1) {
            setDragDropSurfaceState('isNotDraggedOver');
          }

          //response.json()
        })
        .then(data => {
          //console.log('Upload success:', data);
        })
        .catch(error => {
          //console.error('Upload error:', error);
        });
    }

    //const startTime = new Date().getTime() / 1000;

    //uploadedFilesContainerRef.current!.scrollIntoView({
    //  behavior: 'smooth',
    //  block: 'center',
    //});

    //    fetch('http://localhost:5000/api/upload', {
    //      method: 'POST',
    //      headers: {
    //        Accept: 'application/json',
    //        Authorization: `Bearer ${currentIdToken}`,
    //      },
    //      body: formData,
    //    })
    //     .then(response => {
    //        if (response.status === 200) {
    //        } else {
    //        }

    //response.json()
    //     })
    //      .then(data => {
    //console.log('Upload success:', data);
    //      })
    //      .catch(error => {
    //console.error('Upload error:', error);
    //      });

    //  setTimeout(() => {
    // setDragDropSurfaceState('isNotDraggedOver');
    //    }, 10000);

    //get rid of the setTimeout and change the state when the upload is done
  }
  const ClickablePath = (props: any) => {
    const path = props.path;

    const segments = path
      .split('/')
      .filter((segment: string) => segment.trim() !== '');

    return (
      <div style={{ marginBottom: '20px' }}>
        {segments.map((segment: string, index: number) => (
          <span key={index} className={styles.sectionTitle}>
            {index !== 0 && <span className={styles.sectionTitle}>/</span>}
            <a
              href="javascript:;"
              onClick={() => {
                navigate(
                  '/dashboard/' + segments.slice(0, index + 1).join('/'),
                );
              }}
              className={styles.sectionTitle}
            >
              {segment}
            </a>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.app}>
      <RenameModal
        renameItem={renameItem}
        selectedItem={selectedItem}
        renameModalIsOpen={renameModalIsOpen}
        closeRenameModal={() => setRenameModalIsOpen(false)}
      ></RenameModal>

      <NewFolderModal
        currentPath={extractFromMyFiles(decodeURI(location.pathname))}
        newFolderModalIsOpen={newFolderModalIsOpen}
        closeNewFolderModal={() => {
          setNewFolderModalIsOpen(false);
        }}
        createNewFolder={(arg: string) => {
          createNewFolder(arg);
        }}
      />

      <div className={styles.navbar}>
        <img
          src="https://i.ibb.co/xXPXQP0/logo.png"
          className={styles.logo}
        ></img>

        <div className={styles.searchBar}>
          <img className={styles.searchBarIcon} src={search}></img>

          <input
            className={styles.searchBarInput}
            type="text"
            placeholder="Search Files..."
            name="search"
          ></input>
        </div>

        <button
          className={styles.newFolder}
          onClick={() => {
            setNewFolderModalIsOpen(true);
          }}
        >
          New Folder
          <img className={styles.newFolderIcon} src={addIcon} />
        </button>

        <div className={styles.userContainer}>
          <div className={styles.userInfoContainer}>
            <img
              className={styles.userProfilePicture}
              src="https://xsgames.co/randomusers/assets/avatars/male/64.jpg"
            ></img>

            <p className={styles.usernameText}>{currentUserEmail}</p>
          </div>

          <button
            className={styles.logOutButton}
            title={'Log out'}
            onClick={() => {
              signOutFromFirebase();
            }}
          >
            <img className={styles.logOutButtonIcon} src={logOutIcon}></img>
          </button>
        </div>
      </div>

      <div className={styles.divisionHorizontalBar}></div>

      <div className={styles.sidePannel}>
        <div className={styles.sidePannelButtonsContainer}>
          {SideButtonsList.map((item, index) => (
            <SidePannelButton itemObject={item} />
          ))}
        </div>

        <div className={styles.storageUsageDetailsContainer}>
          <div className={styles.storageUsageTitlesContainer}>
            <h1 className={styles.storageUsedTitle}>25.32 GB used</h1>

            {/**Make a real API call to the server to get real data*/}

            <h2 className={styles.storageUsedFreeTitle}>
              72.8% used - 6.64 GB free
            </h2>
          </div>

          <div className={styles.storageUsageBackgroundBar}>
            <div className={styles.storageUsageBar}></div>
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.divisionVerticalBar}></div>

        <div className={styles.mainContentContainer}>
          <h1
            style={{
              marginLeft: '20px',
              display: recentFilesList.length === 0 ? 'none' : 'block',
            }}
            className={styles.sectionTitle}
          >
            Recent
          </h1>

          <ScrollContainer
            className={styles.recentFilesContainer}
            hideScrollbars={true}
            style={{ display: recentFilesList.length === 0 ? 'none' : 'block' }}
          >
            {/* Si besoin de diviser en deux div, utiliser deux listes pour chaque div*/}

            <div
              className={styles.subRecentFilesContainer}
              id={styles.subRecentFilesContainer1}
            >
              {recentFilesList
                .sort((a, b) => b.date - a.date)
                .map((item, index) => (
                  <RecentFilesButton
                    itemObject={item}
                    dropDownMenuOptions={dropDownMenuOptions}
                  />
                ))}
            </div>
          </ScrollContainer>

          <div
            style={{
              marginTop: recentFilesList.length === 0 ? '20px' : '20px',
            }}
            id={styles.bottomContainer}
          >
            <div id={styles.allItemsContainer}>
              <ClickablePath
                path={decodeURI(location.pathname.replace('dashboard', ''))}
              ></ClickablePath>
              {/*  <h1 className={styles.sectionTitle} style={{marginLeft:'20px'}}>All files</h1> */}

              <div id={styles.allFilesSortContainer}>
                <div style={{ flexBasis: '' }}>
                  <button className={styles.sortItem}>Type</button>
                </div>

                <div style={{ flexBasis: 'calc(34% - 0px)' }}>
                  <button className={styles.sortItem}>Name</button>
                </div>

                <div style={{ flexBasis: 'calc(28%)' }}>
                  <button className={styles.sortItem}>Date created</button>
                </div>

                <div style={{ flexBasis: 'calc(20%)' }}>
                  <button className={styles.sortItem}>Size</button>
                </div>
              </div>

              <div id={styles.allFilesSubContainer}>
                {allItemsList.map((item, index) => (
                  <ElementButton
                    itemObject={item}
                    dropDownMenuOptions={dropDownMenuOptions}
                  />
                ))}

                <Dropdown
                  trigger={['contextMenu']}
                  menu={{
                    items: dropDownMenuOptionsNewFolder(),
                  }}
                >
                  <div id={styles.clickableNewFolderArea}></div>
                </Dropdown>
              </div>
            </div>

            <div className={styles.dragDropContainer}>
              <Dropzone
                onDrop={acceptedFiles => console.log(acceptedFiles)}
                onDragOver={() => {
                  setDragDropSurfaceState('isDraggedOver');
                }}
                onDragLeave={() => {
                  setDragDropSurfaceState('isNotDraggedOver');
                }}
                onDropAccepted={files => {
                  //setListOfUploaded([]);

                  uploadFiles(files.sort((a, b) => a.size - b.size));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    className={`${styles.dragDropSurface} ${dragDropStyle(
                      dragDropSurfaceState,
                    )}`}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />

                    <DragDropSuccessfullAnimation
                      state={dragDropSurfaceState}
                    />

                    {/*instead of using  <DragDropIcon/>, use dragdropsuccessfullanim but just change the colour depending on the state of the upload or on hover. also stop the anim like just run it once*/}

                    {dragDropSurfaceState == 'isDraggedOver' ? (
                      <h1 className={styles.dragDropText}>
                        Drag your file here
                      </h1>
                    ) : null}
                    {dragDropSurfaceState == 'isNotDraggedOver' ? (
                      <h1 className={styles.dragDropText}>
                        Drag and drop a file, or{' '}
                        <span id={styles.dragDropBrowseText}>Browse</span>
                      </h1>
                    ) : null}
                    {dragDropSurfaceState == 'isDropAccepted' ? (
                      <div className={styles.dragDropUploadingTextContainer}>
                        <h1
                          className={`${styles.dragDropText} ${styles.dragDropUploadingText}`}
                        >
                          Uploading
                        </h1>
                      </div>
                    ) : null}
                  </div>
                )}
              </Dropzone>

              {/*display the list of uploaded files*/}
              <div
                className={styles.uploadedFilesContainer}
                ref={uploadedFilesContainerRef}
              >
                {listOfUploaded.reverse().map((file, index) => (
                  <UploadedFileItem object={file} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
