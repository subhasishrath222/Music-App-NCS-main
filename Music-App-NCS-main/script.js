console.log("Welcome to Spotify");
//variable Initialization
let songIndex=0;
let currentSongIndex;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterplay');
let miniPlay=document.querySelectorAll('.miniplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songitems=Array.from(document.getElementsByClassName('songItem'));
let masterSongName=document.getElementById('MasterSongName')
let songs=[
    {songName:"Bones-Imagine Dragons",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Demons-Imagine Dragons",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"Numb-Linkin Park",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Nothing Else Matters-Metallica",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Coming back to Life-Pink Floyd",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Battle Symphony-Linkin Park",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Take me Home,Country Road-John Denver",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Carnival Rust-Pink Floyd",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},    {songName:"Starboy-The Weekend",filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
]

//Adding the Song Icon and Name in each SongItem Div
songitems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText=songs[i].songName;   
})


//handle play box click
masterPlay.addEventListener('click',()=>{
    const currentSongElement = document.getElementById(`${currentSongIndex}`);
    console.log(currentSongElement)
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        currentSongElement.classList.remove('fa-play-circle');
        currentSongElement.classList.add('fa-pause-circle')
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        currentSongElement.classList.remove('fa-pause-circle');
        currentSongElement.classList.add('fa-play-circle')
        gif.style.opacity=0;
    }
})

//Updating the ProgressBar
//Updating the Seek Bar(When Song Approaches automatically)
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

//Updating the Seek Bar(When Song is Skipped)
myProgressBar.addEventListener('input',(e)=>{
    console.log(e)
    audioElement.currentTime=((myProgressBar.value*audioElement.duration)/100);
})


//Make all the small play icons change to pause and vice versa

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
         element.classList.remove('fa-pause-circle');
         element.classList.add('fa-play-circle');
        
    })
}


//Playing Songs from the list function
const playNewAudio = () => {
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    currentSongIndex = songIndex;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

const pauseNewAudio = () => {
    masterSongName.innerText=songs[songIndex].songName;//Default Song name after page reload
    audioElement.src=`songs/${songIndex+1}.mp3`;
    currentSongIndex = songIndex;
    audioElement.pause();
    gif.style.opacity=0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            if (audioElement.paused && (audioElement.currentTime > 0) && (currentSongIndex === parseInt(e.target.id))) {
                audioElement.play()
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            } else {
                makeAllPlays()
                songIndex=parseInt(e.target.id);
                playNewAudio()
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
            }
        } else if (!audioElement.paused && !(currentSongIndex === parseInt(e.target.id))) {
            audioElement.pause();
            makeAllPlays()
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            songIndex=parseInt(e.target.id)
            playNewAudio();
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity=0;
        }
    })
})



document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=8){
        songIndex=8;
    }
    else{
        songIndex+=1;
    }
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
)
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
