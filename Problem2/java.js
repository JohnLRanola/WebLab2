fetch('http://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const longTitles = posts
      .map(post => post.title)
      .filter(title => title.split(' ').length > 6)
      .join('\n'); 
      
    console.log("The posts have more than 6 words:");
    console.log(longTitles);
  })
  .catch(error => console.error(error));
