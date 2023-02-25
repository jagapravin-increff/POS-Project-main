let e = 0;
function getbrandUrl() {
  let baseUrl = $("meta[name=baseUrl]").attr("content");
  return baseUrl + "/api/brand";
}

//BUTTON ACTIONS
function addbrand(event) {
  //Set the values to update
  let $form = $("#brand-add-form");
  let json = toJson($form);
  let url = getbrandUrl() + "/supervisor";

  $.ajax({
    url: url,
    type: "POST",
    data: json,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (response) {
      $("#add-brand-modal").modal("toggle");
      getbrandList();
      toastr.options.timeOut = 2000;
      toastr.success("Brand added successfully");
    },
    error: handleAjaxError,
  });
  $("#add-brand").attr("disabled", true);
  return false;
}

function updatebrand(event) {
  $("#edit-brand-modal").modal("toggle");
  //Get the ID
  let id = $("#brand-edit-form input[name=id]").val();
  let b = $("#brand-edit-form input[name=brand]").val();
  let c = $("#brand-edit-form input[name=category]").val();
  let url = getbrandUrl() + "/supervisor/" + id;

  //Set the values to update
  let $form = $("#brand-edit-form");
  let json = toJson($form);

  $.ajax({
    url: url,
    type: "PUT",
    data: json,
    headers: {
      "Content-Type": "application/json",
    },
    success: function (response) {
      getbrandList();
      toastr.options.timeOut = 2000;
      toastr.success("Brand updated successfully");
    },
    error: handleAjaxError,
  });

  return false;
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

function deletebrand(id) {
  let url = getbrandUrl() + "/" + id;

  $.ajax({
    url: url,
    type: "DELETE",
    success: function (data) {
      getbrandList();
    },
    error: handleAjaxError,
  });
}

// FILE UPLOAD METHODS
let fileData = [];
let errorData = [];
let processCount = 0;

function processData() {
  let file = $("#brandFile")[0].files[0];
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
  if (fileData.length > 5000) {
    alert("File Rows should be within 5000 rows");
    return;
  }
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
  let url = getbrandUrl() + "/supervisor";

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
      e = 1;
      row.error = response.responseText.split(":")[1].split("}")[0];
      errorData.push(row);
      uploadRows();
    },
  });
}

function downloadErrors() {
  writeFileData(errorData);
}

//UI DISPLAY METHODS

function displaybrandList(data) {
  $("#brand-table").dataTable().fnClearTable();
  $("#brand-table").dataTable().fnDestroy();
  let $tbody = $("#brand-table").find("tbody");
  $tbody.empty();
  for (let i in data) {
    let e = data[i];
    //let buttonHtml = '<button onclick="deletebrand(' + e.id + ')">delete</button>'
    let buttonHtml =`<button type="button" class="btn-sm btn-outline-info" onclick="displayEditbrand(${e.id})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>`;
      let row=`<tr><td>${e.brand}</td><td>${e.category}</td><td>${buttonHtml}</td></tr>`;
    $tbody.append(row);
  }
  if (getRole() === "operator") {
    $("#brand-table").DataTable({
      dom: "irtp",
      columnDefs: [
        { className: "dt-center", targets: "_all" },
        { visible: false, targets: [2] },
      ],
    });
  } else {
    $("#brand-table").DataTable({
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

function displayEditbrand(id) {
  let url = getbrandUrl() + "/" + id;
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displaybrand(data);
    },
    error: handleAjaxError,
  });
}

function resetUploadDialog() {
  //Reset file name
  let $file = $("#brandFile");
  $file.val("");
  $("#brandFileName").html("Choose File");
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
  let $file = $("#brandFile");
  let fileName = $file.val();
  let f = fileName.split("\\");
  console.log(f[f.length - 1]);
  if (f[f.length - 1].slice(-3) !== "tsv") {
    toastr.error("filetype is not tsv");
    $("#process-data").attr("disabled", true);
    $("#brandFile").val("");
    return;
  }
  $("#brandFilecategory").html(f[f.length - 1]);
}

function displayUploadData() {
  resetUploadDialog();
  $("#download-errors").attr("disabled", true);
  $("#process-data").attr("disabled", true);
  $("#upload-brand-modal").modal("toggle");
}

function displaybrand(data) {
  $("#brand-edit-form input[name=brand]").val(data.brand);
  $("#brand-edit-form input[name=category]").val(data.category);
  $("#brand-edit-form input[name=id]").val(data.id);
  $("#edit-brand-modal").modal("toggle");
}

function button() {
  $("#add-brand").attr(
    "disabled",
    $("#brand-add-form input[name=brand]").val().trim() == "" ||
      $("#brand-add-form input[name=category]").val().trim() == ""
  );
}

//INITIALIZATION CODE
function init() {
  $("#add-brand").attr("disabled", true);
  $("#add-brand").click(addbrand);
  $("#add").click(function () {
    document.getElementById("brand-add-form").reset();
    $("#add-brand-modal").modal("toggle");
  });
  $("#upload-brand-modal").on("hide.bs.modal", function () {
    getbrandList();
  });
  $("#brand-add-form").on("input change", button);
  $("#update-brand").click(updatebrand);
  $("#refresh-data").click(getbrandList);
  $("#upload-data").click(displayUploadData);
  $("#process-data").click(processData);
  $("#download-errors").click(downloadErrors);
  $("#brandFile").on("change", function () {
    $("#process-data").attr("disabled", false);
    updateFileName();
  });
  if (getRole() === "operator") {
    $("#add").css("display", "none");
    $("#upload-data").css("display", "none");
  }
}

$(document).ready(init);
$(document).ready(getbrandList);
$(document).ready(function () {
  $(".active").removeClass("active");
  $("#brand-nav").addClass("active");
});
