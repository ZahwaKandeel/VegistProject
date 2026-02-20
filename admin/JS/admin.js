

const ctx = document.getElementById('revenueChart').getContext('2d');

// Create gradient
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#6C5DD3');
gradient.addColorStop(1, '#A066FF');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
      data: [120000,350000,450000,120000,200000,180000,200000,120000,250000,350000,250000,180000],
      backgroundColor: gradient,
      borderRadius: 10,
      borderSkipped: false,
      barThickness: 30
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#111',
        titleColor: '#fff',
        bodyColor: '#fff'
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6c757d' }
      },
      y: {
        grid: {
          color: '#eee',
          borderDash: [5,5]
        },
        ticks: {
          callback: function(value) {
            return value / 1000 + "K";
          }
        }
      }
    }
  }
});

