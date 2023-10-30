function getInfo() {
    const username = document.getElementById('username').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    const reposList = document.getElementById('repos');
    reposList.innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const userInfo = document.getElementById('user');
            userInfo.innerHTML = `
                <img src="${data.avatar_url}" alt="Avatar">
                <h2>${data.login}</h2>
                <p>Name: ${data.name || 'N/A'}</p>
                <p>Username: ${data.login}</p>
                <p>Email: ${data.email || 'N/A'}</p>
                <p>Location: ${data.location || 'N/A'}</p>
                <p>Number of Gists: ${data.public_gists}</p>
                <h3>Repositories:</h3>
            `;

            fetch(data.repos_url)
                .then(response => response.json())
                .then(repos => {
                    repos.slice(0, 5).forEach(repo => {
                        const li = document.createElement('li');
                        li.textContent = `${repo.name} - ${repo.description || 'No description was provided'}`;
                        reposList.appendChild(li);
                    });
                });
        })
        .catch(error => {
            console.error('Error:', error);
            const userInfo = document.getElementById('user');
            userInfo.innerHTML = 'Error: User not available.';
        });
}
