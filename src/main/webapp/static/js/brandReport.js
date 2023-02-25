function getbrandUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/brand";
}

function getReportsUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/reports";
}

function salesReport() {
  let url = getReportsUrl() + "/brandReport";
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
function getbrandList() {
  let url = getbrandUrl();
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displaybrandList(data);
    },
    error: handleAjaxError,
  });
}

function displaybrandList(data) {
  $("#SalesReport-table").dataTable().fnClearTable();
  $("#SalesReport-table").dataTable().fnDestroy();
  let $tbody = $("#SalesReport-table").find("tbody");
  $tbody.empty();
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
      "</tr>";
    $tbody.append(row);
  }
  if (getRole() === "operator") {
    $("#SalesReport-table").DataTable({
      dom: "irtp",
      columnDefs: [{ className: "dt-center", targets: "_all" }],
    });
  } else {
    $("#SalesReport-table").DataTable({
      dom: "irtp",
      columnDefs: [
        {
          className: "dt-center",
        },
      ],
      info: false,
    });
  }
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
      link.download = "Brand_Report_" + new Date() + ".pdf";
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
$(document).ready(getbrandList);
$(document).ready(function () {
  $(".active").removeClass("active");
  $("#rep-nav").addClass("active");
  $("#b-r").addClass("active");
});
