

const dashboardData = {
    totalUsers : {
        current : 12560 ,
        lastMonth :10195
    },
    activeUseres:{
        current :8940,
        lastMonth : 7650
    },
    newRegistrations:{
        current:1240,
        lastMonth : 950
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

document.getElementById("blockusres").innerText = dashboardData.blockedUsers.current.toLocaleString() ;


 document.getElementById("blockusrespercent").innerText =  "+" + 
 calculatePercent(dashboardData.newRegistrations.current ,  dashboardData.blockedUsers.lastMonth ) +"%";

document.getElementById("blocklastmonth").innerText = dashboardData.blockedUsers.lastMonth.toLocaleString();











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

//----------------

const ctx2 = document.getElementById('retentionChart').getContext('2d');

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'SMEs',
        data: [20, 35, 30, 10, 8, 12],
        backgroundColor: '#f5ab1e',
        borderRadius: 8,
        borderSkipped: false,
        stack: 'stack1'
      },
      {
        label: 'Startups',
        data: [15, 25, 20, 25, 12, 15],
        backgroundColor: '#f2c36d',
        borderRadius: 8,
        borderSkipped: false,
        stack: 'stack1'
      },
      {
        label: 'Enterprises',
        data: [25, 40, 35, 30, 18, 20],
        backgroundColor: '#efd7aa',
        borderRadius: 8,
        borderSkipped: false,
        stack: 'stack1'
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rect'
        }
      },
      tooltip: {
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false }
      },
      y: {
        stacked: true,
        grid: { display: false },
        ticks: { display: false }
      }
    }
  }
});


const ctx = document.getElementById('revenueChart').getContext('2d');

// ===== Data =====
const dataSets = {
  today: {
    labels: ['6AM','9AM','12PM','3PM','6PM','9PM'],
    data: [2000, 5000, 8000, 6000, 9000, 7000]
  },
  week: {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    data: [12000,19000,15000,22000,18000,25000,21000]
  },
  month: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data: [120000,350000,450000,120000,200000,180000,300000,120000,250000,350000,250000,180000]
  }
};

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
  revenueChart.data.labels = dataSets[type].labels;
  revenueChart.data.datasets[0].data = dataSets[type].data;
  revenueChart.update();
}

// ===== Events =====
document.getElementById('todayBtn').onclick = () => updateChart('today');
document.getElementById('weekBtn').onclick = () => updateChart('week');
document.getElementById('monthBtn').onclick = () => updateChart('month');





const ctx3 = document.getElementById('myChart').getContext('2d');
new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [15, 25, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});





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
]

}


  


// Deals Overview

document.getElementById("closeDeals").innerText = getDashboardData.closeDeals;

document.getElementById("pipelineValue").innerText = "$" + (getDashboardData.pipelineValue / 1000000 ) + "M" ;

document.getElementById("conversionRate").innerText = getDashboardData.conversation + "%";

// pipeline 

document.getElementById("salesTotal").innerText = "$" + getDashboardData.salesTotal.toLocaleString() ; 

document.getElementById("leads").innerText = getDashboardData.pipeline.leads ;

document.getElementById("prospects").innerText = getDashboardData.pipeline.prospectts ;

document.getElementById("opportunities").innerText = getDashboardData.pipeline.opporunities ;

document.getElementById("closed").innerText = getDashboardData.pipeline.closed ;



//-----------------------



const ctx5 = document.getElementById('myChartx').getContext('2d');

  new Chart(ctx5, {
       type: 'doughnut',
 
   data1 : {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
   }})
