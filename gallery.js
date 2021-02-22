var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'gallery');

    var anchorTag = document.createElement('a');
    anchorTag.setAttribute('target', '_blank');
    anchorTag.setAttribute('href','#');


    var img = document.createElement('img');
    img.setAttribute('width','600');
    img.setAttribute('height','400');
    img.setAttribute('alt',' ');
    img.setAttribute('src',' ');

    anchorTag.appendChild(img);
    mainDiv.appendChild(anchorTag);

    console.log("element", mainDiv);


  function getImages(){
    var listRef = firebase.storage().ref().child('/')
    listRef.listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        // console.log("images=>",res)
      });
      res.items.forEach((imageRef) => {
        // All the items under listRef.
        imageRef.getDownloadURL().then(function(imageUrl){
        createGallery(imageUrl)
      }).catch(function(err){
        console.log("url error",err)
        })
      });
    }).catch((error) => {
        // Uh-oh, an error occurred!
        console.log("err",error)
    });
  }


function createGallery(url){
    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'gallery');

    var anchorTag = document.createElement('a');
    anchorTag.setAttribute('target', '_blank');
    anchorTag.setAttribute('href',url);


    var img = document.createElement('img');
    img.setAttribute('width','600');
    img.setAttribute('height','400');
    img.setAttribute('alt',' ');
    img.setAttribute('src',url);

    anchorTag.appendChild(img);
    mainDiv.appendChild(anchorTag);

    document.body.appendChild(mainDiv);
}
