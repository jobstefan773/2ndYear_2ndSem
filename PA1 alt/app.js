let items = document.querySelectorAll('.carousel .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 15000)


let playTimeout; // store the timeout ID

function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.carousel .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');

    // pause video in the old active item and clear the timeout
    let oldActiveVideo = itemActiveOld.querySelector('video');
    if (oldActiveVideo) {
        oldActiveVideo.pause();
        oldActiveVideo.currentTime = 0; // reset the video to the beginning
        clearTimeout(playTimeout); // clear the timeout
    }

    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // pause all videos and reset their current time
    let videos = document.querySelectorAll('.carousel .list .item video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0; // reset the video to the beginning
    });

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // play video in the active item after a delay of 5 seconds
    let activeVideo = items[itemActive].querySelector('video');
    if (activeVideo) {
        playTimeout = setTimeout(() => { // store the timeout ID
            activeVideo.play();
        }, 5000); // delay in milliseconds
    }

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 15000)
}


// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})