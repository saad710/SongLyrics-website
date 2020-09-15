function getResult(){

    const songName = document.getElementById("lyrics-search").value;
    const getSearch = document.getElementById("get-search").innerHTML = '';
    const singleLyrics = document.getElementById("single-lyrics").innerHTML = '';

    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
        .then(res => res.json())
        .then(d => {
            const song = d.data;
            for(let i=0; i<10; i++){
                const songName = song[i];
                const title = songName.title;
                const artist = songName.artist.name;
                const picture = songName.artist.picture_small;

                const getSearch = document.getElementById('get-search');
                getSearch.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
                                    <div class="col-md-2">
                                    <img class="img-thumbnail" src="${picture}">
                                    </div>
                                    <div class="col-md-7">
                                        <h3 class="lyrics-name">${title}</h3>
                                        <p class="author lead">Album by <span>${artist}</span></p>
                                    </div>
                                    <div class="col-md-3 text-md-right text-center">
                                        <button onclick="getLyrics('${artist}','${title}')" class="btn btn-info">Get Lyrics</button>
                                    </div>
                                    </div>`

     }

    })

}

function getLyrics(artist,title){
  
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const Lyrics = data.lyrics;
            const lyricDisplay = document.getElementById("single-lyrics");
            lyricDisplay.innerHTML = `<h2 class="text-success mb-4">${title} - ${artist}</h2>
                                        <pre class="lyric text-white">${Lyrics}</pre>`

            document.getElementById("get-search").innerHTML = "";
    })
}