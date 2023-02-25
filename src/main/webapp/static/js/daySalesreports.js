function getInventoryUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/inventory";
}

function getbrandUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/brand";
}

function invoiceUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/report/pdf";
}

function getReportsUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/reports";
}

function getInventoryReport() {
  let url = getInventoryUrl() + "/report";
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displayInventoryReport(data);
    },
    error: handleAjaxError,
  });
}

function showdropdown() {
  let url = getbrandUrl();
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displaydropdown(data);
    },
    error: handleAjaxError,
  });
}

function showcategorydd() {
  let url = getbrandUrl() + "/category/" + brand;
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displaycategorydd(data);
    },
    error: handleAjaxError,
  });
}

function displaydropdown(data) {
  $("#idbrand").empty();
  let p = $("<option />");
  p.html("Select");
  p.val("none");
  $("#idbrand").append(p);
  for (let i in data) {
    let e = data[i];
    let row = e.brand;
    let p = $("<option />");
    p.html(row);
    p.val(row);
    $("#idbrand").append(p);
  }
}

function displaycategorydd(data) {
  $("#idcategory").empty();
  let p = $("<option />");
  p.html("Select");
  p.val("none");
  $("#idcategory").append(p);
  for (let i in data) {
    let e = data[i];
    let row = e.category;
    let p = $("<option />");
    p.html(row);
    p.val(row);
    $("#idcategory").append(p);
  }
}

function salesReport() {
  let toDate = new Date(document.getElementById("toDate").value.trim());
  let fromDate = new Date(document.getElementById("fromDate").value.trim());
  let json = JSON.stringify({
    to: toDate.toISOString(),
    from: fromDate.toISOString(),
  });
  let url = getReportsUrl() + "/daySalesReport";

  $.ajax({
    contentType: "application/json",
    url: url,
    type: "POST",
    data: json,
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
  $("#SalesReport-table").dataTable().fnClearTable();
  $("#SalesReport-table").dataTable().fnDestroy();
  let $tbody = $("#SalesReport-table").find("tbody");
  $tbody.empty();
  let totalQuantity = 0;
  let totalRevenue = 0;
  for (let i in data) {
    let e = data[i];
    let row =`<tr><td>${e.date}</td><td>${e.total_order}</td><td>${e.total_item}</td><td>${e.revenue}</td></tr>`;
    $tbody.append(row);
    totalQuantity += e.total_item;
    totalRevenue += e.revenue;
  }
  let ta = $("#SalesReport-table").DataTable({
    pageLength: 6,
    autoWidth: true,
    lengthMenu: [
      [6, 10, 20, -1],
      [6, 10, 20, "All"],
    ],
  });
  let row =`<tr><td> </td><td> </td><td> </td><td> </td></tr>`;
  $tbody.append(row);
  row =`<tr><td>Total</td><td> </td><td>${totalQuantity}</td><td>${totalRevenue}</td></tr>`;
  $tbody.append(row);
  new $.fn.dataTable.FixedHeader(ta);
}

function downloadPDF() {
  let url = invoiceUrl();
  let toDate = new Date(document.getElementById("toDate").value.trim());
  let fromDate = new Date(document.getElementById("fromDate").value.trim());
  let json = JSON.stringify({
    to: toDate.toISOString(),
    from: fromDate.toISOString(),
  });
  $.ajax({
    url: url,
    type: "POST",
    data: json,
    headers: {
      "Content-Type": "application/json",
    },
    xhrFields: {
      responseType: "blob",
    },
    success: function (blob) {
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Report_" + new Date() + ".pdf";
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
  $("#idbrand").click(showcategorydd);
  let date = new Date();
  let today = new Date(new Date().setDate(date.getDate()));
  let last = new Date(new Date().setDate(date.getDate() - 30));
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  dd = String(last.getDate()).padStart(2, "0");
  mm = String(last.getMonth() + 1).padStart(2, "0"); //January is 0!
  yyyy = last.getFullYear();
  last = yyyy + "-" + mm + "-" + dd;
  $("#toDate").val(today);
  $("#fromDate").val(last);
  document.getElementById("fromDate").max = today;
  document.getElementById("toDate").max = today;
  console.log(today, $("#toDate").val());
  $("#fromDate").on("input", function () {
    document.getElementById("toDate").min = $("#fromDate").val();
  });
  $("#download").click(downloadPDF);
}

$(document).ready(init);
$(document).ready(salesReport);
$(document).ready(showdropdown);
$(document).ready(function () {
  $(".active").removeClass("active");
  $("#rep-nav").addClass("active");
  $("#ds-r").addClass("active");
});
