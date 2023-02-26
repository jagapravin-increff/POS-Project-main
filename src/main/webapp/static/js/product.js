data_arr = new Array();
let e = 0;

let edit = 0;
function getproductUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/product";
}

function getbrandUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/brand";
}

//BUTTON ACTIONS
function addproduct(event) {
  //Set the values to update
  let $form = $("#product-form");
  let jso = toJsonobject($form);
  if (isNaN(jso.mrp)) {
    alert("MRP must be a number");
    return;
  }
  let json = JSON.stringify(jso);
  let url = getproductUrl() + "/supervisor";
  $.ajax({
    url: url,
    type: "POST",
    data: json,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (response) {
      getproductList();
      $("#add-product-modal").modal("toggle");
    },
    error: handleAjaxError,
  });
  return false;
}

function updateproduct(event) {
  $("#edit-product-modal").modal("toggle");
  //Get the ID
  let product_id = $("#product-edit-form input[name=product_id]").val();
  let url = getproductUrl() + "/supervisor/" + product_id;

  //Set the values to update
  let $form = $("#product-edit-form");
  let json = toJson($form);

  $.ajax({
    url: url,
    type: "PUT",
    data: json,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (response) {
      getproductList();
    },
    error: handleAjaxError,
  });

  return false;
}

function getproductList() {
  let url = getproductUrl();
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displayproductList(data);
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

function showdropdown_edit() {
  let url = getbrandUrl();
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displaydropdownedit(data);
    },
    error: handleAjaxError,
  });
}

// FILE UPLOAD METHODS
let fileData = [];
let errorData = [];
let processCount = 0;

function processData() {
  let file = $("#productFile")[0].files[0];
  readFileData(file, readFileDataCallback);
  setTimeout(function () {
    if (e === 1) {
      toastr.error("File wasn't uploaded successfully");
      e = 0;
    } else {
      toastr.success("File was uploaded successfully");
    }
  }, 200);
}

function readFileDataCallback(results) {
  fileData = results.data;
  uploadRows();
}

function uploadRows() {
  //Update progress
  updateUploadDialog();
  //If everything processed then return
  if (processCount == fileData.length) {
    return;
  }

  //Process next row
  let row = fileData[processCount];
  processCount++;

  let json = JSON.stringify(row);
  let url = getproductUrl() + "/supervisor";

  //Make ajax call
  $.ajax({
    url: url,
    type: "POST",
    data: json,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (response) {
      uploadRows();
    },
    error: function (response) {
       upload_error= 1;
      row.error = response.responseText.split(":")[1].split("}")[0];
      console.log(JSON.error);
      errorData.push(row);
      uploadRows();
    },
  });
}

function downloadErrors() {
  writeFileData(errorData);
}

//UI DISPLAY METHODS

function displayproductList(data) {
  $("#product-table").dataTable().fnClearTable();
  $("#product-table").dataTable().fnDestroy();
  let $tbody = $("#product-table").find("tbody");
  $tbody.empty();
  console.log(data_arr);
  for (let i in data) {
    let e = data[i];
    console.log(e);
    let element = data_arr.find((element) => element.id == e.brand_Category_id);
    //let buttonHtml = '<button onclick="deleteproduct(' + e.product_id + ')">delete</button>'
    let buttonHtml =`<button type="button" class="btn-sm btn-outline-info" onclick="displayEditproduct(
    ${e.product_id})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>`;
    let row =
    `<tr><td>${e.name}</td><td>${e.barcode}</td><td>${e.mrp.toFixed(2)}</td><td>${element.brand}</td><td>${element.category}</td><td>${buttonHtml}</td></tr>`;
    $tbody.append(row);
  }
  if (getRole() === "operator") {
    $("#product-table").DataTable({
      dom: "irtp",
      columnDefs: [
        {
          className: "dt-center",
        },
        { visible: false, targets: [5] },
      ],
    });
  } else {
    $("#product-table").DataTable({
      dom: "irtp",
    });
  }
}

function displaydropdownedit(data) {
  $("#editBrandid").empty();
  let p = $("<option />");
  p.html("Select");
  p.val("none");
  $("#editBrandid").append(p);
  for (let i in data) {
    let e = data[i].brand;
    let p = $("<option />");
    p.html(e);
    p.val(data[i].brand);
    data_arr.push(data[i]);
    $("#editBrandid").append(p);
  }
}

function displaydropdowneditcategory(brand) {
  console.log(data_arr);
  $("#editCategoryid").empty();
  let j = $("<option />");
  j.html("Select");
  j.val("none");
  $("#editCategoryid").append(j);
  let arr_set = new Set();
  let arr = data_arr.filter((item) => item.brand === brand);
  for (i in arr) {
    if (!arr_set.has(arr[i].category)) {
      arr_set.add(arr[i].category);
      let ele = arr[i].category;
      let p = $("<option />");
      p.html(ele);
      p.val(arr[i].category);
      $("#editCategoryid").append(p);
    }
  }
}

function displaydropdown(data) {
  console.log(data);
  // + "/" + data[i].category
  $("#inputBrandid").empty();
  let p = $("<option />");
  p.html("Select");
  p.val("none");
  $("#inputBrandid").append(p);
  window.data = [];
  for (let i in data) {
    let e = data[i].brand;
    let p = $("<option />");
    p.html(e);
    p.val(data[i].brand);
    data_arr.push(data[i]);
    $("#inputBrandid").append(p);
  }

  function displaydropdowncategory(brand) {
    console.log(brand);
    $("#inputCategoryid").empty();
    let j = $("<option />");
    j.html("Select");
    j.val("none");
    $("#inputCategoryid").append(j);
    let arr_set = new Set();
    let arr = data_arr.filter((item) => item.brand === brand);
    for (i in arr) {
      if (!arr_set.has(arr[i].category)) {
        arr_set.add(arr[i].category);
        let ele = arr[i].category;
        let p = $("<option />");
        p.html(ele);
        p.val(arr[i].category);
        $("#inputCategoryid").append(p);
      }
    }
  }

  $(document).ready(function () {
    $("#inputBrandid").change(function () {
      let values = $("#inputBrandid option:selected")[0].text;
      displaydropdowncategory(values);
    });
  });

  $(document).ready(function () {
    $("#editBrandid").change(function () {
      let values = $("#editBrandid option:selected")[0].text;
      displaydropdowneditcategory(values);
    });
  });

  // $("#inputBrandid").selectpicker('refresh');
  $("#inputBrandid").val($("#inputBrandid option:first").val());
  // $("#inputBrandid").selectpicker('refresh');
  getproductList();
}

function displayEditproduct(product_id) {
  showdropdown_edit();
  let url = getproductUrl() + "/" + product_id;
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displayproduct(data);
    },
    error: handleAjaxError,
  });
}

function resetUploadDialog() {
  //Reset file name
  let $file = $("#productFile");
  $file.val("");
  $("#productFileName").html("Choose File");
  //Reset letious counts
  processCount = 0;
  fileData = [];
  errorData = [];
  //Update counts
  updateUploadDialog();
}

function updateUploadDialog() {
  if (errorData.length > 0) {
    $("#download-errors").attr("disabled", false);
  }
  $("#rowCount").html("" + fileData.length);
  $("#processCount").html("" + processCount);
  $("#errorCount").html("" + errorData.length);
}

function updateFileName() {
  let $file = $("#productFile");
  let fileName = $file.val();
  let f = fileName.split("\\");
  console.log(f[f.length - 1]);
  if (f[f.length - 1].slice(-3) !== "tsv") {
    toastr.error("filetype is not tsv");
    $("#process-data").attr("disabled", true);
    $("#productFile").val("");
    return;
  }
  $("#productFilecategory").html(f[f.length - 1]);
}

function displayUploadData() {
  resetUploadDialog();
  $("#download-errors").attr("disabled", true);
  $("#process-data").attr("disabled", true);
  $("#upload-product-modal").modal("toggle");
}

function displayproduct(data) {
  console.log(data);
  let element = data_arr.find(
    (element) => element.id == data.brand_Category_id
  );
  let id = "" + data.brand_Category_id;
  $("#product-edit-form input[name=name]").val(data.name);
  $("#product-edit-form input[name=barcode]").val(data.barcode);
  console.log(element.brand, element.category);
  $("#editBrandid").val(element.brand).change();
  // document.getElementById("editBrandid").value=element.brand;
  setTimeout(function () {
    $("#product-edit-form select[name=brand]").val(element.brand);
    $("#product-edit-form select[name=category]").val(element.category);
  }, 100);

  $("#product-edit-form input[name=mrp]").val(data.mrp);
  $("#product-edit-form input[name=product_id]").val(data.product_id);
  $("#edit-product-modal").modal("toggle");
}

function button() {
  let d = $("#inputBrandid :selected").text();
  let f = $("#inputCategoryid :selected").text();
  $("#add-product").attr(
    "disabled",
    d == "None" ||
      f == "None" ||
      $("#product-form input[name=barcode]").val().trim() == "" ||
      $("#product-form input[name=name]").val().trim() == "" ||
      $("#product-form input[name=mrp]").val().trim() == ""
  );
}

//INITIALIZATION CODE
function init() {
  $("#add-pro").click(function () {
    document.getElementById("product-form").reset();
    $("#add-product-modal").modal("toggle");
  });
  $("#upload-product-modal").on("hide.bs.modal", function () {
    getproductList();
  });
  $("#add-product").attr("disabled", true);
  $("#product-form").on("input change", button);
  $("#add-product").click(addproduct);
  $("#update-product").click(updateproduct);
  $("#refresh-data").click(getproductList);
  $("#upload-data").click(displayUploadData);
  $("#process-data").click(processData);
  $("#download-errors").click(downloadErrors);
  $("#productFile").on("change", function () {
    $("#process-data").attr("disabled", false);
    updateFileName();
  });
  if (getRole() === "operator") {
    $("#add-pro").css("display", "none");
    $("#upload-data").css("display", "none");
  }
}
$(document).ready(showdropdown);
$(document).ready(init);
$(document).ready(function () {
  $(".active").removeClass("active");
  $("#prod-nav").addClass("active");
});
