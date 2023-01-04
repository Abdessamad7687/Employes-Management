let fname = document.getElementById('fname'),
    lname = document.getElementById('lname'),
    email = document.getElementById('email'),
    phone = document.getElementById('phone')
submit = document.getElementById('submit')


let arrayOfEmployes 

let Mode = "create"

let TmpId  // temporary variable to save the employe id 

// let's save informations in localstorage

if(localStorage.arrayOfEmployes != null){
    arrayOfEmployes = JSON.parse(localStorage.getItem('arrayOfEmployes'))
}
else{
     arrayOfEmployes = []
}



submit.addEventListener('click', function (e) {
    if(Mode === "create"){

        let EmployeObject = {
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            phone: phone.value
        }
        arrayOfEmployes.push(EmployeObject)
        localStorage.setItem('arrayOfEmployes', JSON.stringify(arrayOfEmployes))
        console.log(arrayOfEmployes)
        DispayInfos()
        clearText()
    }
    else{
        submit.textContent = "Update"
        UpdateEmploye(TmpId)  // here we replace id with TmpId var because id is local variable
        DispayInfos()
        submit.textContent = "Create"
        Mode = "create"
    }
    e.preventDefault()
})

function DispayInfos() {
    let table = ''
    for (let index = 0; index < arrayOfEmployes.length; index++) {
        table += `
        <tr>
            <th scope="row">${index}</th>
            <td>${arrayOfEmployes[index].fname}</td>
            <td>${arrayOfEmployes[index].lname}</td>
            <td>${arrayOfEmployes[index].email}</td>
            <td>${arrayOfEmployes[index].phone}</td>
            <td>
                <button class="btn btn-warning" onclick="UpdateEmploye(${index})">Edit</button>
                <button class="btn btn-danger" onclick="DeleteEmploye(${index})">Remove</button>
            </td>
        </tr>
        `
        document.getElementById('tbody').innerHTML = table
    }
}
function clearText() {
        fname.value = "",
        lname.value = "",
        email.value = "",
        phone.value = ""
}


// to delete an employe we should identify him by id

function DeleteEmploye(id) {
    arrayOfEmployes.splice(id, 1) // deleting 
    localStorage.setItem('arrayOfEmployes', JSON.stringify(arrayOfEmployes)) // update localstorage
    DispayInfos() // displaying informations after deleting
}



function UpdateEmploye(id) {
    TmpId = id
    Mode = "update"
    submit.textContent = "Update"
    // also to modify an employe infos we sould find him by id 


    let EmployeObject = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        phone: phone.value
    }
       fname.value = arrayOfEmployes[id].fname
       lname.value = arrayOfEmployes[id].lname
       email.value = arrayOfEmployes[id].email
       phone.value = arrayOfEmployes[id].phone

       arrayOfEmployes[TmpId] = EmployeObject
        localStorage.setItem('arrayOfEmployes', JSON.stringify(arrayOfEmployes))
}


DispayInfos()


