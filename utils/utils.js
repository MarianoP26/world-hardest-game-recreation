let Jimp = require('jimp');

function readImage() {
  let data = Jimp.read('../assets/level1.png', (err, image) => {
    image.getPixelColor(1,0);
  })

  console.log(data);
  return data;
}



export { readImage };