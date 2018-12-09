// Listen for form submit
document.getElementById('myForm').addEventListener('submit', function(e) {
  //Prevent Form from Submitting
  e.preventDefault()

  var siteName = document.getElementById('siteName').value
  var siteUrl = document.getElementById('siteUrl').value

  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  } else if (!validator.isURL(siteUrl)) {

    alert("Make Sure you enter the vaild Url")
    return false
  }
  //Make bookmark_object
  var bookmark = {
    name: siteName,
    url: siteUrl
  }



  //Test if bookmark is null

  if (localStorage.getItem('bookmarks') == null) {

    // make and empty array called bookmarks
    var bookmarks = [];
    // push the bookmark object to this array to make array of objects
    bookmarks.push(bookmark)
    // set the object and save it in bookmarks
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  } else {
    // Get bookmarks from localstorage in the shape of object
    var storedBook = JSON.parse(localStorage.getItem('bookmarks'));
    storedBook.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(storedBook))
  }

  fetchBookmarks()

  document.getElementById('siteUrl').value = '';
  document.getElementById('siteName').value = ''

})

//Delete Bookmark
function deleteBookmark(url) {
  // Get bookmark from localstorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  // Loop throught bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}


//Show the output Bookmark to screen
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  //Get output id
  var bookmarkResults = document.getElementById('bookmarks_result');

  //Build output
  bookmarkResults.innerHTML = ''

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default target="_blank" href="' + url + '">Visits</a>' +
      '<a class="btn btn-danger"  onclick="deleteBookmark(\'' + url + '\')">Delete</a>' +
      '</h3>' +
      '</div>';
  }
}
