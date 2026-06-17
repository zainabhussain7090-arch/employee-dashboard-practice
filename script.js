let employees =
JSON.parse(localStorage.getItem("employees")) || [];
let editId = null;
const form = document.getElementById("employeeForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const departmentInput = document.getElementById("department");
const designationInput = document.getElementById("designation");
const joiningDateInput = document.getElementById("joiningDate");
const tableBody =
document.getElementById("employeeTableBody");
const searchInput =
document.getElementById("searchInput");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    clearErrors();

    let isValid = true;

    if (nameInput.value.trim() === "") {
        document.getElementById("nameError").textContent =
            "Full Name is required";
        isValid = false;
    }

    if (emailInput.value.trim() === "") {
        document.getElementById("emailError").textContent =
            "Email is required";
        isValid = false;
    } else {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value)) {

            document.getElementById("emailError").textContent =
                "Enter a valid email";

            isValid = false;
        }
    }

    if (departmentInput.value === "") {
        document.getElementById("departmentError").textContent =
            "Department is required";
        isValid = false;
    }

    if (designationInput.value.trim() === "") {
        document.getElementById("designationError").textContent =
            "Designation is required";
        isValid = false;
    }

    if (joiningDateInput.value === "") {
        document.getElementById("joiningDateError").textContent =
            "Joining Date is required";
        isValid = false;
    }
if (isValid) {

    const employee = {

        id: editId || Date.now(),

        name: nameInput.value,

        email: emailInput.value,

        department: departmentInput.value,

        designation: designationInput.value,

        joiningDate: joiningDateInput.value
    };
if (editId) {

    employees = employees.map(emp =>
        emp.id === editId ? employee : emp
    );

    editId = null;

} else {

    employees.push(employee);
}

saveEmployees();

renderEmployees();

form.reset();
   }

});

function clearErrors() {

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("departmentError").textContent = "";
    document.getElementById("designationError").textContent = "";
    document.getElementById("joiningDateError").textContent = "";
}
function renderEmployees() {

    tableBody.innerHTML = "";

    employees.forEach(employee => {

        tableBody.innerHTML += `
<tr>
    <td>${employee.name}</td>
    <td>${employee.email}</td>
    <td>${employee.department}</td>
    <td>${employee.designation}</td>
    <td>${employee.joiningDate}</td>
    <td>
    <button onclick="editEmployee(${employee.id})">
        Edit
    </button>

    <button onclick="deleteEmployee(${employee.id})">
        Delete
    </button>
</td>
</tr>
`;
    });

    updateStats();
}

function renderFilteredEmployees(data) {

    tableBody.innerHTML = "";

    data.forEach(employee => {

        tableBody.innerHTML += `
        <tr>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.designation}</td>
            <td>${employee.joiningDate}</td>
            <td>
                <button onclick="deleteEmployee(${employee.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

}
function updateStats() {

    document.getElementById("totalEmployees").textContent =
        employees.length;

    document.getElementById("itEmployees").textContent =
        employees.filter(emp => emp.department === "IT").length;

    document.getElementById("hrEmployees").textContent =
        employees.filter(emp => emp.department === "HR").length;

    document.getElementById("marketingEmployees").textContent =
        employees.filter(emp => emp.department === "Marketing").length;
}
function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}
function deleteEmployee(id) {

    employees = employees.filter(
        employee => employee.id !== id
    );

    saveEmployees();

    renderEmployees();
}
function editEmployee(id) {

    const employee = employees.find(
        emp => emp.id === id
    );

    nameInput.value = employee.name;
    emailInput.value = employee.email;
    departmentInput.value = employee.department;
    designationInput.value = employee.designation;
    joiningDateInput.value = employee.joiningDate;

    editId = id;
}
renderEmployees();
searchInput.addEventListener("input", function() {

    const value =
    searchInput.value.toLowerCase();

    const filteredEmployees =
    employees.filter(employee =>

        employee.name.toLowerCase().includes(value)

        ||

        employee.department.toLowerCase().includes(value)

    );

    renderFilteredEmployees(filteredEmployees);

});