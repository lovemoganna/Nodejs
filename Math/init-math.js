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

  const dm = decimals < 0 ?0: decimals;

  const i = parseInt(Math.floor(Math.log(byteSize) / Math.log(1024)));

  // 四舍五入的版本
  // return Math.round(+byteSize / Math.pow(1024, i), 2)+ ' '  + fileSize[i]

  // more precise version
  return parseFloat(byteSize/Math.pow(1024, i)).toFixed(dm) + ' '+ fileSize[i];
}
console.log(
  byteToSize('192020')
)