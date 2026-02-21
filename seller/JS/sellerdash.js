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

console.log(stats);
console.log(monthly);
console.log(recentSales);