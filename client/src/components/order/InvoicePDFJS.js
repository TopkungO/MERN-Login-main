import React from "react";
import jsPDF from "jspdf";
import { font } from "./Mali-Italic-normal";
import autoTable from "jspdf-autotable";

const InvoicePDFJS = ({ order }) => {
  const handlePDF = () => {
    const doc = new jsPDF();
    //add font
    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    let width = doc.internal.pageSize.getWidth();

    //หัวกระดาษ
    doc.text("สวัสดีการค้า", width / 2, 10, { align: "center" });
    doc.text("วันที่", width / 2, 16, { align: "center" });

    //จัดข้อมูล
    let data = order.products.map((p, i) => [
      p.product.title,
      p.price,
      p.count,
    ]);

    let content = {
      startY: 20,
      head: [["รายการสินค้า", "ราคา", "จำนวน"]],
      body:data,
      styles:{font:"MyFont"}//setfont
    };

    doc.autoTable(content);
    doc.text("ยอดรวมสุทธิ:" + order.cartTotal, 190, 100, { align: "right" });


    doc.save("a4.pdf");
  };
  return (
    <div>
      <button className="btn btn-info" onClick={handlePDF}>
        jsPDF
      </button>
    </div>
  );
};

export default InvoicePDFJS;
