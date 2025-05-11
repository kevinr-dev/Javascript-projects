const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const todayDate = `${year}-${month}-${day}`;
document.getElementById("defaultDate").value = todayDate;

document.getElementById("chartContainer").style.display = 'none';
document.getElementById("chartMenu").style.display = 'none';
dateToDateView('none');

let Categories = ["Utilities"];
let Expenses = [];
let index = 0;
let data = new Map();

load();

function addExpense()
{
    const name = document.getElementById('expenseName').value;
    const category = document.getElementById('Category').value;
    const expenseDate = document.getElementById('defaultDate').value;
    const amount = document.getElementById('amount').value;

    add(name, category, expenseDate, amount);

    Expenses.push([name, category, expenseDate, amount]);

    save();

    document.getElementById('expenseName').value = "";
    document.getElementById('amount').value = "";
}

function add(name, category, expenseDate, amount)
{
    let row = document.createElement('tr');

    const expenseName = document.createElement('td');
    expenseName.textContent = name;
    row.appendChild(expenseName);


    const expenseCategory = document.createElement('td');
    expenseCategory.textContent = category;
    row.appendChild(expenseCategory);


    const expenseNewDate = document.createElement('td');
    expenseNewDate.textContent = expenseDate;
    row.appendChild(expenseNewDate);


    const expenseAmount = document.createElement('td');
    expenseAmount.textContent = amount;
    row.appendChild(expenseAmount);

    let expenseButtonContainer = document.createElement('td');

    let del = document.createElement('button');
    del.value = index;
    del.innerHTML = "Delete";

    del.addEventListener('click', function() {
        removeRow(del.value);
    });
    index++;
    expenseButtonContainer.appendChild(del);
    row.appendChild(expenseButtonContainer);

    document.getElementById('bodyTable').appendChild(row);
}


function addCategory()
{
    const newCategory = document.getElementById("newCategory").value;

    let newOption = document.createElement('option');
    newOption.textContent = newCategory;
    let newOption2 = document.createElement('option');
    newOption2.textContent = newCategory;

    document.getElementById("Category").appendChild(newOption);
    document.getElementById("Filter").appendChild(newOption2);
    Categories.push(newCategory);
    document.getElementById("newCategory").value = "";
}

function removeRow(i)
{
    Expenses.splice(i, 1);
    reloadRows();
}

function reloadRows()
{
    document.getElementById('bodyTable').innerHTML = "";
    index = 0;

    Expenses.forEach(element => {
        add(element[0], element[1], element[2], element[3])
    });

    save();
}

function filterTable() {
    const filterInput = document.getElementById('Filter');
    const list = document.getElementById('bodyTable');
    const items = list.getElementsByTagName('tr');
    let filterValue = filterInput.value.toLowerCase();

    for (let i = 0; i < items.length; i++) {
        let row = items[i];
        let innerItems = row.getElementsByTagName('td');
        let rowVisible = false;

        for (let x = 0; x < innerItems.length; x++) {
            let val = innerItems[x];
            let valText = val.innerHTML || val.textContent;

            if(filterValue === 'Show All'.toLowerCase()) {
                rowVisible = true;
                break;
            }


            if (valText.toLowerCase() === filterValue) {
                rowVisible = true;
                break;
            }
        }
        row.style.display = rowVisible ? '' : 'none';
    }
}

function changeView()
{
    const viewOptions = document.getElementById('View');

    if(viewOptions.value == "Table")
    {
        document.getElementById("tableContainer").style.display = '';
        document.getElementById("main-side").style.display = '';
        document.getElementById("chartContainer").style.display = 'none';
        document.getElementById("chartMenu").style.display = 'none';
        dateToDateView('none');
    }
    else{
        document.getElementById("tableContainer").style.display = 'none';
        document.getElementById("main-side").style.display = 'none';
        document.getElementById("chartContainer").style.display = '';
        document.getElementById("chartMenu").style.display = '';
        chartLoad();
    }
}

function chartLoad()
{
    data = new Map();

    Categories.forEach(category => {
        data.set(category, []);
    });

    Expenses.forEach(expense => {
        const name = expense[0];
        const category = expense[1];
        const expenseDate = expense[2];
        const amount = expense[3];

        data.get(category).push({name, expenseDate, amount});
    });

    let labels = [];
    let amounts = [];
    let tempAmount = 0;
    data.forEach((category, key) => {
        labels.push(key);
        category.forEach(value => {
            tempAmount = Number(tempAmount) + Number(value.amount);
        });
        amounts.push(tempAmount);
        tempAmount = 0;
    });
    loadChartInfo("pie",labels, amounts,"pieChart", "Total Expenses");
    loadChartInfo("bar",labels, amounts, "barChart", "Total Expenses");
    monthToMonthChart();
}



function loadChartInfo(chartType, labels, data, chartId, txt)
{
    const backgroundColors = ['#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e', '#d35400', '#7f8c8d', '#27ae60', '#8e44ad'];


    new Chart(chartId, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: backgroundColors,
            data: data
          }]
        },
        options: {
          maintainAspectRatio: false,
          aspectRatio: 1.5,
          legend: {display: false},
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
      
          title: {
            display: true,
            text: txt
          }
        }
    });
}

function loadChartDateToDate()
{
    let labels = [];
    let amounts = [];
    let tempAmount = 0;

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    data.forEach((category, key) => {
        labels.push(key);
        category.forEach(value => {
            let date = value.expenseDate;
            if(dateInRange(date, startDate, endDate))
            {
                tempAmount = Number(tempAmount) + Number(value.amount);
            }
        });
        amounts.push(tempAmount);
        tempAmount = 0;
    });

    loadChartInfo("pie",labels, amounts,"dtdpieChart", "Date To Date");
    loadChartInfo("bar",labels, amounts,"dtdbarChart", "Date To Date");
    dateToDateView('');
}

function dateInRange(givenDate, startDate, endDate)
{
    let date = new Date(givenDate);
    let start = new Date(startDate);
    let end = new Date(endDate);
    return date >= start && date <= end;
}

function dateToDateView(state)
{
    document.getElementById("dtdpieChart").style.display = state;
    document.getElementById("dtdbarChart").style.display = state;
}

function monthToMonthChart()
{
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    
    let labels = [];
    let amounts = [];
    let totalAmount = 0;
    let filledAmounts = 0;

    for (let month = 0; month < 12; month++) 
    {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        let amount = 0;

        data.forEach((category, key) => {
            let filled = false;
            category.forEach(value => {
                let date = value.expenseDate;
                if(dateInRange(date, startDate, endDate))
                {
                    filled = true;
                    amount = Number(amount) + Number(value.amount);
                    totalAmount = Number(totalAmount) + Number(value.amount);
                }
            });
            if (filled) {
                filledAmounts++;
            }
        });
        labels.push(months[month]);
        amounts.push(amount);
        amount = 0;
    }

    loadChartInfo("bar",labels, amounts,"monthlyChart", "Monthly Chart");
    totalAmount = totalAmount / filledAmounts;
    document.getElementById("monthlyAverage").innerHTML = "Monthly Average: £" + totalAmount.toFixed(2);
    document.getElementById("yearlyPrediction").innerHTML = "Yearly Prediction: £" + (totalAmount * 12).toFixed(2) + " (Based on monthly average)";
}

function save()
{
    const data = {
        categories: Categories,
        expenses: Expenses
    };

    try {
        localStorage.setItem('data', JSON.stringify(data));
        onsole.log(data);
    }
    catch (error) {
        console.log(error);
    }
}

function load()
{
    try {
        const savedData = JSON.parse(localStorage.getItem('data'));
        Categories = savedData.categories;
        Expenses = savedData.expenses;
        reloadRows();
    }
    catch (error) {
        console.log(err);
    }
}