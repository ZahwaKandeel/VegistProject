export class Order {

  constructor({
    id = 0,
    sellerId = 0,
    cart = [],
    createdAt = "",
    shipping = {},
    subtotal = 0,
    discount_code = ""
  }) {

    this.id = id;
    this.sellerId = sellerId;
    this.cart = cart;
    this.createdAt = createdAt;

    this.shipping = {
      firstName: shipping.firstName || "",
      lastName: shipping.lastName || "",
      phone: shipping.phone || "",
      country: shipping.country || "",
      fullAddress: shipping.fullAddress || "",
      appartment: shipping.appartment || "",
      postalCode: shipping.postalCode || "",
      city: shipping.city || "",
      shipping_fees: shipping.shipping_fees || 0
    };

    this.subtotal = subtotal;
    this.discount_code = discount_code;
  }

}