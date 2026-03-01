


let users = JSON.parse(localStorage.getItem("Users")) || []; // number of users 
//console.log(users[0].id); 
console.log(users); 


let activeUsers = JSON.parse(localStorage.getItem("doneOrders")) || []; // number of doneorer 
console.log(activeUsers[0].customerId); 
console.log(activeUsers); 



let contacts = JSON.parse(localStorage.getItem("orders")) || []; // number of contacts 
// compare if idUser == orderCustomerId so he is an active user 

let matchedUsers = users.filter(user =>
  activeUsers.some(order => order.customerId == user.id)
);

console.log(matchedUsers.length);


const dashboardData = {
    totalUsers : {
        current : users.length ,
        lastMonth :users.length
    },
    activeUseres:{
        current :matchedUsers.length,
        lastMonth : matchedUsers.length
    },
    newRegistrations:{
        current:users.length-1,
        lastMonth : users.length-1
    },

    blockedUsers :{
         current:300,
        lastMonth : 260
    }


};









function calculatePercent(current ,last ){
    return ( ( (current -last) / last) *100 ).toFixed(2);
  };

  // data of total users

document.getElementById("totalUsers").innerText = dashboardData.totalUsers.current.toLocaleString();

document.getElementById("totalPrecent").innerText =  "+" +
  calculatePercent(dashboardData.totalUsers.current ,  dashboardData.totalUsers.lastMonth ) +"%";

  document.getElementById("lastusers").innerText = dashboardData.totalUsers.lastMonth.toLocaleString();


  // data of active users


document.getElementById("activeUsers").innerText = dashboardData.activeUseres.current.toLocaleString() ;

 document.getElementById("activePercent").innerText =  "+" + 
 calculatePercent(dashboardData.activeUseres.current ,  dashboardData.activeUseres.lastMonth ) +"%";

 document.getElementById("lastactiveusers").innerText = dashboardData.activeUseres.lastMonth.toLocaleString();

  // data of new Registrations 


document.getElementById("newRegistrations").innerText = dashboardData.newRegistrations.current.toLocaleString() ;


 document.getElementById("Registrationspercent").innerText =  "+" + 
 calculatePercent(dashboardData.newRegistrations.current ,  dashboardData.newRegistrations.lastMonth ) +"%";

document.getElementById("lastRegistrations").innerText = dashboardData.newRegistrations.lastMonth.toLocaleString();

 // data of Blocks

// document.getElementById("blockusres").innerText = dashboardData.blockedUsers.current.toLocaleString() ;


//  document.getElementById("blockusrespercent").innerText =  "+" + 
//  calculatePercent(dashboardData.newRegistrations.current ,  dashboardData.blockedUsers.lastMonth ) +"%";

// document.getElementById("blocklastmonth").innerText = dashboardData.blockedUsers.lastMonth.toLocaleString();

// const ctx = document.getElementById('revenueChart').getContext('2d');

// // Create gradient
// const gradient = ctx.createLinearGradient(0, 0, 0, 400);
// gradient.addColorStop(0, '#6C5DD3');
// gradient.addColorStop(1, '#A066FF');

// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
//     datasets: [{
//       data: [120000,350000,450000,120000,200000,180000,200000,120000,250000,350000,250000,180000],
//       backgroundColor: gradient,
//       borderRadius: 10,
//       borderSkipped: false,
//       barThickness: 30
//     }]
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: '#111',
//         titleColor: '#fff',
//         bodyColor: '#fff'
//       }
//     },


// ------------Retention Rate--------------------
// const ctx2 = document.getElementById('retentionChart').getContext('2d');

// new Chart(ctx2, {
//   type: 'bar',
//   data: {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//     datasets: [
//       {
//         label: 'SMEs',
//         data: [20, 35, 30, 10, 8, 12],
//         backgroundColor: '#f5ab1e',
//         borderRadius: 8,
//         borderSkipped: false,
//         stack: 'stack1'
//       },
//       {
//         label: 'Startups',
//         data: [15, 25, 20, 25, 12, 15],
//         backgroundColor: '#f2c36d',
//         borderRadius: 8,
//         borderSkipped: false,
//         stack: 'stack1'
//       },
//       {
//         label: 'Enterprises',
//         data: [25, 40, 35, 30, 18, 20],
//         backgroundColor: '#efd7aa',
//         borderRadius: 8,
//         borderSkipped: false,
//         stack: 'stack1'
//       }
//     ]
//   },
//   options: {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           boxWidth: 12,
//           usePointStyle: true,
//           pointStyle: 'rect'
//         }
//       },
//       tooltip: {
//         backgroundColor: '#111',
//         titleColor: '#fff',
//         bodyColor: '#fff'
//       }
//     },
//     scales: {
//       x: {
//         stacked: true,
//         grid: { display: false }
//       },
//       y: {
//         stacked: true,
//         grid: { display: false },
//         ticks: { display: false }
//       }
//     }
//   }
// });

 // ------------Revenue--------------------
const ctx = document.getElementById('revenueChart').getContext('2d');



//----------------break-----------------

// ===== Data =====
// const dataSets = {
//   today: {
//     labels: ['6AM','9AM','12PM','3PM','6PM','9PM'],
//     data: [2000, 5000, 8000, 6000, 9000, 7000]
//   },
//   week: {
//     labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
//     data: [12000,19000,15000,22000,18000,25000,21000]
//   },
//   month: {
//     labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
//     data: [120000,350000,450000,120000,200000,180000,300000,120000,250000,350000,250000,180000]
//   }
// };


// to transformation from 24 hours to 12 hours
function formatHour(date) {
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return hours + ampm;
}



function getRevenueData() {
// range by 3 hours
  const fixedHours = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
 
  let todayData = {};
  fixedHours.forEach(h => todayData[h] = 0); // to zero hours
   
  // start with data by zero 
  let weekData = { Mon:0,Tue:0,Wed:0,Thu:0,Fri:0,Sat:0,Sun:0 };
  let monthData = { Jan:0,Feb:0,Mar:0,Apr:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0 };

// get day 
  let today = new Date().toDateString();
  // console.log(today)


  //loop orders and 
  for (let order of activeUsers) {
   
   // convert date to object
    let orderDate = new Date(order.createdAt.replace(" ", "T"));


    // ===== Today =====
    if (orderDate.toDateString() == today) {
  let hourNum = orderDate.getHours();
  let hourKey = null;

  if (hourNum >= 0 && hourNum < 3) hourKey = '12AM';
  else if (hourNum >= 3 && hourNum < 6) hourKey = '3AM';
  else if (hourNum >= 6 && hourNum < 9) hourKey = '6AM';
  else if (hourNum >= 9 && hourNum < 12) hourKey = '9AM';
  else if (hourNum >= 12 && hourNum < 15) hourKey = '12PM';
  else if (hourNum >= 15 && hourNum < 18) hourKey = '3PM';
  else if (hourNum >= 18 && hourNum < 21) hourKey = '6PM';
  else if (hourNum >= 21) hourKey = '9PM';

  if (hourKey) todayData[hourKey] += Number(order.total);
}
 


    // ===== Week =====
    let dayName = orderDate.toLocaleString("en-US", { weekday: "short" });
    if (weekData[dayName] != undefined) {
      weekData[dayName] += order.total;
    }

    // ===== Month =====
    let monthName = orderDate.toLocaleString("en-US", { month: "short" });
    monthData[monthName] += order.total;
  }
// return result   
  return {
    today: {
      labels: Object.keys(todayData),
      data: Object.values(todayData)
    },
    week: {
      labels: Object.keys(weekData),
      data: Object.values(weekData)
    },
    month: {
      labels: Object.keys(monthData),
      data: Object.values(monthData)
    }
  };
}

let dataSets = getRevenueData();

//----------break-----------------




// ===== Gradient =====
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#f5ab1e');
gradient.addColorStop(1, '#f2c36d');

// ===== Create Chart =====
const revenueChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: dataSets.month.labels,
    datasets: [{
      data: dataSets.month.data,
      backgroundColor: gradient,
      borderRadius: 12,
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: '#eee' },
        ticks: {
          callback: function(value) {
            return value >= 1000 ? value/1000 + 'K' : value;
          }
        }
      }
    }
  }
});

// ===== Button Function =====

function updateChart(type) {
  const dataSets = getRevenueData();
  revenueChart.data.labels = dataSets[type].labels;
  revenueChart.data.datasets[0].data = dataSets[type].data;
  revenueChart.update();
}

// ===== Events =====
document.getElementById('todayBtn').onclick = () => updateChart('today');
document.getElementById('weekBtn').onclick = () => updateChart('week');
document.getElementById('monthBtn').onclick = () => updateChart('month');






// let product = JSON.parse(localStorage.getItem("products"))
// console.log(product)

// product.forEach(

// )

let product = JSON.parse(localStorage.getItem("products")) // fetch of products to get rating 

let totalRating = 0

product.forEach(item => {
  totalRating += item._rating
})

let averageRating = totalRating / product.length

console.log(averageRating)



//----------------Sales Pipeline Overview and deals ---------
const getDashboardData =  {
  
closeDeals : 26 , 
pipelineValue :5200000,
conversation : 17,
salesTotal : 256054.50 ,
pipeline :{
  leads :124, 
  prospectts :90,
  opporunities :42,
  closed: 23 
},
meeting : [
  {title : "HR" , time : "06:00 - 07:00"},
  {title : "Team Stand Up" , time : "06:00 - 07:00"},
  {title : "All Hands Meeting " , time : "06:00 - 07:00"}
],
totalcontact:{current: contacts.length,
              lastMonth : contacts.length

},
}


  document.getElementById("avargerating").innerText =  averageRating.toFixed(1) + " % " ;


// Deals Overview

//document.getElementById("closeDeals").innerText = getDashboardData.closeDeals;

//document.getElementById("pipelineValue").innerText = "$" + (getDashboardData.pipelineValue / 1000000 ) + "M" ;

//document.getElementById("conversionRate").innerText = getDashboardData.conversation + "%";

// pipeline 

// document.getElementById("salesTotal").innerText = "$" + getDashboardData.salesTotal.toLocaleString() ; 

// document.getElementById("leads").innerText = getDashboardData.pipeline.leads ;

// document.getElementById("prospects").innerText = getDashboardData.pipeline.prospectts ;

// document.getElementById("opportunities").innerText = getDashboardData.pipeline.opporunities ;

// document.getElementById("closed").innerText = getDashboardData.pipeline.closed ;



//-----------------------

// number of doneorer  and this is mean total contact
document.getElementById("totalcontact").innerText = getDashboardData.totalcontact.current.toLocaleString();
document.getElementById("lasttotalcontact").innerText = getDashboardData.totalcontact.lastMonth.toLocaleString();



document.getElementById("totalcontactPrecent").innerText =  "+" +
  calculatePercent(getDashboardData.totalcontact.current ,  getDashboardData.totalcontact.lastMonth ) +"%";


