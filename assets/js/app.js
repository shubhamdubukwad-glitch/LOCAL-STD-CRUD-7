var cl = console.log;

const stdForm = document.getElementById('stdForm');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const age = document.getElementById('age');
const address = document.getElementById('address');
const addstdBtn = document.getElementById('addstdBtn');
const updatestdBtn = document.getElementById('updatestdBtn');
const stdcontainer = document.getElementById('stdcontainer');

// let stdArr = [
//     {
//         fname: "shubham",
//         lname: "dubukwad",
//         age: "21",
//         address: "gudsoor",
//         id: "412"
//     },
//     {
//         fname: "priti",
//         lname: "patil",
//         age: "23",
//         address: "latur",
//         id: "322"
//     },
//     {
//         fname: "sanika",
//         lname: "biradar",
//         age: "25",
//         address: "pune",
//         id: "653"
//     },
//     {
//         fname: "gavrav",
//         lname: "kamble",
//         age: "41",
//         address: "mumbai",
//         id: "632"
//     }

// ];
// localStorage.setItem('stdArr',JSON.stringify(stdArr))

//raed-std //

let stdjson = localStorage.getItem('stdArr')
cl(stdjson)

let stdArr = JSON.parse(localStorage.getItem('stdArr'))
cl(stdArr)

function readstd(eve) {
    let result = ``;
    eve.forEach((eve, i) => {
        result += ` <tr id="${eve.id}">
                                <td>${i + 1}</td>
                                <td>${eve.fname}</td>
                                <td>${eve.lname}</td>
                                <td>${eve.age}</td>
                                <td>${eve.address}</td>
                                <td>
                                <i onclick="editstd(this)" class="fa-solid fa-user-pen fa-2x text-primary" role="button" data-id="${eve.id}" ></i>
                                </td>
                               <td>
                                 <i onclick="deletestd(this)" class="fa-solid fa-user-xmark fa-2x text-danger" role="button" data-id="${eve.id}" ></i>
                                 </td>
                            </tr>`;
    });
    stdcontainer.innerHTML = result;
}
readstd(stdArr);

//create-std//
function oncreatestd(eve) {
    eve.preventDefault()
    let CREATE_OBJ = {
        fname: fname.value,
        lname: lname.value,
        age: age.value,
        address: address.value,
        id: Date.now().toString()
    }
    stdArr.push(CREATE_OBJ)
    stdForm.reset()
    localStorage.setItem('stdArr', JSON.stringify(stdArr))
    let tr = document.createElement('tr');
    tr.innerHTML = `            <td>${stdArr.length}</td>
                                <td>${CREATE_OBJ.fname}</td>
                                <td>${CREATE_OBJ.lname}</td>
                                <td>${CREATE_OBJ.age}</td>
                                <td>${CREATE_OBJ.address}</td>
                                <td>
                                <i onclick="editstd(this)" class="fa-solid fa-user-pen fa-2x text-primary" role="button" data-id="${CREATE_OBJ.id}" ></i>
                                </td>
                               <td>
                                 <i onclick="deletestd(this)" class="fa-solid fa-user-xmark fa-2x text-danger" role="button" data-id="${CREATE_OBJ.id}" ></i>
                                 </td>`
    stdcontainer.append(tr);


    Swal.fire({
        title: "create std",
        text: "You can created student information..!!",
        icon: "success",
        timer: 4000
    });
}
//delete-std//
function deletestd(eve) {
    let DELETE_id = eve.closest('tr').id;
    cl(DELETE_id)
    let getconfermation = confirm(`are you sure can delete your student information ${DELETE_id}`)
    if (getconfermation) {

        let getIndex = stdArr.findIndex(p => p.id === DELETE_id)
        stdArr.splice(getIndex, 1)
        eve.closest('tr').remove()
        localStorage.setItem('stdArr', JSON.stringify(stdArr))
        let allrows = document.querySelectorAll('#stdcontainer tr td:first-child');
        allrows.forEach((ele, i) => { ele.innerText = i + 1 })

        Swal.fire({
            title: "deleted successfully",
            text: "You can deleted student information..!!",
            icon: "success",
            timer: 4000
        });
    }

}

//edit-std//
function editstd(eve) {
    let EDITID = eve.closest('tr').id;
    localStorage.setItem('EDITID', EDITID)
    let EDIT_OBJ = stdArr.find(p => p.id === EDITID)

    fname.value = EDIT_OBJ.fname;
    lname.value = EDIT_OBJ.lname;
    age.value = EDIT_OBJ.age;
    address.value = EDIT_OBJ.address;

    addstdBtn.classList.add('d-none');
    updatestdBtn.classList.remove('d-none');

}

//update-std//
function onupdatestd() {
    let update_id = localStorage.getItem('EDITID')
    localStorage.removeItem('EDITID')
    let update_obj = {
        fname: fname.value,
        lname: lname.value,
        age: age.value,
        address: address.value,
        id: update_id
    }
    let getIndex = stdArr.findIndex(p => p.id === update_id)
    stdArr[getIndex] = update_obj;
    localStorage.setItem('stdArr', JSON.stringify(stdArr))

    let tr = document.getElementById(update_id).children;
    tr[1].innerText = update_obj.fname;
    tr[2].innerText = update_obj.lname;
    tr[3].innerText = update_obj.age;
    tr[4].innerText = update_obj.address;

    stdForm.reset()
    updatestdBtn.classList.add('d-none');
    addstdBtn.classList.remove('d-none');


    Swal.fire({
        title: "updated successfully",
        text: "You can updated student information..!!",
        icon: "success",
        timer: 4000
    });
}
stdForm.addEventListener('submit', oncreatestd);
updatestdBtn.addEventListener('click', onupdatestd);
