let insertHeaderRow = true;

function createContact() {
    let isValid = validate();
    let errorMessage = document.getElementById("error");
    if (isValid) {
        if (insertHeaderRow) {
            createHeaders();
            insertHeaderRow = false;
        }

        let tableBody = document.getElementById('contactTable');
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;

        let row = tableBody.insertRow(-1);
        row.insertCell(-1).appendChild(document.createTextNode(name));
        row.insertCell(-1).appendChild(document.createTextNode(phone));
        row.insertCell(-1).appendChild(document.createTextNode(email));

        document.getElementById("contact").reset();
        errorMessage.style.display = "none";
    } else {
        errorMessage.style.display = "block";
    }
}


function validate() {
    let name = document.getElementById('name').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let email = document.getElementById('email').value.trim();
    let errorMessage = document.getElementById("error");
    errorMessage.style.display = "hidden";

    let nameRegex = /^[A-Za-z]+$/;
    let phoneRegex = /^[0-9]+$/;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (name === '' || phone === '' || email === '' || !name.match(nameRegex) || name.length > 20 || !phone.match(phoneRegex) || phone.length != 10 || !email.match(emailRegex) || email.length > 100) {
        errorMessage.style.display = "block";
        return false;
    }

    errorMessage.style.display = "hidden";
    return true;
}

function createHeaders() {
    let tableBody = document.getElementById('contactTable');
    let row = tableBody.insertRow(-1);
    row.insertCell(-1).innerHTML = "<b>Name</b>";
    row.insertCell(-1).innerHTML = "<b>Phone</b>";
    row.insertCell(-1).innerHTML = "<b>Email</b>";
}

function filter(sortByElement) {
    let tableBody = document.getElementById("contactTable");
    let rows = Array.from(tableBody.rows).slice(1); 
    rows.sort((a, b) => {
        let aText = a.cells[sortByElement].textContent.toLowerCase();
        let bText = b.cells[sortByElement].textContent.toLowerCase();
        return aText.localeCompare(bText);
    });

    tableBody.innerHTML = "";
    tableBody.appendChild(tableBody.rows[0]); 
    rows.forEach(row => tableBody.appendChild(row));
}

function filterName() {
    filter(0);
}

function filterPhone() {
    filter(1);
}

function phoneSearch() {
    let input = document.getElementById("myInput").value.trim().toUpperCase();
    let tableBody = document.getElementById("contactTable");
    let rows = tableBody.rows;
    let noResultMessage = document.getElementById("noResult");

    let hasResults = false;

    for (let index = 1; index < rows.length; index++) {
        let text = rows[index].getElementsByTagName("TD")[1];
        let txtValue = text.textContent || text.innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            rows[index].style.display = "";
            hasResults = true;
        } else {
            rows[index].style.display = "none";
        }
    }

    if (!hasResults) {
        noResultMessage.style.display = "block";
    } else {
        noResultMessage.style.display = "none";
    }
}