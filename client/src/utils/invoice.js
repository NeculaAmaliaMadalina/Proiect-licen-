import React, { useEffect, Fragment } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getOrderById } from "../store/actions/order.action";
// import { getProductName } from "../store/actions/product.action";
// import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
  },
  spaceBetween: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#3E3E3E",
  },
  logo: { width: 70 },
  section: {
    flexDirection: "row",
    marginTop: 24,
  },
  invoice: { fontWeight: "bold", fontSize: 20 },
  invoiceNumber: { fontSize: 11, fontWeight: "bold" },
  reportTitle: { fontSize: 18 },
  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },

  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },

  tbody2: { flex: 2, borderRightWidth: 1 },
});

const InvoiceTitle = () => (
  <View style={styles.section}>
    <View style={styles.spaceBetween}>
      <Image style={styles.logo} src={"/images/Magic.png"} />
      <Text style={styles.reportTitle}>Magic Outlentily</Text>
    </View>
  </View>
);

const InvoiceNumber = ({ order }) => (
  <View style={styles.section}>
    <View style={styles.spaceBetween}>
      <Text style={styles.invoice}>Invoice</Text>
      <Text style={styles.invoiceNumber}> {order._id}</Text>
    </View>
  </View>
);

const InvoiceUserDetail = ({ order }) => (
  <View style={styles.section}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Bill to: </Text>
        <Text style={styles.invoiceNumber}> {order.contactInfo.name}</Text>
      </View>
      <View>
        <Text style={styles.invoiceNumber}> {order.contactInfo.email}</Text>
        <Text style={styles.invoiceNumber}> {order.contactInfo.phone}</Text>
      </View>
    </View>
  </View>
);

const InvoiceUserAddress = ({ order }) => (
  <View style={styles.section}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Shipping address: </Text>
        <Text style={styles.invoiceNumber}> {order.contactInfo.address}</Text>
      </View>
      <View>
        <Text style={styles.invoiceNumber}> {order.contactInfo.county}</Text>
        <Text style={styles.invoiceNumber}> {order.contactInfo.city}</Text>
      </View>
    </View>
  </View>
);
const InvoiceUserPayment = ({ order }) => (
  <View style={styles.section}>
    <View style={styles.spaceBetween}>
      <View>
        <Text style={styles.invoice}>Payment method: </Text>
        <Text style={styles.invoiceNumber}> {order.paymentInfo.method}</Text>
      </View>
      <View>
        <Text style={styles.invoiceNumber}> {order.orderDate}</Text>
      </View>
    </View>
  </View>
);
const TableHead = () => (
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Product Id</Text>
    </View>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Product Name </Text>
    </View>
    <View style={styles.theader}>
      <Text>Price</Text>
    </View>
    <View style={styles.theader}>
      <Text>Quantity</Text>
    </View>
    <View style={styles.theader}>
      <Text>Total</Text>
    </View>
  </View>
);
const TableBody = ({ order }) =>
  order.products.map((item) => (
    <Fragment key={item._id}>
      <View style={{ width: "100%", flexDirection: "row" }}>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{item.item}</Text>
        </View>
        <View style={[styles.tbody, styles.tbody2]}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.price} </Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.quantity}</Text>
        </View>
        <View style={styles.tbody}>
          <Text>{item.price * item.quantity}</Text>
        </View>
      </View>
    </Fragment>
  ));
const TableDelivery = ({ order }) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>Delivery</Text>
    </View>
    <View style={styles.tbody}>
      <Text>{order.totalWithDiscount < 250 ? 20 : 0}</Text>
    </View>
  </View>
);
const TableTotal = ({ order }) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>Total(lei)</Text>
    </View>
    <View style={styles.tbody}>
      <Text>{order.totalAmount}</Text>
    </View>
  </View>
);
const TableTotalWithDiscount = ({ order }) => (
  <View style={{ width: "100%", flexDirection: "row" }}>
    <View style={styles.total}>
      <Text></Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.total}>
      <Text> </Text>
    </View>
    <View style={styles.tbody}>
      <Text>Total cu vouchere aplicate(lei)</Text>
    </View>
    <View style={styles.tbody}>
      <Text>{order.totalWithDiscount}</Text>
    </View>
  </View>
);
const Invoice = ({ orderId, order }) => {
  useEffect(() => {
    getOrderById(orderId);
  }, [orderId]);

  if (!order) {
    return <Text>Loading...</Text>;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTitle />
        <InvoiceNumber order={order} />
        <InvoiceUserDetail order={order} />
        <InvoiceUserAddress order={order} />
        <InvoiceUserPayment order={order} />
        <TableHead />
        <TableBody order={order} />
        <TableDelivery order={order} />
        <TableTotal order={order} />
        <TableTotalWithDiscount order={order} />
      </Page>
    </Document>
  );
};

export default Invoice;
