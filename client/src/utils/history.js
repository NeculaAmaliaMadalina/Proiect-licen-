import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { getProductName } from "../store/actions/product.action";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./invoice";

const History = ({ history }) => {
  const dispatch = useDispatch();
  const productName = useSelector((state) => state.products);

  useEffect(() => {
    history.forEach((item) => {
      item.products.forEach((product) => {
        const _id = product.item;
        if (!productName[_id]) {
          dispatch(getProductName(_id));
        }
      });
    });
  }, [history, dispatch, productName]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Data</th>
          <th>Id-ul comenzii</th>
          <th>Produse</th>
          <th>Valoare</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {history.map((item) => (
          <tr key={item._id}>
            <td>
              <Moment to={item.orderDate} />
            </td>
            <td>{item._id}</td>
            <td>
              {item.products.map((product, i) => (
                <div key={i}>
                  {productName[product.item] && (
                    <>
                      {productName[product.item]} x {product.quantity}
                    </>
                  )}
                </div>
              ))}
            </td>
            <td>{item.totalWithDiscount}</td>
            <td>
              <PDFDownloadLink
                document={<Invoice order={item} />}
                fileName={`invoice_${item._id}.pdf`}
              >
                {({ loading }) => (
                  <Button variant="primary">
                    {loading ? "Se genereaza PDF..." : "Descarca factura"}
                  </Button>
                )}
              </PDFDownloadLink>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default History;
