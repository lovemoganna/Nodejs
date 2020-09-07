const inputElement = document.getElementById("testInput");

inputElement.addEventListener("change", handleFiles, false);


function handleTimestamp (timestamp) {
  var date = new Date(timestamp)

  Y = date.getFullYear() + '-';
  Mo = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() +1): date.getMonth() +1) + '-'

  D = date.getDate() + ' ';
  H = date.getHours() + ':';
  M = (date.getMinutes() < 10 ? '0'+ date.getMinutes(): date.getMinutes())+ ':';
  S = (date.getSeconds() < 10 ? '0'+ date.getSeconds(): date.getSeconds());

  return Y+Mo+D+H+M+S
}


function byteToSize(byteSize, decimals = 2) {
  /*
  1. declare file size constant
  2. judgement byteSize by fileSize index, judgement each other relationship
  */

  if (byteSize === 0)
    return "0 byte"

  const fileSize = ['Byte',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB',
    'EB',
    'ZB',
    'YB']

  const dm = decimals < 0 ?0: decimals,
  i = parseInt(Math.floor(Math.log(byteSize) / Math.log(1024)));

  // more precise version
  return parseFloat(byteSize/Math.pow(1024, i)).toFixed(dm) + ' '+ fileSize[i];
}


function handleFiles() {
  // https://webplatform.github.io/docs/apis/file/FileList/
  const file = this.files[0]; /* now you can work with the file */
  const fileName = file.name;
  const selectedTimestamp = file.lastModified
  console.log(`you selected file all properties is`, file, `file name is ${fileName}`, `file selected created time is ${handleTimestamp(selectedTimestamp)}`, `file size is ${byteToSize(file.size, 0)}`)
}