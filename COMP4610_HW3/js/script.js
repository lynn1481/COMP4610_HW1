/* 
  File: script.js
  GUI Assignment3: Creating an Interactive Dynamic Table
  Brief Overview: 
    This assignment is to create and show a multiplication table, and handle invalid inputs appropriately. 
    The user can via HTML fieldset to enter the values of multiplier and multiplicand. 
    Use javascript to check the input values, then create the table with the products. 
    Use CSS to style the page. 
  
  Judy Huang, UMass Lowell Computer Science, ChiungHui_Huang@student.uml.edu 
  Copyright (c) 2023 by Judy.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author. 
  Created by JH on June 01, 2023 at 08:29 PM , Updated by JH on June 12, 2023 at 09:39 PM 

  ##Sources of Help: 
    (1) W3Schools 
    (2) Create table using Javascript: https://stackoverflow.com/questions/14643617/create-table-using-javascript
    (3) Convert a String to Number: https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l
    (4) Check if a Number is Float or Integer: https://www.programiz.com/javascript/examples/float-or-integer
*/

/* tableCreate(): Accept all inputs to calculate the products and display the table. */ 
function tableCreate(colBegin, colEnd, rowBegin, rowEnd) {
    var table = "<table><tr><th></th>";

    // column header
    for (i = colBegin; i <= colEnd; i++) {
        table += "<th>" + i + "</th>";
    }
    table += "</tr>";

    // row header
    for (i = rowBegin; i <= rowEnd; i++) {
        table += "<tr>";
        table += "<th>" + i + "</th>";
        // calculate and display all products
        for (j = colBegin; j <= colEnd; j++) {
            table = table + "<td>" + (i * j) + "</td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    document.getElementById("tableHolder").innerHTML = table;
}

/* onClickCreateTable(): 
    When the user click the create button, catch and check the values from input boxes. 
    If all inputs are valid, call tableCreate() function. */
function onClickCreateTable() {
    var alert = "";
    var noError = true;

    // Convert input text values to numbers
    let colBegin = Number(document.getElementById("minCol").value)
    let colEnd = Number(document.getElementById("maxCol").value)
    let rowBegin = Number(document.getElementById("minRow").value)
    let rowEnd = Number(document.getElementById("maxRow").value)

    /* Check input and display error message */
    // Avoid the user didn't enter anything in input boxes
    if (document.getElementsByTagName("input") != null) {
        // Avoid the user entering strings or characters
        if (isNaN(colBegin) || document.getElementById("minCol").value == '') {
            alert += "<p>Invalid Min Column Value!</p>"; noError = false;
        }
        if (isNaN(colEnd) || document.getElementById("maxCol").value == '') {
            alert += "<p>Invalid Max Column Value!</p>"; noError = false;
        }
        if (isNaN(rowBegin) || document.getElementById("minRow").value == '') {
            alert += "<p>Invalid Min Row Value!</p>"; noError = false;
        }
        if (isNaN(rowEnd) || document.getElementById("maxRow").value == '') {
            alert += "<p>Invalid Max Row Value!</p>"; noError = false;
        }
    }
    // Avoid users entering decimals
    if(Number.isInteger(colBegin) && Number.isInteger(colEnd) && Number.isInteger(rowBegin) && Number.isInteger(rowEnd)){
        // Check the range of Multiplier and Multiplicand
        if (colBegin > colEnd) {
            alert += "<p>Max Column Value must be >= Min Column Value!</p>"; noError = false;
        }
        if (rowBegin > rowEnd) {
            alert += "<p>Max Row Value must be >= Min Row Value!</p>"; noError = false;
        }
        if(Math.abs(colEnd-colBegin) > 200){
            alert += "<p>Range of Column (Multiplier) can't exceed 200!</p>"; noError = false;
        }
        if(Math.abs(rowEnd-rowBegin) > 200){
            alert += "<p>Range of Row (Multiplicand) can't exceed 200!</p>"; noError = false;
        }
    }
    else {
        alert += "<p>Please enter integers!</p>"; noError = false;
    }

    document.getElementById("Error").innerHTML = alert;

    // call tableCreate() if all input are valid
    if (noError) {
        tableCreate(colBegin, colEnd, rowBegin, rowEnd);
    }
}
