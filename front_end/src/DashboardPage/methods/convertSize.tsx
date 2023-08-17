function convertSize(sizeToConvert: number) {
  var units = ['B', 'KB', 'MB', 'GB', 'TB'],
    bytes = sizeToConvert,
    i;

  for (i = 0; bytes >= 1024 && i < 4; i++) {
    bytes /= 1024;
  }

  return Number(bytes).toFixed(1) + units[i];
}

export default convertSize;