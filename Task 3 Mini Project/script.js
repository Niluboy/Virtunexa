// declare the variables
const goalForm = document.getElementById('goal-form');
const expenseForm = document.getElementById('expense-form');
const goalNameInput = document.getElementById('goal-name');
const goalAmountInput = document.getElementById('goal-amount');
const goalDeadlineInput = document.getElementById('goal-deadline');
const expenseDescriptionInput = document.getElementById('expense-description');
const expenseAmountInput = document.getElementById('expense-amount');
const goalList = document.getElementById('goal-list');
const expenseList = document.getElementById('expense-list');
const chartContainer = document.getElementById('chart-container');
const progressChartElement = document.getElementById('progressChart');

let goals = [];
let expenses = [];
let chart;

// goal event
goalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const goalName = goalNameInput.value.trim();
    const goalAmount = parseFloat(goalAmountInput.value);
    const goalDeadline = parseInt(goalDeadlineInput.value);

    if (goalName && !isNaN(goalAmount) && !isNaN(goalDeadline)) {
        const newGoal = {
            name: goalName,
            targetAmount: goalAmount,
            deadline: goalDeadline,
            progress: 0
        };
        goals.push(newGoal);
        displayGoals();
        updateChart();
        goalForm.reset();
    } else {
        alert('Please fill in all fields correctly.');
    }
});

// expence event
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const expenseDescription = expenseDescriptionInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (expenseDescription && !isNaN(expenseAmount)) {
        const newExpense = {
            description: expenseDescription,
            amount: expenseAmount
        };
        expenses.push(newExpense);
        displayExpenses();
        updateChart();
        expenseForm.reset();
    } else {
        alert('Please enter valid expense details.');
    }
});

// Display Goals
function displayGoals() {
    goalList.innerHTML = '<ul>' + goals.map(goal => {
        return `<li><strong>${goal.name}</strong><br>Target: $${goal.targetAmount} | Deadline: ${goal.deadline} months</li>`;
    }).join('') + '</ul>';
}

// Display Expenses
function displayExpenses() {
    expenseList.innerHTML = '<ul>' + expenses.map(exp => {
        return `<li><strong>${exp.description}</strong><br>Amount: $${exp.amount}</li>`;
    }).join('') + '</ul>';
}

// update the chart
function updateChart() {
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

    const progress = Math.min((totalExpense / totalGoalAmount) * 100, 100); // Limit progress to 100%

    if (!chart) {
        chart = new Chart(progressChartElement, {
            type: 'doughnut',
            data: {
                labels: ['Total Expenses', 'Remaining Goal'],
                datasets: [{
                    data: [totalExpense, totalGoalAmount - totalExpense],
                    backgroundColor: ['#4caf50', '#e0e0e0'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                if (tooltipItem.datasetIndex === 0) {
                                    return `Expenses: $${tooltipItem.raw}`;
                                } else {
                                    return `Remaining Goal: $${tooltipItem.raw}`;
                                }
                            }
                        }
                    }
                },
                cutoutPercentage: 70, // Make it a doughnut chart
                rotation: 90 // Adjust rotation
            }
        });
    } else {
        // update chart data if already exists
        chart.data.datasets[0].data = [totalExpense, totalGoalAmount - totalExpense];
        chart.update();
    }
}
