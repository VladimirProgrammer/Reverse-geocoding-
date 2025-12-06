'use strict';

const imgContainer = document.querySelector('.imgContainer');
const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};
const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    // resolve
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    //reject
    img.addEventListener('error', function () {
      reject(new Error('Cannot load the img'));
    });
  });
};
let currentImg;
createImg('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImg('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImg('img/img-3.jpg');
  })
  .catch(err => console.log('error'));
