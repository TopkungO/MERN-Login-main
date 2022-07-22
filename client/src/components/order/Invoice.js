import React from "react";

//pdf
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

import fontDev from "./Mali-Italic.ttf";
import moment from "moment/min/moment-with-locales";

// Register font
Font.register({ family: "roitai", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "roitai",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  summary: {
    textAlign: "right",
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>ชื่อร้าน</Text>
          <Text>วันที่{moment(Date.now()).locale("th").format("ll")}</Text>

          <Table>
            <TableHeader>
              <TableCell>รายการสินค้า</TableCell>
              <TableCell>ราคาสินค้า</TableCell>
              <TableCell>จำนวนสินค้า</TableCell>
            </TableHeader>
          </Table>

          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(x) => x.product.title} />
              <DataTableCell getContent={(x) => x.price} />
              <DataTableCell getContent={(x) => x.count} />
            </TableBody>
          </Table>

          <Text tyle={styles.summary}>ราคารวมสุทธิ : <b>{order.cartTotal}</b></Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
