import{
    DashboardStats,
    SalesReport,
    MonthlyTarget,
    RevenueGrowth,
    ConversionData,
    RecentSale,
    TopSellingItem
} from "../JS/sellerdashdata.js"

$(function(){
    const stats = DashboardStats.getDummyData();

    const recentSales = RecentSale.getDummyList();
    const topSellingItem = TopSellingItem.getDummyList();

    const doneOrders = JSON.parse(localStorage.getItem("doneOrders")) || [];
    const users = JSON.parse(localStorage.getItem("Users")) || [];

    // const seller = users.find(u => u.id === sellerId);
    const sellerId = 1;
    const sellerOrders = doneOrders.filter(o => o.sellerId === sellerId);

    const totalEarnings = sellerOrders.reduce((sum, order) => sum + order.total, 0);



    $("#totalEarnings h3").html("&pound;"+totalEarnings.toLocaleString());
    $("#totalEarnings span").html(stats.earningsChange+"%");

    $("#totalOrders h3").html(sellerOrders.length);
    $("#totalOrders span").html(stats.ordersChange+"%");
    
    $("#revenueGrowth h3").html(stats.revenueGrowth+"%");
    $("#conversionRate h3").html(stats.conversionRate+"%");

    function generateMonthlyData(orders){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const revenue = new Array(12).fill(0);
        const ordersCount = new Array(12).fill(0);

        orders.forEach(order =>{
            const date =  new Date(order.createdAt);
            const monthIndex = date.getMonth();

            revenue[monthIndex] += order.total;
            ordersCount[monthIndex] += 1;
        });
        return{
            labels: months,
            revenue: revenue,
            orders: ordersCount
        };
    }
    const monthly = generateMonthlyData(sellerOrders);

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
                    fill: true,
                    yAxisID: "yRevenue"
                },
                {
                    label: "Orders",
                    data: monthly.orders,
                    borderColor: "#5fa800",
                    backgroundColor: "#e6ffc5",
                    tension: 0.3,
                    fill: true,
                    yAxisID: "yOrders"
                }
            ]
        },
        options: {
            responsive: true,
            plugins:{
                legend: {position:"top"}
            }
        },
        scales: {
            yRevenue:{
                type: "linear",
                position: "left",
                title:{
                    display: true,
                    text: "Revenue(£)"
                }
            },
            yOrders:{
                type: "linear",
                position: "right",
                title:{
                    display: true,
                    text: "Orders(#)"
                },
                grid:{
                    drawOnChartArea: false
                }
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

    sellerOrders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0,5)
                .forEach(order =>{
                    const row = `
                    <tr>
                        <td>${order.id}</td>
                        <td>Customer #${order.customerId}</td>
                        <td>${order.orderDetail.cart.length} items</td>
                        <td>£${order.total}</td>
                        <td>${order.payment}</td>
                        <td><span class="badge bg-success">Completed</span></td>
                    </tr>
                    `;
                    $("#RecentSales tbody").append(row);
                });

});



