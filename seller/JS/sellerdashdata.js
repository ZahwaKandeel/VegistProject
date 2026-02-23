export class DashboardStats{
    constructor(totalEarnings, earningsChange, totalOrders, ordersChange, revenueGrowth, conversionRate){
        this.totalEarnings = totalEarnings;
        this.earningsChange = earningsChange;
        this.totalOrders = totalOrders;
        this.ordersChange = ordersChange;
        this.revenueGrowth = revenueGrowth;
        this.conversionRate = conversionRate;
    }

    static getDummyData(){
        return new DashboardStats(
        128450,
        12.5,
        1842,
        8.3,
        14.2,
        3.8
        );
    }
}

export class SalesReport{
    constructor(labels, revenue, orders){
        this.labels = labels;
        this.revenue = revenue;
        this.orders = orders;

    }
    static getMonthly(){
        return new SalesReport(
            ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            [8200,9100,10400,11200,12500,13800,14900,15700,16200,17500,18900,20400],
            [120,134,150,165,181,198,215,229,240,260,279,310]
        );
    }
    static getWeekly(){
        return new SalesReport(
            ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            [1200,1450,980,1700,2100,2500,1900],
            [22,27,18,30,36,41,33]
        )
    }
    static getToday(){
        return new SalesReport(
            ["8AM","10AM","12PM","2PM","4PM","6PM","8PM","10PM"],
            [120,240,310,280,450,520,610,390],
            [3,5,7,6,9,12,14,8]
        );
    }
}
export class MonthlyTarget{
    constructor(targetRevenue, currentRevenue){
        this.targetRevenue = targetRevenue;
        this.currentRevenue = currentRevenue;
    }
    
    get percentageAchieved(){
        return Math.round((this.currentRevenue/this.targetRevenue)*100);
    }

    static getDummy(){
        return new MonthlyTarget(20000, 16200);
    }
}

export class RevenueGrowth{
    constructor(labels, growthPercent){
        this.labels = labels;
        this.growthPercent = growthPercent;
    }
    static getDummy(){
        return new RevenueGrowth(
            ["Jul","Aug","Sep","Oct","Nov","Dec"],
            [5.2,6.1,4.8,7.3,9.5,11.4]
        );
    }
}

export class ConversionData{
    constructor(visitors, addToCart, checkoutStarted, purchases){
        this.visitors = visitors;
        this.addToCart = addToCart;
        this.checkoutStarted = checkoutStarted;
        this.purchases = purchases;
    }

    get conversionRate(){
        return ((this.purchases/this.visitors)*100).toFixed(2);
    }

    static getDummy(){
        return new ConversionData(48500, 6200, 4100, 1842);
    }
}

export class RecentSale{
    constructor(orderId, customer, product, amount, payment, status){
        this.orderId = orderId;
        this.customer = customer;
        this.product = product;
        this.amount = amount;
        this.payment = payment;
        this.status = status;
    }

    static getDummyList(){
        return[
            new RecentSale("#ORD-10234","Ahmed Hassan","Wireless Headphones",120,"Credit Card","Completed"),
            new RecentSale("#ORD-10235","Mariam Ali","Smart Watch",89,"PayPal","Pending"),
            new RecentSale("#ORD-10236","Omar Khaled","Bluetooth Speaker",65,"Cash on Delivery","Shipped"),
            new RecentSale("#ORD-10237","Salma Youssef","Gaming Mouse",45,"Credit Card","Completed"),
            new RecentSale("#ORD-10238","Youssef Adel","Mechanical Keyboard",150,"Credit Card","Completed")
        ];
    }
}

export class TopSellingItem{
    constructor(productId, name, stock, price, totalSales, status){
        this.productId = productId;
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.totalSales = totalSales;
        this.status = status;
    }

    static getDummyList(){
        return[
            new TopSellingItem("#PRD-01","Wireless Headphones",120,120,540,"In Stock"),
            new TopSellingItem("#PRD-02","Smart Watch",75,89,420,"Low Stock"),
            new TopSellingItem("#PRD-03","Bluetooth Speaker",210,65,610,"In Stock"),
            new TopSellingItem("#PRD-04","Gaming Mouse",35,45,390,"Low Stock"),
            new TopSellingItem("#PRD-05","Mechanical Keyboard",18,150,275,"Almost Out")
        ];
    }
}