document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function updateUI() {
        expenseList.innerHTML = "";
        let total = 0;
        expenses.forEach((expense, index) => {
            total += parseFloat(expense.amount);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount} PKR</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" onclick="editExpense(${index})">✏️</button>
                    <button class="delete-btn" onclick="deleteExpense(${index})">❌</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
        totalAmount.innerText = total;
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("expense-name").value;
        const amount = document.getElementById("expense-amount").value;
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (name && amount && date) {
            expenses.push({ name, amount, category, date });
            updateUI();
            form.reset();
        }
    });

    window.deleteExpense = function (index) {
        expenses.splice(index, 1);
        updateUI();
    };

    window.editExpense = function (index) {
        const expense = expenses[index];
        document.getElementById("expense-name").value = expense.name;
        document.getElementById("expense-amount").value = expense.amount;
        document.getElementById("expense-category").value = expense.category;
        document.getElementById("expense-date").value = expense.date;
        expenses.splice(index, 1);
        updateUI();
    };

    updateUI();
});