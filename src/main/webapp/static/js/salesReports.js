function getbrandUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/brand";
}

function getReportsUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/reports";
}

function invoiceUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/sales-report/pdf";
}

function showdropdown() {
  console.log("show");
  let url = getbrandUrl();
  console.log(url);
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displaydropdown(data);
    },
    error: handleAjaxError,
  });
}

function displaydropdown(data) {
  console.log(data);
  let b = new Set();
  let c = new Set();
  $("#brandInputReports").empty();
  $("#categoryInputReports").empty();
  let p = $("<option />");
  p.html("Select");
  p.val("none");
  let q = $("<option />");
  q.html("Select");
  q.val("none");
  $("#categoryInputReports").append(q);
  $("#brandInputReports").append(p);
  for (let i in data) {
    let e = data[i];
    if (!b.has(e.brand)) {
      let br = e.brand;
      let p = $("<option />");
      p.html(br);
      p.val(br);
      $("#brandInputReports").append(p);
      b.add(e.brand);
    }
    if (!c.has(e.category)) {
      let cat = e.category;
      let q = $("<option />");
      q.html(cat);
      q.val(cat);
      $("#categoryInputReports").append(q);
      c.add(e.category);
    }
  }
  //   $("#brandInputReports").selectpicker('refresh');
  $("#brandInputReports").val($("#brandInputReports option:first").val());
  //   $("#brandInputReports").selectpicker('refresh');
  //   $("#categoryInputReports").selectpicker('refresh');
  $("#categoryInputReports").val($("#categoryInputReports option:first").val());
  //   $("#categoryInputReports").selectpicker('refresh');
}

function salesReport() {
  let toDate = new Date(document.getElementById("toDate").value.trim());
  let fromDate = new Date(document.getElementById("fromDate").value.trim());
  let brand = document.getElementById("brandInputReports").value.trim();
  let category = document.getElementById("categoryInputReports").value.trim();
  let json = JSON.stringify({
    to: toDate.toISOString(),
    from: fromDate.toISOString(),
    brand: brand,
    category: category,
  });
  let url = getReportsUrl() + "/salesReport";
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
  let $tbody = $("#SalesReport-table").find("tbody");
  $tbody.empty();
  let totalQuantity = 0;
  let totalRevenue = 0;
  console.log(data);
  for (let i in data) {
    let e = data[i];
    let row = `<tr><td>${e.brand}</td><td>${e.category}</td><td>${e.count}</td><td>${e.revenue}</td></tr>`;
    $tbody.append(row);
    totalQuantity += e.count;
    totalRevenue += e.revenue;
  }
  $("#SalesReport-table").DataTable();

  let row = `<tr><td> </td><td> </td><td> </td><td> </td></tr>`;
  $tbody.append(row);
  row = `<tr><td>Total</td><td> </td><td>${totalQuantity}</td><td>${totalRevenue}</td></tr>`
  $tbody.append(row);
}

function downloadPDF() {
  let url = invoiceUrl();
  let toDate = new Date(document.getElementById("toDate").value.trim());
  let fromDate = new Date(document.getElementById("fromDate").value.trim());
  let brand = document.getElementById("brandInputReports").value.trim();
  let category = document.getElementById("categoryInputReports").value.trim();
  let json = JSON.stringify({
    to: toDate.toISOString(),
    from: fromDate.toISOString(),
    brand: brand,
    category: category,
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
      link.download = "Sales_Report_" + new Date() + ".pdf";
      link.click();
    },
    error: function (response) {
      toastr.options.timeOut = 0;
      toastr.error(
        "Brand " +
        brand +
        " and Category " +
        category +
        " combination does not exist"
      );
    },
  });
}

function init() {
  $("#salesReportBtn").click(function () {
    salesReport();
  });
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
  $("#fromDate").on("change", function () {
    document.getElementById("toDate").min = $("#fromDate").val();
  });
  document.getElementById("fromDate").max = today;
  document.getElementById("toDate").max = today;
  console.log(today, $("#toDate").val());
  $("#fromDate").on("input", function () {
    document.getElementById("toDate").min = $("#fromDate").val();
  });
  $("#salesbutton").click(salesReport);
  $("#download").click(downloadPDF);
}

$(document).ready(init);
$(document).ready(showdropdown);
$(document).ready(salesReport);
$(document).ready(function () {
  $(".active").removeClass("active");
  $("#rep-nav").addClass("active");
  $("s-r").addClass("active");
});
