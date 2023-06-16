/* 
  File: script.js
  GUI Assignment4 Part1: Validation Plugin
  Brief Overview: 
    Using the jQuery Validation plugin to check all inputs and display appropriate error messages. 
    When the user changes the form data and passes form validation, generate or update the table immediately.
  
  Judy Huang, UMass Lowell Computer Science, ChiungHui_Huang@student.uml.edu 
  Copyright (c) 2023 by Judy.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author. 
  Created by JH on June 15, 2023 at 05:57 PM , Updated by JH on June 16, 2023 at 01:15 PM 

  ##Sources of Help: 
    (1) W3Schools 
    (2) jQuery Validation plugin (http://plugins.jquery.com)
    (3) jQuery Plugin Registry (https://plugins.jquery.com/)
    (4) Compares the values of two fields: https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
*/

$(document).ready(function(){
    // Checks if a value is greater than or equal to the other value
    $.validator.addMethod("greaterThanEqual",
        function (value, element, param) {
                var $otherElement = $(param);
                if (!$otherElement.val()) return true;
                return parseInt(value) >= parseInt($otherElement.val());
    });

    // Check if a value is less than or equal to the other value
    $.validator.addMethod("lessThanEqual",
    function (value, element, param) {
            var $otherElement = $(param);
            if (!$otherElement.val()) return true;
            return parseInt(value) <= parseInt($otherElement.val());
    });

    // Check if a value is an integer
    $.validator.addMethod("isInteger",
    function (value, element, param) {
            return parseInt(value) == parseFloat(value);
    });

    // Validate the inputs and display messages if a input is invalid
    $("#multForm").validate({
        // Rules for validating the form data
        rules: {
            minCol: {
                required: true,
                number: true,
                isInteger: true,
                range: [-50, 50],
                lessThanEqual: '#maxCol'
            },
            maxCol: {
                required: true,
                number: true,
                isInteger: true,
                range: [-50, 50],
                greaterThanEqual: '#minCol'
            },
            minRow: {
                required: true,
                number: true,
                isInteger: true,
                range: [-50, 50],
                lessThanEqual: '#maxRow'
            },
            maxRow: {
                required: true,
                number: true,
                isInteger: true,
                range: [-50, 50],
                greaterThanEqual: '#minRow'
            }
        },
    
        // Messages that appear if a rule isn't valid.
        messages: {
            minCol: {
                required: "Please enter a number.",
                number: "Please enter a number without having characters or spaces.",
                isInteger: "Please only enter integers.",
                range: "Please enter a number between -50 and 50.",
                lessThanEqual: "Min Column Value must be <= Max Column Value."
            },
            maxCol: {
                required: "Please enter a number.",
                number: "Please enter a number without having characters or spaces.",
                isInteger: "Please only enter integers.",
                range: "Please enter a number between -50 and 50.",
                greaterThanEqual: "Max Column Value must be >= Min Column Value!"
            },
            minRow: {
                required: "Please enter a number.",
                number: "Please enter a number without having characters or spaces.",
                isInteger: "Please only enter integers.",
                range: "Please enter a number between -50 and 50.",
                lessThanEqual: "Min Row Value must be <= Max Row Value!"
            },
            maxRow: {
                required: "Please enter a number.",
                number: "Please enter a number without having characters or spaces.",
                isInteger: "Please only enter integers.",
                range: "Please enter a number between -50 and 50.",
                greaterThanEqual: "Max Row Value must be >= Min Row Value!"
            },
        },
    })

    // When the inputs has been changed, call onFormChange() to update table.
    $("#minCol").change(function(){ onFormChange(); });
    $("#maxCol").change(function(){ onFormChange(); });
    $("#minRow").change(function(){ onFormChange(); });
    $("#maxRow").change(function(){ onFormChange(); });

});

/* onFormChange(): 
    When the user changed the inputs, check if multForm is valid. 
    If valid, call tableCreate() to create the table. */ 
function onFormChange(){
    // Not to update the table if there are any invalid inputs.
    if(!$("#multForm").valid()) {
        return;
    }
    let colBegin = Number(document.getElementById("minCol").value);
    let colEnd = Number(document.getElementById("maxCol").value);
    let rowBegin = Number(document.getElementById("minRow").value);
    let rowEnd = Number(document.getElementById("maxRow").value);
    tableCreate(colBegin, colEnd, rowBegin, rowEnd);
}

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
