fetch('http://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const longPostTitles = posts
      .map(post => post.title)
      .filter(title => title.split(' ').length > 6);

    console.log(longPostTitles);
    console.log("The posts have more than 6 words:")
  })
  .catch(error => console.error(error));