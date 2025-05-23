var side;

const date = new Date();
var d = new Date();
const nowyear = d.getFullYear();
const nowmonth = d.getMonth() + 1;
const nowDate = setDate();
function setDate(){
  if(d.getDate()<10){
    return "0"+d.getDate();
  }else{
    return d.getDate();
  }
}
const today = nowyear+"-"+nowmonth+"-"+nowDate;
var initialdisplay = "<div id = 'initialdisplay'><h2 id='inith2'>You have not created any company</h2>"+
                        "<p id='initp'>Create your first company.</p>"+
                        "<button id='createCompany'>Create New</button></div>";

var Company_No = parseInt(localStorage.getItem('Company_No') || 0);
var Companies = JSON.parse(localStorage.getItem('Companies')) || [];
var asc = sessionStorage.getItem('asc') || 1;
var recordtable = JSON.parse(localStorage.getItem('recordtable')) || [];

/*start---------------------------*/
function start(){
    buildBody();
    document.getElementById("time").innerHTML = date.toLocaleTimeString('en-US');
    document.getElementById("addcompany").addEventListener("click", createCompany, false);
    if(!(JSON.parse(localStorage.getItem('Companies')))){
      initdisplay();
      document.getElementById("createCompany").addEventListener("click", createCompany, false);
      document.getElementById("companylist").addEventListener("click", initdisplay, false);
      document.getElementById("dashboard").addEventListener("click", initdisplay, false);
      document.getElementById("AccountRecord").addEventListener("click", initdisplay, false);
      document.getElementById("add").addEventListener("click", initdisplay, false);
    }else{
      buildDashboard();
      document.getElementById("companylist").addEventListener("click", updatedcompany, false);   
      document.getElementById("dashboard").addEventListener("click", buildDashboard, false);
      document.getElementById("AccountRecord").addEventListener("click", accountrecord, false);
      document.getElementById("add").addEventListener("click", account, false);
    }
}

/*創建初始body-----------------------------*/
function buildBody(){

  //add header
  var header = document.createElement("header");
  var h3 = document.createElement("h3");
  h3.innerHTML = "Dashboard";
  h3.setAttribute("id", "title");
  header.appendChild(h3);

  //add side-----------------------------------
  var side = document.createElement("div");
  side.setAttribute("class", "sideMenu");
  var logo = document.createElement("a");
  logo.setAttribute("href", "#");
  logo.setAttribute("class", "logo");
  logo.innerHTML = "<h1>Accounting</h1>";
  side.appendChild(logo);

  var User = document.createElement("div");
  User.setAttribute("id", "UserArea");
  User.innerHTML = "<img src='img/woman.png' alt='icon' id='Userimg'><p>User</p>";
  side.appendChild(User);

  var nav = document.createElement("nav");

  //add 第一層ul
  var ul_1 = document.createElement("ul");

  //Dashboard
  var li_Dashboard = document.createElement("li");
  var btn_Dashboard = document.createElement("Button");
  btn_Dashboard.setAttribute("id", "dashboard");
  btn_Dashboard.setAttribute("class", "btn");
  btn_Dashboard.innerHTML = "<img src='img/dashboard.png' alt='icon' class='icon'>Dashboard";
  li_Dashboard.appendChild(btn_Dashboard);
  ul_1.appendChild(li_Dashboard);

  //addcompany
  var li_addcompany = document.createElement("li");
  var btn_addcompany = document.createElement("Button");
  btn_addcompany.setAttribute("id", "addcompany");
  btn_addcompany.setAttribute("class", "btn");
  btn_addcompany.innerHTML = "<img src='img/addcompany.png' alt='icon' class='icon'>Add Company";
  li_addcompany.appendChild(btn_addcompany);
  ul_1.appendChild(li_addcompany);

  //Companieslist
  var li_Companieslist = document.createElement("li");
  var btn_Companieslist = document.createElement("Button");
  btn_Companieslist.setAttribute("id", "companylist");
  btn_Companieslist.setAttribute("class", "btn");
  btn_Companieslist.innerHTML = "<img src='img/company.png' alt='icon' class='icon'>Companies List";
  li_Companieslist.appendChild(btn_Companieslist);
  ul_1.appendChild(li_Companieslist);

  //AccountRecord
  var li_AccountRecord = document.createElement("li");
  var btn_AccountRecord = document.createElement("Button");
  btn_AccountRecord.setAttribute("id", "AccountRecord");
  btn_AccountRecord.setAttribute("class", "btn");
  btn_AccountRecord.innerHTML = "<img src='img/record.png' alt='icon' class='icon'>Account Record";
  li_AccountRecord.appendChild(btn_AccountRecord);
  ul_1.appendChild(li_AccountRecord);

  //time
  var time = document.createElement("p");
  time.setAttribute("id", "time");//-----side end

  //add section
  var section = document.createElement("section");
  section.setAttribute("id", "sectionArea");

  //add accountbtn
  var tooltip = document.createElement("div");
  tooltip.setAttribute("class", "tooltip")
  var addbtn = document.createElement("button");
  addbtn.setAttribute("id", "add");
  addbtn.innerHTML = "<span id = 'tooltiptext' class='tooltiptext'>Accounting</span>"+
                      "<img src='img/add.png' alt='AccountingImage' id='accountImg'>";
  tooltip.appendChild(addbtn);

  nav.appendChild(ul_1);
  nav.appendChild(time);
  side.appendChild(nav);
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(header);
  body.appendChild(side);
  body.appendChild(section);
  body.appendChild(tooltip);

}

/*初始畫面-----------------------------------*/
function initdisplay(){
  document.getElementById("sectionArea").innerHTML = initialdisplay;
  document.getElementsByTagName("h1")[0].innerHTML = "Accounting"
  document.getElementById("createCompany").addEventListener("click", createCompany, false);
}

/*創建Dashboard-----------------------------*/
function buildDashboard(){
    document.getElementById("title").innerHTML = "Dashboard";
    document.getElementById("sectionArea").innerHTML="";
    document.getElementById("sectionArea").appendChild(dashboardtable(Companies));
    var n = document.getElementsByClassName("sort");
    for(i=0; i<n.length; i++){
      //console.log(n[i]);
      n[i].addEventListener('click',sortTable,false);
    }
    
}

function dashboardtable(data){
  var node = document.createElement("table");
  node.setAttribute("id", "dashboardtable");
    var tr = document.createElement("tr");
    var headers = Object.keys(data[0]);
    for (var i=0; i<headers.length; ++i) {
      if(i>1&&i<8 || i>12){
        continue;
      }
        var header = headers[i];
        var th = document.createElement("th");
        th.setAttribute("class", "sort");
        th.appendChild(document.createTextNode(header));
        tr.appendChild(th);
    }
    node.appendChild(tr);
    data.forEach(function (rowdata) {
       tr = document.createElement("tr");
       for (var i=0; i<headers.length; ++i) {
            if(i>1&&i<8  || i>12){
              continue;
            }
            var header = headers[i];
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(rowdata[header]));
            tr.appendChild(td);
        }
        node.appendChild(tr);
    });
    return node;
}

/*創建company table-------------------------*/
function buildcompanyTable(data) {
    var node = document.createElement("table");
    var tr = document.createElement("tr");
    var headers = Object.keys(data[0]);
    for (var i=0; i<7; ++i) {
        var header = headers[i];
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(header));
        tr.appendChild(th);
    }
    node.appendChild(tr);
    data.forEach(function (rowdata) {
       tr = document.createElement("tr");
       for (var i=0; i<7; ++i) {
            var header = headers[i];
            var td = document.createElement("td");
            if(i==1){
              var btn = document.createElement("button");
              var r = rowdata[header]
              btn.innerHTML = r;
              btn.setAttribute("class", "companybtn");
              //console.log(btn);
              td.appendChild(btn);
            }else{
              td.appendChild(document.createTextNode(rowdata[header]));
            }
            tr.appendChild(td);
        }
        node.appendChild(tr);
    });
    return node;
}

/*時鐘--------------------------------*/
setInterval(myTimer, 1000);
function myTimer() {
    const date = new Date();
    document.getElementById("time").innerHTML = date.toLocaleTimeString('en-US');
}

/*更新company table-----------------*/
function updatedcompany(){
    document.getElementById("sectionArea").innerHTML = "";
    document.getElementById("title").innerHTML = "Companies List";
    document.getElementById("sectionArea").appendChild(buildcompanyTable(Companies));
    var n = document.getElementsByClassName("companybtn");
    for(i=0; i<n.length; i++){
      //console.log(n[i]);
      n[i].addEventListener('click',displayCompany,false);
    }
}

/*新增公司---------------------------*/
function createCompany(){
  document.getElementById("title").innerHTML = "Add Company";
    document.getElementById("sectionArea").innerHTML = "<div id='createCompanyForm'></div>";
    buildform();
    buildProductTable();
    buildMaterialtable();
    buildemployeetable();
    subbtn();
}

function buildform(){
    var companyForm = document.getElementById("createCompanyForm");
    var CompanyDetailstitle = document.createElement("h2");
    CompanyDetailstitle.innerHTML = "Set your company details.";
    var form = document.createElement("form");
    //form.setAttribute("method", "post");
    //form.setAttribute("action", "submit.php");

    // Create an input element for company Name
    var companyName = document.createElement("input");
    companyName.setAttribute("type", "text");
    companyName.setAttribute("placeholder", "Company Name");
    companyName.required = true;
    var companyNamelabel = document.createElement("label");
    companyNamelabel.innerHTML = "Company Name";

    // Create an input element for Start Date
    var startDate = document.createElement("input");
    startDate.setAttribute("type", "date");
    startDate.setAttribute("value", today);
    var startDatelabel = document.createElement("label");
    startDatelabel.innerHTML = "Start Date";

    // Create an input element for Phone
    var ContactNo = document.createElement("input");
    ContactNo.setAttribute("type", "tel");
    ContactNo.setAttribute("placeholder", "Contact No(01-2345678)");
    ContactNo.setAttribute("pattern", "[0-9]{2}-[0-9]{7}");
    ContactNo.required = true;
    var ContactNolabel = document.createElement("label");
    ContactNolabel.innerHTML = "Contact No";

    // Create an input element for manager
    var Manager = document.createElement("input");
    Manager.setAttribute("type", "text");
    Manager.setAttribute("placeholder", "Manager");
    Manager.required = true;
    var Managerlabel = document.createElement("label");
    Managerlabel.innerHTML = "Manager";

    // Create an input element for Assets
    var Assets = document.createElement("input");
    Assets.setAttribute("type", "number");
    Assets.setAttribute("value", 0);
    Assets.setAttribute("min", 0);
    Assets.setAttribute("placeholder", "Initial assets");
    Assets.required = true;
    var Assetslabel = document.createElement("label");
    Assetslabel.innerHTML = "Assets";

    // Create an input element for Liabilities
    var Liabilities = document.createElement("input");
    Liabilities.setAttribute("type", "text");
    Liabilities.setAttribute("value", 0);
    Liabilities.setAttribute("min", 0);
    Liabilities.setAttribute("placeholder", "Initial liabilities");
    Liabilities.required = true;
    var Liabilitieslabel = document.createElement("label");
    Liabilitieslabel.innerHTML = "Liabilities";

    // Create an input element for Address
    var Address = document.createElement("input");
    Address.setAttribute("type", "text");
    Address.setAttribute("placeholder", "Address");
    var Addresslabel = document.createElement("label");
    Addresslabel.innerHTML = "Address(optional)";

    // Append all input to the form
    form.appendChild(CompanyDetailstitle);
    form.appendChild(companyNamelabel);
    form.appendChild(companyName);
    form.appendChild(startDatelabel);
    form.appendChild(startDate);
    form.appendChild(ContactNolabel);
    form.appendChild(ContactNo);
    form.appendChild(Managerlabel);
    form.appendChild(Manager);
    form.appendChild(Assetslabel);
    form.appendChild(Assets);
    form.appendChild(Liabilitieslabel);
    form.appendChild(Liabilities);
    form.appendChild(Addresslabel);
    form.appendChild(Address);
    companyForm.appendChild(form);
}

var flag = -1;
/*顯示公司細節--------------------------*/
function displayCompany(){
  flag = -flag;
  if(document.getElementById("companyArea")){
    var area = document.getElementById("sectionArea");
    area.removeChild(area.lastChild);
  }
  if(flag == 1){
    var companyArea = document.createElement("div");
    companyArea.setAttribute("id", "companyArea");
    document.getElementById("sectionArea").appendChild(companyArea);
    var company = this.innerHTML;
    for(var i=0;i<Companies.length;i++){
      if(Companies[i].Company == company){
        document.getElementById("companyArea").appendChild(displayoneCompany(Companies[i]));
      }
    }
    var companyTable = document.createElement("table");
    companyTable.setAttribute("id", "companyTable");
    var companylabel = ["No", "Company Name", "Start Date", "Manager", "ContactNo", "Initial Assets", 
                        "Initial Libilities", "Address", "Current Assets","Current Libilities", "Revenue", "Expenses", "Record Date", 
                        "Product", "Material", "Employee"];
    for(var i=0; i<companylabel.length; i++){
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.setAttribute("class", "companyTableLabel")
      var td2 = document.createElement("td");
      td1.innerHTML = companylabel[i];
      td2.appendChild(document.getElementById("companyArea").children[0].childNodes[0]);
      tr.appendChild(td1);
      tr.appendChild(td2);
      companyTable.appendChild(tr);
    }
    document.getElementById("companyArea").innerHTML = "";
    document.getElementById("companyArea").appendChild(companyTable);

    //proudct table
    var area1 = document.getElementById("li13");
    var label1 = ["Product Name", "Number", "Price"];
    intertable(area1,label1);
    //material table
    var area2 = document.getElementById("li14");
    var label2 = ["Material Name", "Number", "Price"];
    intertable(area2,label2);
    //employee table
    var area3 = document.getElementById("li15");
    var label3 = ["Employee Name", "Salary", "Note"];
    intertable(area3,label3);
  }
  
}
function intertable(area, label){
  var table = document.createElement("table");
  table.setAttribute("class", "intertable");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");
  var tr_h = document.createElement("tr");
  for(var i=0; i<label.length; i++){
    var th = document.createElement("th");
    th.innerHTML = label[i];
    tr_h.appendChild(th);
  }
  thead.appendChild(tr_h);
  table.appendChild(thead);
  area.appendChild(table);
  for(var i=0; i<area.children.length-1; i++){
    var tr = document.createElement("tr");
    while(area.children[i].childElementCount){
      var td = document.createElement("td");
      td.appendChild(area.children[i].childNodes[0]);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    //area.removeChild(area.children[0]);
  }
  table.appendChild(tbody);
  for(var i=0; i<area.childElementCount; i++){
    area.removeChild(area.children[0]);
  }
}

function displayoneCompany(data){
  //console.log(JSON.stringify(data));
  var ul = document.createElement("ul");
  for(var i=0; i<Object.keys(data).length; i++){
    var li = document.createElement("li");
    li.setAttribute("id", "li"+i);
    if(i < 13){
      li.innerHTML = Object.values(data)[i];
    }
    if(Object.keys(data)[i] == "product"){
      var test = [];
      Object.assign(test, Object.values(data)[i]);
      console.log(test);
      for(var j=0;j<Object.keys(test).length;j++){
        li.appendChild(displayoneCompany(test[j]));
      }
    }
    if(Object.keys(data)[i] == "material"){
      var test = [];
      Object.assign(test, Object.values(data)[i]);
      console.log(test);
      for(var j=0;j<Object.keys(test).length;j++){
        li.appendChild(displayoneCompany(test[j]));
      }
    }
    if(Object.keys(data)[i] == "employee"){
      var test = [];
      Object.assign(test, Object.values(data)[i]);
      console.log(test);
      for(var j=0;j<Object.keys(test).length;j++){
        li.appendChild(displayoneCompany(test[j]));
      }
    }
    ul.appendChild(li);
  }
  return ul;
}

/*Add Product---------------------------*/
function buildProductTable(){
    var producttableArea = document.createElement("div");
    producttableArea.setAttribute("id", "producttableArea");
    var producttabletitle = document.createElement("h2");
    var producttable = document.createElement("table");

    //創建add button
    var productAddbtn = document.createElement("button");
    productAddbtn.setAttribute("type", "button");
    productAddbtn.setAttribute("id", "productAddbtn");
    productAddbtn.innerHTML = "Add";

    //table
    producttable.innerHTML = "<thead><tr><th>No.</th><th>Product Name</th><th>Number</th><th>Price</th><th>Delete</th></tr></thead>"+
                        "<tbody id='tbody_product'><tr id='123'><td>1</td><td><input id='123ProductNameid' type='text' placeholder='Product Name' required></td><td>"+
                        "<input id='123Numberid' type='number' min=0 value=0 placeholder='Number' required></td>" +
                        "<td><input id='123Priceid' type='number' min=0 value=0 placeholder='Price' required></td>"+
                        "<td><button type='button' onclick='productdel(this)' id='deleteBtn'>Delete</button></td></tr></tbody></table>"
    producttabletitle.innerHTML = "<br><hr><br>Add your product.";
    producttableArea.appendChild(producttabletitle);
    producttableArea.appendChild(producttable);
    producttableArea.appendChild(productAddbtn);
    document.getElementsByTagName("form")[0].appendChild(producttableArea);
    document.getElementById("productAddbtn").addEventListener("click", productadd, false);
}

function productadd(){
    var trid = new Date().getTime();
    var objtr=document.createElement('tr');
    objtr.id=trid;
    objtr.innerHTML="<td></td> " +
      "      <td><input id='"+trid+"ProductNameid' type='text' placeholder='Product Name' required></td> " +
      "      <td><input id='"+trid+"Numberid' type='number' min=0 value=0 placeholder='Number' required></td> " +
      "      <td><input id='"+trid+"Priceid' type='number' min=0 value=0 placeholder='Price' required></td> " +
      "      <td><button type='button' onclick='productdel(this)'  id='deleteBtn'>Delete</button></td>";
      document.getElementById("tbody_product").appendChild(objtr);
      var tbodyobj=document.getElementById('tbody_product');
      var countchildren=tbodyobj.childElementCount;
      for (var i=0;i<countchildren;i++){
        tbodyobj.children[i].children[0].innerHTML=i+1;
      }
}

function productsave(){
    var tbodyobj=document.getElementById('tbody_product');
    var countchildren=tbodyobj.childElementCount;
    var trid="";
    var ProductNameid="";
    var Numberid="";
    var Priceid="";
    var productlist=new Array();
    for (var i=0;i<countchildren;i++){
      trid=tbodyobj.children[i].id;
      ProductNameid=trid+"ProductNameid";
      Numberid=trid+"Numberid";
      Priceid=trid+"Priceid";
      var map={
      "Product Name":document.getElementById(ProductNameid).value,
      "Number":document.getElementById(Numberid).value,
      "Price":document.getElementById(Priceid).value,
      }
      productlist.push(map);
    }
    //console.log("productlist:",productlist);
    return productlist;
}

function productdel(obj){
    if(document.getElementById('tbody_product').children.length>1){
    var trid=obj.parentNode.parentNode.id;
    var objtr=document.getElementById(trid);
    document.getElementById('tbody_product').removeChild(objtr);
    var tbody=document.getElementById('tbody_product');
    var countchildren=tbody.childElementCount;
    for (var i=0;i<countchildren;i++){
      tbody.children[i].children[0].innerHTML=i+1;
    }
    }
    else{
      alert("Your company must have one product.");
    }
}

/*Add Material---------------------------*/
function buildMaterialtable(){
    var materialTableArea = document.createElement("div");
    materialTableArea.setAttribute("id", "materialTableArea");
    var materialabletitle = document.createElement("h2");
    var materialtable = document.createElement("table");

    //創建add button
    var materialAddbtn = document.createElement("button");
    materialAddbtn.setAttribute("type", "button");
    materialAddbtn.setAttribute("id", "materialAddbtn");
    materialAddbtn.innerHTML = "Add";

    //table
    materialtable.innerHTML = "<thead><tr><th>No.</th><th>Material Name</th><th>Number</th><th>Price</th><th>Delete</th></tr></thead>"+
                        "<tbody id='tbody_material'><tr id='124'><td>1</td><td><input id='124MaterialNameid' type='text' placeholder='Material Name' required></td>"+
                        "<td><input id='124Numberid' type='number' min=0 value=0 placeholder='Number' required></td>" +
                        "<td><input id='124Priceid' type='number' min=0 value=0 placeholder='Price' required></td>"+
                        "<td><button type='button' onclick='materialedel(this)'  id='deleteBtn'>Delete</button></td></tr></tbody></table>"
    materialabletitle.innerHTML = "<br><hr><br>Add your material.";
    materialTableArea.appendChild(materialabletitle);
    materialTableArea.appendChild(materialtable);
    materialTableArea.appendChild(materialAddbtn);
    document.getElementsByTagName("form")[0].appendChild(materialTableArea);
    document.getElementById("materialAddbtn").addEventListener("click", materialadd, false);
    
}

function materialadd(){
    var trid = new Date().getTime();
    var objtr=document.createElement('tr');
    objtr.id=trid;
    objtr.innerHTML="<td></td> " +
      "      <td><input id='"+trid+"MaterialNameid' type='text' placeholder='Material Name' required></td> " +
      "      <td><input id='"+trid+"Numberid' type='number' min=0 value=0 placeholder='Number' required></td> " +
      "      <td><input id='"+trid+"Priceid' type='number' min=0 value=0 placeholder='Price' required></td> " +
      "      <td><button type='button' onclick='materialedel(this)'  id='deleteBtn'>Delete</button></td>";
      document.getElementById("tbody_material").appendChild(objtr);
      var tbodyobj=document.getElementById('tbody_material');
      var countchildren=tbodyobj.childElementCount;
      for (var i=0;i<countchildren;i++){
        tbodyobj.children[i].children[0].innerHTML=i+1;
      }
}

function materialsave(){
    var tbodyobj=document.getElementById('tbody_material');
    var countchildren=tbodyobj.childElementCount;
    var trid="";
    var MaterialNameid="";
    var Numberid="";
    var Priceid="";
    var materiallist=new Array();
    for (var i=0;i<countchildren;i++){
      trid=tbodyobj.children[i].id;
      MaterialNameid=trid+"MaterialNameid";
      Numberid=trid+"Numberid";
      Priceid=trid+"Priceid";
      var map={
      "Material Name":document.getElementById(MaterialNameid).value,
      "Number":document.getElementById(Numberid).value,
      "Price":document.getElementById(Priceid).value,
      }
      materiallist.push(map);
    }
    //console.log("materiallist:",materiallist);
    return materiallist;
}

function materialedel(obj){
    if(document.getElementById('tbody_material').children.length>1){
    var trid=obj.parentNode.parentNode.id;
    var objtr=document.getElementById(trid);
    document.getElementById('tbody_material').removeChild(objtr);
    var tbody=document.getElementById('tbody_material');
    var countchildren=tbody.childElementCount;
    for (var i=0;i<countchildren;i++){
      tbody.children[i].children[0].innerHTML=i+1;
    }
    }
    else{
      alert("Your company must have one material.");
    }
}

/*Add employee---------------------------*/
function buildemployeetable(){
    var employeetableArea = document.createElement("div");
    employeetableArea.setAttribute("id", "employeetableArea");
    var employeetabletitle = document.createElement("h2");
    var employeetable = document.createElement("table");

    //創建add button
    var employeeAddbtn = document.createElement("button");
    employeeAddbtn.setAttribute("type", "button");
    employeeAddbtn.setAttribute("id", "employeeAddbtn");
    employeeAddbtn.innerHTML = "Add";

    //table
    employeetable.innerHTML = "<thead><tr><th>No.</th><th>Employee Name</th><th>Salary</th><th>Note</th><th>Delete</th></tr></thead>"+
                        "<tbody id='tbody_employee'><tr id='125'><td>1</td><td><input id='125EmployeeNameid' type='text' placeholder='Employee Name' required></td>" +
                        "<td><input id='125Salsryid' type='number' min=0 value=0 placeholder='Salsry' required></td><td>"+
                        "<textarea id='125Noteid' placeholder='Notes'></textarea></td>"+
                        "<td><button type='button' onclick='employeedel(this)'  id='deleteBtn'>Delete</button></td></tr></tbody></table>"
    employeetabletitle.innerHTML = "<br><hr><br>Add your employee.";
    employeetableArea.appendChild(employeetabletitle);
    employeetableArea.appendChild(employeetable);
    employeetableArea.appendChild(employeeAddbtn);
    document.getElementsByTagName("form")[0].appendChild(employeetableArea);
    document.getElementById("employeeAddbtn").addEventListener("click", employeeadd, false);
    
}

function employeeadd(){
    var trid = new Date().getTime();
    var objtr=document.createElement('tr');
    objtr.id=trid;
    objtr.innerHTML="<td></td> " +
      "      <td><input id='"+trid+"EmployeeNameid' type='text' placeholder='Employee Name' required></td> " +
      "      <td><input id='"+trid+"Salsryid' type='number' min=0 value=0 placeholder='Salsry' required></td> " +
      "      <td><textarea id='"+trid+"Noteid' placeholder='Notes'></textarea></td> " +
      "      <td><button type='button' onclick='employeedel(this)'  id='deleteBtn'>Delete</button></td>";
      document.getElementById("tbody_employee").appendChild(objtr);
      var tbodyobj=document.getElementById('tbody_employee');
      var countchildren=tbodyobj.childElementCount;
      for (var i=0;i<countchildren;i++){
        tbodyobj.children[i].children[0].innerHTML=i+1;
      }
}

function employeesave(){
    var tbodyobj=document.getElementById('tbody_employee');
    var countchildren=tbodyobj.childElementCount;
    var trid="";
    var EmployeeNameid="";
    var Salsryid="";
    var Noteid="";
    var employeelist=new Array();
    for (var i=0;i<countchildren;i++){
      trid=tbodyobj.children[i].id;
      EmployeeNameid=trid+"EmployeeNameid";
      Salsryid=trid+"Salsryid";
      Noteid=trid+"Noteid";
      var map={
      "Employee Name":document.getElementById(EmployeeNameid).value,
      "Salary":document.getElementById(Salsryid).value,
      "Note":document.getElementById(Noteid).value,
      }
      employeelist.push(map);
    }
    //console.log("employeelist:",employeelist);
    return employeelist;
}

function employeedel(obj){
    if(document.getElementById('tbody_employee').children.length>1){
        var trid=obj.parentNode.parentNode.id;
        var objtr=document.getElementById(trid);
        document.getElementById('tbody_employee').removeChild(objtr);
        var tbody=document.getElementById('tbody_employee');
        var countchildren=tbody.childElementCount;
    for (var i=0;i<countchildren;i++){
      tbody.children[i].children[0].innerHTML=i+1;
    }
    }
    else{
      alert("Your company must have one employee.");
    }
}

/*add submit button-------------*/
function subbtn(){
    var s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.setAttribute("id", "storeCompanybtn");
    document.getElementsByTagName("form")[0].appendChild(s);
    document.getElementsByTagName("form")[0].setAttribute("onsubmit", 'storeCompany()');
}

/*儲存公司資料----------------------------------*/
function storeCompany(){
    Company_No = parseInt(Company_No+1);
    var inputElement = document.getElementsByTagName('input');
    var companyName = inputElement[0].value;
    var startDate = inputElement[1].value;
    var ContactNo = inputElement[2].value;
    var Manager = inputElement[3].value;
    var Assets = inputElement[4].value;
    var Liabilities = inputElement[5].value;
    var Address = inputElement[6].value;
    var jsondata = {No: Company_No,
                    Company:companyName,
                    "Start Date": startDate,
                    Manager: Manager,
                    ContactNo: ContactNo,
                    "Initial Assets": Assets,
                    "Initial Libilities": Liabilities,
                    Address: Address,
                    "Current Assets": Assets,
                    "Current Libilities": Liabilities,
                    Revenue: 0,
                    Expenses: 0,
                    "Record Date": startDate,
                    product:productsave(),
                    material:materialsave(),
                    employee:employeesave(),};
    Companies.push(jsondata);
    updateLocalStorage();
    //console.log("Companies:",Companies);
    alert("Create success!");
    document.getElementById("companylist").addEventListener("click", updatedcompany, false);   
    document.getElementById("dashboard").addEventListener("click", buildDashboard, false);
    document.getElementById("AccountRecord").addEventListener("click", accountrecord, false);
    document.getElementById("add").addEventListener("click", account, false);
}

function updateLocalStorage(){
  localStorage.setItem('Company_No', Company_No);
  localStorage.setItem('Companies', JSON.stringify(Companies));
  localStorage.setItem('recordtable', JSON.stringify(recordtable));
}


/*accountdisplay----------------------------*/
var targetCompay;
var targetAccount;
var targetPayType;
var accountType = ["Pay", "Receive", "Other"];
function account(){
  document.getElementById("sectionArea").innerHTML = "";
  document.getElementById("title").innerHTML = "Accounting";

  //公司選單
  var selectCompany = document.createElement("select");
  selectCompany.setAttribute("id", "selectCompany");
  for (var i=0;i<Companies.length;i++){
    var option = document.createElement("option");
    option.innerHTML = Companies[i].Company;
    selectCompany.appendChild(option);
  }
  document.getElementById("sectionArea").appendChild(selectCompany);

  //Account type
  var selectAccount = document.createElement("select");
  selectAccount.setAttribute("id", "selectAccount");
  for(var i=0; i<accountType.length;i++){
    var option = document.createElement("option");
    option.innerHTML = accountType[i];
    selectAccount.appendChild(option);
  }
  document.getElementById("sectionArea").appendChild(selectAccount);

  //Account type Area
  var accountTypeArea = document.createElement("div");
  accountTypeArea.setAttribute("id", "accountTypeArea");
  document.getElementById("sectionArea").appendChild(accountTypeArea);
  typeAreaSet();

  function typeAreaSet(){
    document.getElementById("accountTypeArea").innerHTML="";
    targetCompay = document.getElementById("selectCompany").value;
    targetAccount = document.getElementById("selectAccount").value;

    //pay
    if(targetAccount == accountType[0]){
      var selectPay = document.createElement("select");
      selectPay.setAttribute("id", "selectPay");
      var option1 = document.createElement("option");
      option1.innerHTML = "Materials"
      var option2 = document.createElement("option");
      option2.innerHTML = "Salay"
      selectPay.appendChild(option1);
      selectPay.appendChild(option2);
      document.getElementById("accountTypeArea").appendChild(selectPay);
      paySet();
      document.getElementById("selectPay").addEventListener('change',paySet);
      //Receivable
    }else if(targetAccount == accountType[1]){
      var selectProduct = document.createElement("select");
      selectProduct.setAttribute("id", "selectProduct");
      for(var i=0;i<Companies.length;i++){
        if(Companies[i].Company == targetCompay){
          for(var j=0;j<Companies[i].product.length; j++){
            var option = document.createElement("option");
            option.innerHTML = Companies[i].product[j]["Product Name"];
            selectProduct.appendChild(option);
          }
          var ProductNumber = document.createElement("input");
          ProductNumber.setAttribute("id", "ProductNumber");
          ProductNumber.setAttribute("type", "number");
          ProductNumber.setAttribute("min", 0);
          ProductNumber.setAttribute("value", 0);
          ProductNumber.setAttribute("placeholder", "Number");
          break;
        }
      }
      document.getElementById("accountTypeArea").appendChild(selectProduct);
      document.getElementById("accountTypeArea").appendChild(ProductNumber);
      document.getElementById("selectProduct").addEventListener('change',setAmount,false);
      document.getElementById("ProductNumber").addEventListener('change',setAmount,false);
      //Other
    }else if(targetAccount == accountType[2]){
      var selectInorOut = document.createElement("select");
      selectInorOut.setAttribute("id", "selectInorOut");
      var option1 = document.createElement("option");
      option1.innerHTML = "Revenue"
      var option2 = document.createElement("option");
      option2.innerHTML = "Expenses";
      selectInorOut.appendChild(option1);
      selectInorOut.appendChild(option2);
      document.getElementById("accountTypeArea").appendChild(selectInorOut);
      var trade = document.createElement("input");
      trade.setAttribute("id", "trade");
      trade.setAttribute("type", "number");
      trade.setAttribute("min", 0);
      trade.setAttribute("value", 0);
      trade.setAttribute("placeholder", "Amount");
      document.getElementById("accountTypeArea").appendChild(trade);
      document.getElementById("selectInorOut").addEventListener('change',setAmount,false);
      document.getElementById("trade").addEventListener('change',setAmount,false);
    }
  }

  function paySet(){
    var area = document.getElementById("accountTypeArea");
    targetPayType = document.getElementById("selectPay").value;
    if(targetPayType == "Materials"){
      var selectMaterial = document.createElement("select");
      selectMaterial.setAttribute("id", "selectMaterial");
      for(var i=0;i<Companies.length;i++){
        if(Companies[i].Company == targetCompay){
          for(var j=0;j<Companies[i].material.length; j++){
            var option = document.createElement("option");
            option.innerHTML = Companies[i].material[j]["Material Name"];
            selectMaterial.appendChild(option);
          }
          var MaterialNumber = document.createElement("input");
          MaterialNumber.setAttribute("id", "MaterialNumber");
          MaterialNumber.setAttribute("type", "number");
          MaterialNumber.setAttribute("min", 0);
          MaterialNumber.setAttribute("value", 0);
          MaterialNumber.setAttribute("placeholder", "Number");
          break;
        }
      }
      if(area.children[1]){
        area.removeChild(area.children[1]);
      }
      document.getElementById("accountTypeArea").appendChild(selectMaterial);
      document.getElementById("accountTypeArea").appendChild(MaterialNumber);
      document.getElementById("selectMaterial").addEventListener('change',setAmount,false);
      document.getElementById("MaterialNumber").addEventListener('change',setAmount,false);
    }else{
      for(var i=0;i<Companies.length;i++){
        var selectEmployee = document.createElement("select");
        selectEmployee.setAttribute("id", "selectEmployee");
        if(Companies[i].Company == targetCompay){
          for(var j=0;j<Companies[i].employee.length; j++){
            var option = document.createElement("option");
            option.innerHTML = Companies[i].employee[j]["Employee Name"];
            selectEmployee.appendChild(option);
          }
          break;
        }
      }
      area.removeChild(area.children[1]);
      area.removeChild(area.children[1]);
      area.appendChild(selectEmployee);
      document.getElementById("selectEmployee").addEventListener('change',setAmount,false);
      setAmount();
    }
  }

  //Amount
  var Amount = document.createElement("p");
  Amount.setAttribute("id", "Amount");
  Amount.innerHTML = "NT$ 0";
  document.getElementById("sectionArea").appendChild(Amount);

  //紀錄日期
  var recordDate = document.createElement("input");
  recordDate.setAttribute("id","recordDate");
  recordDate.setAttribute("type","date");
  recordDate.setAttribute("value",today);
  document.getElementById("sectionArea").appendChild(recordDate);

  //備註
  var Note = document.createElement("textarea");
  Note.setAttribute("placeholder", "Notes");
  Note.setAttribute("id", "Note");
  document.getElementById("sectionArea").appendChild(Note);

  //table排版
  var accountTable = document.createElement("table");
  accountTable.setAttribute("id", "accountTable");
  var accountlabel = ["Company Name", "Accounting Type", "Item/Employee", "Amount", "Record Date", "Note"];
  for(var i=0; i<accountlabel.length; i++){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.setAttribute("class", "accountTableLabel")
    var td2 = document.createElement("td");
    td1.innerHTML = accountlabel[i];
    td2.appendChild(document.getElementById("sectionArea").childNodes[0]);
    tr.appendChild(td1);
    tr.appendChild(td2);
    accountTable.appendChild(tr);
  }

  document.getElementById("sectionArea").appendChild(accountTable);

  //Save
  var saveButton = document.createElement("button");
  saveButton.setAttribute("id", "saveAccountBtn");
  saveButton.innerHTML = "Save";
  document.getElementById("sectionArea").appendChild(saveButton);

  //change
  document.getElementById("selectCompany").addEventListener('change',selectchange);
  document.getElementById("selectAccount").addEventListener('change',selectchange);

  //button event
  document.getElementById("saveAccountBtn").addEventListener('click',saveAccount,false);

  function selectchange(){
    typeAreaSet();
    setAmount();
  }
  
  var targetProduct;
  var targetMaterial;
  var targetEmployee;
  var targetOther;
  var n;
  var p;
  var a;
  var check;

  function setAmount(){
    if(targetAccount == accountType[0]){
      targetPayType = document.getElementById("selectPay").value;
      if(targetPayType == "Materials"){
        targetMaterial = document.getElementById("selectMaterial").value;
        for(var i=0;i<Companies.length;i++){
          if(Companies[i].Company == targetCompay){
            for(var j=0;j<Companies[i].material.length; j++){
              if(targetMaterial == Companies[i].material[j]["Material Name"]){
                check = parseInt(Companies[i].material[j].Number);
                n = document.getElementById("MaterialNumber").value;
                if(n>check){
                  alert("You don't have so much "+targetMaterial);
                  document.getElementById("MaterialNumber").value = 0;
                  break;
                }
                p = parseInt(Companies[i].material[j].Price);
                a = n*p;
                document.getElementById("Amount").innerHTML = "NT$ "+a;
                break;
              }
            }
          }
        }
      }else{
        targetEmployee = document.getElementById("selectEmployee").value;
        for(var i=0;i<Companies.length;i++){
          if(Companies[i].Company == targetCompay){
            for(var j=0;j<Companies[i].employee.length; j++){
              if(targetEmployee == Companies[i].employee[j]["Employee Name"]){
                a = parseInt(Companies[i].employee[j].Salary);
                document.getElementById("Amount").innerHTML = "NT$ "+a;
                break;
              }
            }
          }
        }
      }
    }else if(targetAccount == accountType[1]){
      targetProduct = document.getElementById("selectProduct").value;
      for(var i=0;i<Companies.length;i++){
        if(Companies[i].Company == targetCompay){
          for(var j=0;j<Companies[i].product.length; j++){
            if(targetProduct == Companies[i].product[j]["Product Name"]){
              check = parseInt(Companies[i].product[j].Number);
              n = document.getElementById("ProductNumber").value;
              if(n>check){
                alert("You don't have so much "+targetProduct);
                document.getElementById("ProductNumber").value = 0;
                break;
              }
              p = parseInt(Companies[i].product[j].Price);
              a = n*p;
              document.getElementById("Amount").innerHTML = "NT$ "+a;
              break;
            }
          }
        }
      }
    }else{
      a = document.getElementById("trade").value;
      document.getElementById("Amount").innerHTML = "NT$ "+a;
    }
  }

  var accountingType;
  var number;
  var currentAssets;
  var currentLibilities;
  var Revenue;
  var Expenses;
  var RD;
  var NOTE;
  var ITEMorEMP;
  var PRIorSAL;
  var AM;
  function saveAccount(){
    setAmount();
    if(a == 0){
      alert("Amount can't be zero");
      return;
    }
    RD = document.getElementById("recordDate").value;
    NOTE = document.getElementById("Note").value;
    targetCompay = document.getElementById("selectCompany").value;
    if(targetAccount == accountType[0]){
      if(targetPayType == "Materials"){
        accountingType = "Pay/Materials";
        ITEMorEMP = targetMaterial;
        PRIorSAL = p;
        for(var i=0;i<Companies.length;i++){
          if(Companies[i].Company == targetCompay){
            for(var j=0;j<Companies[i].material.length; j++){
              if(targetMaterial == Companies[i].material[j]["Material Name"]){
                number = parseInt(Companies[i].material[j].Number);
                currentLibilities = parseInt(Companies[i]["Current Libilities"]);
                Expenses = parseInt(Companies[i].Expenses);
                number -= n;
                currentLibilities -= a;
                AM = "Libilities-"+a;
                Expenses += a;
                Companies[i].material[j].Number = number;
                Companies[i]["Current Libilities"] = currentLibilities;
                Companies[i].Expenses = Expenses;
                Companies[i]["Record Date"] = RD;
                break;
              }
            }
          }
        }
      }else{
        for(var i=0;i<Companies.length;i++){
          accountingType = "Pay/Salary";
          ITEMorEMP = targetEmployee;
          PRIorSAL = a;
          n = "-";
          if(Companies[i].Company == targetCompay){
            for(var j=0;j<Companies[i].employee.length; j++){
              if(targetEmployee == Companies[i].employee[j]["Employee Name"]){
                currentLibilities = parseInt(Companies[i]["Current Libilities"]);
                Expenses = parseInt(Companies[i].Expenses);
                currentLibilities -= a;
                Expenses += a;
                AM = "Libilities-"+a;
                Companies[i]["Current Libilities"] = currentLibilities;
                Companies[i].Expenses = Expenses;
                Companies[i]["Record Date"] = RD;
                break;
              }
            }
          }
        }
      }
    }else if(targetAccount == accountType[1]){
      accountingType = "Receive/Product";
      ITEMorEMP = targetProduct;
      PRIorSAL = p;
      for(var i=0;i<Companies.length;i++){
        if(Companies[i].Company == targetCompay){
          for(var j=0;j<Companies[i].product.length; j++){
            if(targetProduct == Companies[i].product[j]["Product Name"]){
              number = parseInt(Companies[i].product[j].Number);
              currentAssets = parseInt(Companies[i]["Current Assets"]);
              Revenue = parseInt(Companies[i].Revenue);
              number -= n;
              currentAssets += a;
              Revenue += a;
              AM = "Assets+"+a;
              Companies[i].product[j].Number = number;
              Companies[i]["Current Assets"] = currentAssets;
              Companies[i].Revenue = Revenue;
              Companies[i]["Record Date"] = RD;
              break;
            }
          }
        }
      }
    }else{
      targetOther = document.getElementById("selectInorOut").value;
      n = "-";
      ITEMorEMP = "-";
      PRIorSAL = "-";
      for(var i=0;i<Companies.length;i++){
        if(Companies[i].Company == targetCompay){
          if(targetOther == "Revenue"){
            accountingType = "Other/Revenue";
            currentAssets = parseInt(Companies[i]["Current Assets"]);
            Revenue = parseInt(Companies[i].Revenue);
            currentAssets += parseInt(a);
            Revenue += parseInt(a);
            AM = "Assets+"+a;
            Companies[i]["Current Assets"] = currentAssets;
            Companies[i].Revenue = Revenue;
            Companies[i]["Record Date"] = RD;
          }else{
            accountingType = "Other/Expenses";
            currentAssets = parseInt(Companies[i]["Current Assets"]);
            Expenses = parseInt(Companies[i].Expenses);
            currentAssets -= parseInt(a);
            Expenses += parseInt(a);
            AM = "Assets-"+a;
            Companies[i]["Current Assets"] = currentAssets;
            Companies[i].Expenses = Expenses;
            Companies[i]["Record Date"] = RD;
          }
          break;
        }
      }
    }
    var jsondata = {"Record Date": RD,
                    "Company": targetCompay,
                    "Accounting Type": accountingType,
                    "Item/Employee":ITEMorEMP,
                    "Price/Salary":PRIorSAL,
                    "Number":n,
                    "Amount":AM,
                    "Note":NOTE,
                  };
    recordtable.push(jsondata);
    //console.log("recordtable:",recordtable);
    updateLocalStorage();
    alert("saved");
  }
}

var show = "<div id = 'initialdisplay'><h2 id='inith2'>You have not accounting record</h2>"+
            "<p id='initp'>Add your first accounting record.</p>"+
            "<button id='accountingbtn'>Accounting</button></div>"
/*accountrecordtable----------------------------------------*/
function accountrecord(){
  document.getElementById("sectionArea").innerHTML="";
  document.getElementById("title").innerHTML = "Account Record";
  if(recordtable != ''){
    document.getElementById("sectionArea").appendChild(updateaccountrecord(recordtable));
  }else{
    document.getElementById("sectionArea").innerHTML = show;
    document.getElementById("accountingbtn").addEventListener('click',account,false);
  }
}

function updateaccountrecord(data){
  var node = document.createElement("table");
    var tr = document.createElement("tr");
    var headers = Object.keys(data[0]);
    for (var i=0; i<headers.length; ++i) {
        var header = headers[i];
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(header));
        tr.appendChild(th);
    }
    node.appendChild(tr);
    data.forEach(function (rowdata) {
       tr = document.createElement("tr");
       for (var i=0; i<headers.length; ++i) {
            var header = headers[i];
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(rowdata[header]));
            tr.appendChild(td);
        }
        node.appendChild(tr);
    });
    return node;
}
function sortTable(){
  var table,rows,switching,i,j,x,y,shouldSwitch,xx,yy;
  var n = document.getElementsByClassName("sort");
  var sorttype = this.innerHTML;
  for(j=0; j<n.length; j++){
    if(n[j].innerHTML == sorttype){
      break;
    }
  }
  //console.log(j);
  asc = -asc;
  sessionStorage.setItem('asc', asc);
  table = document.getElementById("dashboardtable");
  switching = true;
  while(switching){
    switching = false;
    rows = table.rows;
    for(i=1; i<(rows.length -1); i++){
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[j];
      y = rows[i+1].getElementsByTagName("td")[j];
      if(sorttype == "Current Assets" || sorttype == "Current Libilities" || sorttype == "Revenue" || sorttype == "Expenses"){
        xx = Number(x.innerHTML);
        yy = Number(y.innerHTML);
      }else{
        xx = x.innerHTML.toLowerCase();
        yy = y.innerHTML.toLowerCase();
      }
      if(asc == 1){
        if(xx < yy){
          shouldSwitch = true;
          break;
        }
      }else{
        if(xx > yy){
          shouldSwitch = true;
          break;
        }
      }
    }
    if(shouldSwitch){
      rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
      switching = true;
    }
  }
}

window.addEventListener( "load", start, false );