const electron = require("electron");
const { type } = require("jquery");
const ipc = electron.ipcRenderer;
const $ = require("jquery");

// packing data
var data = {
    invNumber: invNumber,
    customer: customer,
    createdDate: createdDate,
    dueDate: dueDate
};
// sending data to main process
const submit = document.getElementById("submit");
submit.addEventListener("click", function(){
    let invNumber = document.getElementById("invNumber").value;
    let customer = document.getElementById("customer").value;
    let createdDate = document.getElementById("createdDate").value;
    let dueDate = document.getElementById("dueDate").value;
    let discount = document.getElementById("discount").value;
    
    // packing data
    let data = {
        invNumber: invNumber,
        customer: customer,
        createdDate: createdDate,
        dueDate: dueDate,
        discount: discount
    };

    ipc.send("invoiceData", data);
    // console.log(data);
    // let win = electron.remote.getCurrentWindow();
    // win.close();
})

const load = document.getElementById("load");
load.addEventListener("click", function(){
    let itemsAmount = $("table tr:not(:first-child)").length;
    let items = new Array();
    let item = new Object();

    let product = document.getElementsByClassName("product");
    let quantity = document.getElementsByClassName("quantity");
    let discount = document.getElementsByClassName("discount");
    let description = document.getElementsByClassName("description");

   //  for (var i = 0; i < itemsAmount.length; i++){
   //       item.product = product[i];
   //       item.quantity = quantity;
   //       item.discount = discount;
   //       item.description = description;
   //  }
    console.log(typeof product);
})

// document.addEventListener("DOMContentLoaded", function(){
//     ipc.send("mainWindowLoaded")
//     ipc.on("resultSent", function(evt, result){
//         let resultEl = document.getElementById("result");
//         console.log(result);
//         for(var i = 0; i < result.length;i++){
//             resultEl.innerHTML += "First Name: " + result[i].FirstName.toString() + "<br/>";
//         }
//     });
// });

$(document).ready(function(){
    var x = 1;
    $("#newBtn").click(function () {
       $("table tr:nth-child(2)").clone().find("input").each(function () {
          $(this).val('').attr({
             'id': function (_, id) {
                return id + x
             },
             'name': function (_, name) {
                return name + x
             },
             'value': ''
          });
       }).end().appendTo("table");
       x++;
    });

    $(document).on('click', 'button.deleteBtn', function () {
       $(this).closest('tr').remove();
       return false;
    });
 });