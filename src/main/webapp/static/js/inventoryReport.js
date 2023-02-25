function getReportsUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/reports";
}

function invoiceUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/inventory-report/pdf";
}

function salesReport() {
  let url = getReportsUrl() + "/inventoryReport";
  $.ajax({
    contentType: "application/json",
    url: url,
    type: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      displaySalesReport(data);
    },
    error: handleAjaxError,
  });
}

function displaySalesReport(data) {
  let $tbody = $("#SalesReport-table").find("tbody");
  $tbody.empty();
  let totalQuantity = 0;
  let totalRevenue = 0;
  console.log(data);
  for (let i in data) {
    let e = data[i];
    let row =
      "<tr>" +
      "<td>" +
      e.brand +
      "</td>" +
      "<td>" +
      e.category +
      "</td>" +
      "<td>" +
      e.count +
      "</td>" +
      "</tr>";
    $tbody.append(row);
    totalQuantity += e.count;
  }
  $("#SalesReport-table").DataTable({
    dom: "ritp",
  });
    let row =`<tr><td> </td><td> </td><td> </td></tr>`;
  $tbody.append(row);
    row =`<tr><td>Total</td><td> </td><td>${totalQuantity}</td></tr>`;
  $tbody.append(row);
}

function downloadPdf() {
  let url = invoiceUrl();
  $.ajax({
    url: url,
    type: "POST",
    xhrFields: {
      responseType: "blob",
    },
    success: function (blob) {
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Inventory_Report_" + new Date() + ".pdf";
      link.click();
    },
    error: function (response) {
      handleAjaxError(response);
    },
  });
}

function init() {
  $("#salesReportBtn").click(function () {
    salesReport();
  });
  $("#download").click(downloadPdf);
}

$(document).ready(init);
$(document).ready(salesReport);
$(document).ready(function () {
  $(".active").removeClass("active");
  $("#rep-nav").addClass("active");
  $("#i-r").addClass("active");
});
