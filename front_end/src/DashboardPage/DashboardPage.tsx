import React, { useEffect, useRef } from 'react';
//import css
import styles from './DashboardPage.module.css';
import searchIcon from './assets/search.svg';
//import filterIcon from './assets/filter_icon.svg';
import logOutIcon from './assets/logOutIcon.svg';
import SidePannelButton from './components/sidePannelButton/sidepannelButton';
import SideButtonsList from './SideButtonsList';
import ScrollContainer from 'react-indiana-drag-scroll';
import RecentFilesButton from './components/recentFilesButton/recentFilesButton';
import ElementButton from './components/elementButton/elementButton';
//import { saveAs } from 'file-saver';
//import folderIcon from './assets/folder.svg'
//import { Dropdown, Menu } from 'antd';
//import type { MenuProps } from 'antd';
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import DragDropSuccessfullAnimation from './components/dragDropSuccessfullAnimation/dragDropSuccessfullAnimation';
import UploadedFileItem from './components/uploadedFileItem/uploadedFileItem';
//import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
//haha
//import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import RenameModal from './components/renameModal/renameModal';
import addIcon from './assets/addIcon.svg';
import NewFolderModal from './components/newFolderModal/newFolderModal';
import { createWriteStream } from 'streamsaver';
import {
  //child,
  //equalTo,
  //get,
  getDatabase,
  off,
  onValue,
  //orderByChild,
  query,
  ref,
} from 'firebase/database';
import { Dropdown } from 'antd';
import axios from 'axios';
//import { match } from 'assert';

function App() {
  //const firebaseConfig = {
  //  apiKey: 'AIzaSyC0WzN8b1WZ1BKvYObM_bEOEA7h0NiHmEU',

  //  authDomain: 'cloudapp-b1e10.firebaseapp.com',

  //  databaseURL:
  //    'https://cloudapp-b1e10-default-rtdb.europe-west1.firebasedatabase.app',

  //  projectId: 'cloudapp-b1e10',

  //  storageBucket: 'cloudapp-b1e10.appspot.com',

  //  messagingSenderId: '306526058417',

  //  appId: '1:306526058417:web:ca2a5ec2035ec1b6806f90',

  //  measurementId: 'G-G600B1ZV35',
  //};

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

  const [search, setSearch] = useState('');

  const [renameModalIsOpen, setRenameModalIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<any | null>('');

  const [sortingCriteria, setSortingCriteria] = useState('name'); // Default sorting criteria
  const [sortingDirection, setSortingDirection] = useState('ascending'); // Default sorting direction

  const handleSort = (criteria: any) => {
    if (criteria === sortingCriteria) {
      // If clicking on the same criteria, toggle the sorting direction
      setSortingDirection(
        sortingDirection === 'ascending' ? 'descending' : 'ascending',
      );
    } else {
      // If clicking on a different criteria, set to ascending by default
      setSortingCriteria(criteria);
      setSortingDirection('ascending');
    }
  };
  //console.log(location.pathname)

  //const [currentPath, setCurrentPath] = useState("")

  //console.log("The current uri is : '"+location.pathname+ "'")

  function sortList(arrToSort: any) {
    switch (sortingCriteria) {
      case 'type':
        return arrToSort.sort((a: any, b: any) =>
          sortingDirection === 'ascending'
            ? a.type.toLowerCase().localeCompare(b.type.toLowerCase())
            : b.type.toLowerCase().localeCompare(a.type.toLowerCase()),
        );

      case 'name':
        return arrToSort.sort((a: any, b: any) =>
          sortingDirection === 'ascending'
            ? a.elementName
                .toLowerCase()
                .localeCompare(b.elementName.toLowerCase())
            : b.elementName
                .toLowerCase()
                .localeCompare(a.elementName.toLowerCase()),
        );

      case 'date':
        return arrToSort.sort((a: any, b: any) =>
          sortingDirection === 'ascending' ? a.date - b.date : b.date - a.date,
        );

      case 'size':
        return arrToSort.sort((a: any, b: any) =>
          sortingDirection === 'ascending' ? a.size - b.size : b.size - a.size,
        );
    }
  }
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
            if (error) {
            }
            
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

    //console.log('The user is ');
    //console.log(auth.currentUser);

    //var pathToListen = "users/" + auth.currentUser?.uid + decodeURI(location.pathname.replace('dashboard/My Files', '/'))

    //var pathToListen = decodeURI(location.pathname)

    if (
      decodeURI(location.pathname) === '/dashboard/My Files' ||
      decodeURI(location.pathname) === '/dashboard/My Files/'
    ) {
      var pathToListen = 'users/' + auth.currentUser?.uid + '/My Files';

      //      pathToListen = "users/" + auth.currentUser?.uid + "/My Files/"
      //console.log("Condition met, you're at the root folder");
    } else {
      var pathToListen =
        'users/' +
        auth.currentUser?.uid +
        decodeURI(location.pathname.replace('dashboard/', ''));
      //console.log("Condition not met, you're elsewhere");
    }

    const db = getDatabase();

    const tasksRef = ref(db, pathToListen);

    const queryRef = query(tasksRef);

    //console.log("Let's listen to " + pathToListen);

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
          //console.log("Tell the data i'm coming");
          //console.log(data);

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
          //console.log("here's a file");
          //console.log(item);

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

  const uploadedFilesContainerRef = useRef<any | HTMLElement>(null);

  function downloadItem(item: any) {
    //setModalTextInputDefaultValue(item.elementName)

    //console.log(`Downloading ${item.type} ${item.elementName}...`);

    //alert(item.elementName)

    fetch('https://shark-app-wcvuc.ondigitalocean.app/api/download', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentIdToken}`,
        'Content-Type': 'application/json',
        path: item.path,
        type: item.type,
        name: item.elementName,
      },
    }).then(response => {
      //do not check for response.status because that interferes with the download
      const fileStream = createWriteStream(
        item.type === 'folder' ? item.elementName + '.zip' : item.elementName,
        { size: Number(response.headers.get('Content-Length')) },
      );

      const readableStream = response.body;

      // more optimized
      if (window.WritableStream && readableStream?.pipeTo) {
        return readableStream.pipeTo(fileStream).then(
          () => {},
          //console.log('done writing')
        );
      }

      const writer = fileStream.getWriter();

      // window.writer = getWriter();

      const reader = response.body?.getReader();
      function pump() {
        reader!
          .read()
          .then(res =>
            res.done ? writer.close() : writer.write(res.value).then(pump),
          );
      }

      pump();
    });
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
    fetch('https://shark-app-wcvuc.ondigitalocean.app/api/rename', {
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
          alert('Error renaming file');
        }

        //response.json()
      })
      .then(
        
        //console.log('Upload success:', data);
      )
      .catch(
        
      );
  }

  function createNewFolder(folderName: String) {
    //console.log(
    //  'Creating new folder named ' +
    //  folderName +
    //  ' in ' +
    // extractFromMyFiles(decodeURI(location.pathname)),
    //);
    if (!folderName.includes('/')) {
      fetch('https://shark-app-wcvuc.ondigitalocean.app/api/new-folder', {
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
            alert('Error creating folder');
          }

          //response.json()
        })
        .then()
        .catch();
    } else {
      //maybe remove this alert
      alert("Folder name can't contain '/'");
    }
  }

  function deleteItem(item: any) {
    //setModalTextInputDefaultValue(item.elementName)
    //console.log(`Deleting ${item.type} ${item.elementName}...`)

    fetch('https://shark-app-wcvuc.ondigitalocean.app/api/delete', {
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
          alert('Error while deleting file');
        }

        //response.json()
      })
      .then()
      .catch();
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

  //function openModal() {
  //  setRenameModalIsOpen(true);
  //}

  //function afterOpenModal() {
  //  // references are now sync'd and can be accessed.
  //}

  //function closeModal() {}

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

      //console.log('Uploading ' + files[i].name + '...');

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
          url: 'https://shark-app-wcvuc.ondigitalocean.app/api/upload',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${currentIdToken}`,
          },

          data: formData,

          onUploadProgress: p => {
            //console.log('it is progressing... ' + p.loaded / p.total!);
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
            alert('Error uploading file');
          }

          if (i === files.length - 1) {
            setDragDropSurfaceState('isNotDraggedOver');
          }

          //response.json()
        })
        .then()
        .catch();
    }

    //const startTime = new Date().getTime() / 1000;

    //uploadedFilesContainerRef.current!.scrollIntoView({
    //  behavior: 'smooth',
    //  block: 'center',
    //});

    //    fetch('https://shark-app-wcvuc.ondigitalocean.app/api/upload', {
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
              href=""
              onClick={e => {
                e.preventDefault();
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
          <img className={styles.searchBarIcon} src={searchIcon}></img>

          <input
            className={styles.searchBarInput}
            type="text"
            placeholder="Search Files..."
            name="search"
            onChange={e => {
              setSearch(e.target.value);
            }}
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
            <SidePannelButton itemObject={item} key={index} />
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
                    key={index}
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
                  <button
                    className={styles.sortItem}
                    onClick={() => {
                      handleSort('type');
                    }}
                  >
                    {sortingCriteria === 'type'
                      ? sortingDirection === 'ascending'
                        ? 'Type ↑'
                        : 'Type ↓'
                      : 'Type'}
                  </button>
                </div>

                <div style={{ flexBasis: 'calc(34% - 0px)' }}>
                  <button
                    className={styles.sortItem}
                    onClick={() => {
                      handleSort('name');
                    }}
                  >
                    {sortingCriteria === 'name'
                      ? sortingDirection === 'ascending'
                        ? 'Name ↑'
                        : 'Name ↓'
                      : 'Name'}
                  </button>
                </div>

                <div style={{ flexBasis: 'calc(28%)' }}>
                  <button
                    className={styles.sortItem}
                    onClick={() => {
                      handleSort('date');
                    }}
                  >
                    {sortingCriteria === 'date'
                      ? sortingDirection === 'ascending'
                        ? 'Date ↑'
                        : 'Date ↓'
                      : 'Date'}
                  </button>
                </div>

                <div style={{ flexBasis: 'calc(20%)' }}>
                  <button
                    className={styles.sortItem}
                    onClick={() => {
                      handleSort('size');
                    }}
                  >
                    {sortingCriteria === 'size'
                      ? sortingDirection === 'ascending'
                        ? 'Size ↑'
                        : 'Size ↓'
                      : 'Size'}
                  </button>
                </div>
              </div>

              <div id={styles.allFilesSubContainer}>
                {sortList(allItemsList)
                  .filter((item: any) => {
                    return search.toLowerCase() === ''
                      ? item
                      : item.elementName
                          .toLowerCase()
                          .includes(search.toLowerCase());
                  })
                  .map((item: any, index: any) => (
                    <ElementButton
                      itemObject={item}
                      dropDownMenuOptions={dropDownMenuOptions}
                      key={index}
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
                  <UploadedFileItem object={file} key={index} />
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
