fetch('http://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(posts => {

  const words = posts
    .map(post => post.body)
    .flatMap(body => body.split(/\s+/)); 

  const freqMap = words.reduce((Map, word) => {
    Map[word] = (Map[word] || 0) + 1;
    return Map;
  }, {});

  console.log("Here is a word frequency map:")
  console.log(freqMap);
})
.catch(error => console.error(error));
