var e=0;
function getbrandUrl(){
	var baseUrl = $("meta[name=baseUrl]").attr("content")
	return baseUrl + "/api/brand";
}

//BUTTON ACTIONS
function addbrand(event){
	//Set the values to update
	var $form = $("#brand-add-form");
	var json = toJson($form);
	var url = getbrandUrl()+"/supervisor";

	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
	   	        $("#add-brand-modal").modal("toggle");
	   		getbrandList();
	   		toastr.options.timeOut = 2000;
	   		toastr.success("Brand added successfully");
	   },
	   error: handleAjaxError
	});
    $('#add-brand').attr("disabled",true);
	return false;
}

function updatebrand(event){
	$('#edit-brand-modal').modal('toggle');
	//Get the ID
	var id = $("#brand-edit-form input[name=id]").val();	
	var b = $("#brand-edit-form input[name=brand]").val();	
	var c = $("#brand-edit-form input[name=category]").val();	
	var url = getbrandUrl() + "/supervisor/" + id;

	//Set the values to update
	var $form = $("#brand-edit-form");
	var json = toJson($form);

	$.ajax({
	   url: url,
	   type: 'PUT',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
	   		getbrandList();  
	   		toastr.options.timeOut = 2000;
	   		toastr.success("Brand updated successfully"); 
	   },
	   error: handleAjaxError
	});

	return false;
}


function getbrandList(){
	var url = getbrandUrl();
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displaybrandList(data);  
	   },
	   error: handleAjaxError
	});
}

function deletebrand(id){
	var url = getbrandUrl() + "/" + id;

	$.ajax({
	   url: url,
	   type: 'DELETE',
	   success: function(data) {
	   		getbrandList();  
	   },
	   error: handleAjaxError
	});
}

// FILE UPLOAD METHODS
var fileData = [];
var errorData = [];
var processCount = 0;


function processData(){

	var file = $('#brandFile')[0].files[0];
	readFileData(file, readFileDataCallback);

	setTimeout(function()
	{
		if(e===1)
		{
			toastr.error("File wasn't uploaded successfully");
			e=0;
		}

		else{
			toastr.success("File was uploaded successfully");
		}
	},200)
}

function readFileDataCallback(results){
	fileData = results.data;
	uploadRows();

}

function uploadRows(){
	
	if (fileData.length>5000){
		alert("File Rows should be within 5000 rows");
		return;
	}
	//Update progress
	updateUploadDialog();
	//If everything processed then return
	if(processCount==fileData.length){
		return;
	}
	
	//Process next row
	var row = fileData[processCount];
	processCount++;
	
	var json = JSON.stringify(row);
	var url = getbrandUrl()+"/supervisor";

	//Make ajax call
	$.ajax({
	   url: url,
	   type: 'POST',
	   data: json,
	   headers: {
       	'Content-Type': 'application/json'
       },	   
	   success: function(response) {
	   		uploadRows();  
	   },
	   error: function(response){
		e=1;
		row.error=response.responseText.split(":")[1].split("}")[0];
	   		errorData.push(row);
	   		uploadRows();
	   }
	});

}

function downloadErrors(){
	writeFileData(errorData);
}

//UI DISPLAY METHODS

function displaybrandList(data){
	$('#brand-table').dataTable().fnClearTable();
    $('#brand-table').dataTable().fnDestroy();
	var $tbody = $('#brand-table').find('tbody');
	$tbody.empty();
	for(var i in data){
		var e = data[i];
		//var buttonHtml = '<button onclick="deletebrand(' + e.id + ')">delete</button>'
		var buttonHtml = ' <button type="button" class="btn-sm btn-outline-info" onclick="displayEditbrand(' + e.id + ')"><i class="fa-solid fa-pen-to-square"></button>'
		var row = '<tr>'
		+ '<td>' + e.brand + '</td>'
		+ '<td>'  + e.category + '</td>'
		+ '<td>' + buttonHtml + '</td>'
		+ '</tr>';
        $tbody.append(row);
	}
	if (getRole()==="operator"){
	$('#brand-table').DataTable({
		"dom": 'irtp',
  columnDefs: [
            {"className": "dt-center", "targets": "_all"},
                { 'visible': false, 'targets': [2] },
] } );
}
else{
		$('#brand-table').DataTable({
			"dom": 'irtp',
  columnDefs: [
    {
        className: 'dt-center'
    }
],   "info":false
 } );
}

}

function displayEditbrand(id){
	var url = getbrandUrl() + "/" + id;
	$.ajax({
	   url: url,
	   type: 'GET',
	   success: function(data) {
	   		displaybrand(data);   
	   },
	   error: handleAjaxError
	});	
}

function resetUploadDialog(){
	//Reset file name
	var $file = $('#brandFile');
	$file.val('');
	$('#brandFileName').html("Choose File");
	//Reset various counts
	processCount = 0;
	fileData = [];
	errorData = [];
	//Update counts	
	updateUploadDialog();
}

function updateUploadDialog(){
	if (errorData.length>0){
		$("#download-errors").attr("disabled",false);
	}
	$('#rowCount').html("" + fileData.length);
	$('#processCount').html("" + processCount);
	$('#errorCount').html("" + errorData.length);
}

function updateFileName(){

	var $file = $('#brandFile');
	var fileName = $file.val();
    var f=fileName.split("\\");
       console.log(f[f.length-1]);
	if(f[f.length-1].slice(-3)!=="tsv")
	{
  toastr.error("filetype is not tsv");
  $('#process-data').attr("disabled",true);
  $("#brandFile").val(""); 
  return;
	}
	$('#brandFilecategory').html(f[f.length-1]);
}


function displayUploadData(){
 	resetUploadDialog(); 	
 	$("#download-errors").attr("disabled",true);
	 $('#process-data').attr("disabled",true);
	$('#upload-brand-modal').modal('toggle');
	  
}

function displaybrand(data){
	$("#brand-edit-form input[name=brand]").val(data.brand);	
	$("#brand-edit-form input[name=category]").val(data.category);	
	$("#brand-edit-form input[name=id]").val(data.id);	
	$('#edit-brand-modal').modal('toggle');
}

function button(){
   $('#add-brand').attr("disabled",(($('#brand-add-form input[name=brand]').val().trim()=="") || ($('#brand-add-form input[name=category]').val().trim()=="")));
   }

//INITIALIZATION CODE
function init(){
	 $('#add-brand').attr("disabled",true);
	$('#add-brand').click(addbrand);
	$('#add').click(function(){
	document.getElementById("brand-add-form").reset();
    $("#add-brand-modal").modal("toggle");
	});
	$('#upload-brand-modal').on("hide.bs.modal",function(){getbrandList();});
    $('#brand-add-form').on("input change",button);
	$('#update-brand').click(updatebrand);
	$('#refresh-data').click(getbrandList);
	$('#upload-data').click(displayUploadData);
	$('#process-data').click(processData);
	$('#download-errors').click(downloadErrors);
    $('#brandFile').on('change', function(){
    $('#process-data').attr("disabled",false);
    	updateFileName();});
        if (getRole()==="operator"){
    	$("#add").css("display","none");
    	 $("#upload-data").css("display","none");
    }
}

$(document).ready(init);
$(document).ready(getbrandList);
$(document).ready(function(){
   $(".active").removeClass("active");
   $("#brand-nav").addClass("active");
});

