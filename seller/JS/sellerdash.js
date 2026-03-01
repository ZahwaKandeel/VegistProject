import{
    DashboardStats,
    SalesReport,
    MonthlyTarget,
    RevenueGrowth,
    ConversionData,
    RecentSale,
    TopSellingItem
} from "../JS/sellerdashdata.js"

const stats = DashboardStats.getDummyData();
const monthly = SalesReport.getMonthly();
const recentSales = RecentSale.getDummyList();
const topSellingItem = TopSellingItem.getDummyList();

const order = localStorage.getItem("currentOrder");

$(function(){
    $("#totalEarnings h3").html("&pound;"+stats.totalEarnings.toLocaleString());
    $("#totalEarnings span").html(stats.earningsChange+"%");
    $("#totalOrders h3").html(stats.totalOrders);
    $("#totalOrders span").html(stats.ordersChange+"%");
    $("#revenueGrowth h3").html(stats.revenueGrowth+"%");
    $("#conversionRate h3").html(stats.conversionRate+"%");

    const ctx = document.getElementById("SalesReportChart")
                
    let salesChart = new Chart(ctx,{
        type: "line",
        data:{
            labels: monthly.labels,
            datasets:[
                {
                    label: "Revenue",
                    data: monthly.revenue,
                    borderColor: "#f5ab1e",
                    backgroundColor: "#fbe2cb",
                    tension: 0.3,
                    fill: true
                },
                {
                    label: "Orders",
                    data: monthly.orders,
                    borderColor: "#5fa800",
                    backgroundColor: "#e6ffc5",
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins:{
                legend: {position:"top"}
            }
        }
    });

    function updateChart(newData){
        salesChart.data.labels = newData.labels;
        salesChart.data.datasets[0].data = newData.revenue;
        salesChart.data.datasets[1].data = newData.orders;
        salesChart.update();
    }

    $("#btnToday").click(function(){
        updateChart(SalesReport.getToday());
    });
    $("#btnWeek").click(function(){
        updateChart(SalesReport.getWeekly());
    });
    $("#btnMonth").click(function(){
        updateChart(SalesReport.getMonthly());
    });

    const targetData = MonthlyTarget.getDummy();
    const percentage = targetData.percentageAchieved;

    const ctx2 = document.getElementById("monthlyTargetChart");

    new Chart(ctx2, {
        type: "doughnut",
        data: {
            labels: [
                `Achieved (${percentage}%)`,
                `Remaining (${100-percentage}%)`
            ],
            datasets: [{
                data:[percentage,100-percentage],
                backgroundColor:["#f5ab1e","#fbe2cb"],
                borderWidth:0
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: {position: "bottom",
                    labels:{
                        font:{
                            size: 14
                        }
                    }
                },
                tooltip: {enabled: false}
            }
        }
    });




    recentSales.forEach(sale =>{
        const row = `
            <tr>
                <td>${sale.orderId}</td>
                <td>${sale.customer}</td>
                <td>${sale.product}</td>
                <td>${sale.amount}</td>
                <td>${sale.payment}</td>
                <td>${sale.status}</td>
            </tr>
        `;
        $("#RecentSales tbody").append(row);
    });

    topSellingItem.forEach(sale =>{
        const row = `
            <tr>
                <td>${sale.productId}</td>
                <td>${sale.name}</td>
                <td>${sale.stock}</td>
                <td>${sale.price}</td>
                <td>${sale.totalSales}</td>
                <td>${sale.status}</td>
            </tr>
        `;
        $("#TopSellingItems tbody").append(row);
    });
});

