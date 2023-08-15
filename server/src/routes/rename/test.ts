var data = {
  "another cool folder": {
    "barcode,gif": {
      "date": 1692124571765,
      "name": "barcode.gif",
      "path": "/My Files/cool folder/another cool folder/barcode.gif",
      "size": "3.6KB",
      "type": "gif"
    },
    "date": 1692124556996,
    "https __linkshortenerapp,netlify,app_oSoCU4g_qr_code,png": {
      "date": 1692124571768,
      "name": "https __linkshortenerapp.netlify.app_oSoCU4g_qr_code.png",
      "path": "/My Files/cool folder/another cool folder/https __linkshortenerapp.netlify.app_oSoCU4g_qr_code.png",
      "size": "3.9KB",
      "type": "png"
    },
    "logout-svgrepo-com,svg": {
      "date": 1692124571744,
      "name": "logout-svgrepo-com.svg",
      "path": "/My Files/cool folder/another cool folder/logout-svgrepo-com.svg",
      "size": "1.1KB",
      "type": "svg"
    },
    "name": "another cool folder",
    "path": "/My Files/cool folder/another cool folder",
    "size": "2 MB",
    "type": "folder"
  },
  "date": 1692124536171,
  "name": "cool folder",
  "path": "/My Files/cool folder",
  "size": "2 MB",
  "type": "folder"
}

function processItems(obj: any, oldPath: string, newPath: string) {
  for (const key in obj) {
    const item = obj[key];

    if (item.type === "folder") {
      // Update path for folders
      //item.path = item.path.replace(item, ",");
      item.path = item.path.replace(oldPath, newPath).replace(".", ",");

      // Recursively process nested items
      if (typeof item === "object" && item !== null) {
        //processItems(item, folderPath);
        obj[key] = processItems(obj, oldPath, newPath);
      }
    } else {
      item.path = item.path.replace(oldPath, newPath).replace(".", ",");
      // Update path for files
      //item.path = `${basePath}${item.name}`;
      // Perform actions for files (replace with your logic)
      // Example: Update recentFilesList
    }
  }

  return obj;
}


  var pathToNewElement =
    "users/" + "uid" + "path".replace("originalName", "newName").replace(".", ",");

  var pathToNewElement__ = "users/" + "uid" + "path".replace("originalName", "newName");

  data.name = "newName";

  data.path = "path".replace("originalName", "newName");

  if (data.type == "folder") {
    var dataToSendToDB = processItems(data, "path", "pathToNewElement__");
    //sendToDB
  }


