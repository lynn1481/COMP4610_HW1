/* 
  File: script.js
  GUI Assignment4 Part2: jQuery UI Slider and Tab Widgets
  Brief Overview: 
    Add slider and tab widgets by using components in the jQuery UI library. Two-way binding between each input field and each slider. 
    Users can save tables and delete single or multiple tables.
  
  Judy Huang, UMass Lowell Computer Science, ChiungHui_Huang@student.uml.edu 
  Copyright (c) 2023 by Judy.  All rights reserved.  May be freely copied or excerpted for educational purposes with credit to the author. 
  Created by JH on June 16, 2023 at 09:16 PM , Updated by JH on June 18, 2023 at 06:50 PM 
*/
/*
  ##Sources of Help: 
    (1) W3Schools, jQuery Validation plugin (http://plugins.jquery.com), jQuery Plugin Registry (https://plugins.jquery.com/)
    (2) Compares the values of two fields: https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
    (3) Slider Event: https://api.jqueryui.com/slider/#event-create
    (4) Updating an input value from a jQuery slider: https://write.corbpie.com/updating-an-input-value-from-a-jquery-slider/
    (5) JQuery Tabs: https://jqueryui.com/tabs/
    (6) Append tabs: https://stackoverflow.com/questions/16701277/no-such-method-add-for-tabs-widget-instance
    (7) HTML Special Characters: https://www.html.am/reference/html-special-characters.cfm
    (8) Close icon: https://stackoverflow.com/questions/20234118/close-icon-not-showing-in-jquery-ui-tabs ; https://api.jqueryui.com/theming/icons/
    (9) Get checkboxes index: https://stackoverflow.com/questions/590018/getting-all-selected-checkboxes-in-an-array
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

    /* When the inputs has been changed, call onFormChange() to update table.
        Binding each input value to its respective slider. */
    $("#minCol").change(function(){ 
        if(isNaN($("#minCol").val())){
            return;
        }
        $("#minColSlider").slider("value", $(this).val()); // two-way binding
        onFormChange(); 
    });
    $("#maxCol").change(function(){ 
        if(isNaN($("#maxCol").val())){
            return;
        }
        $("#maxColSlider").slider("value", $(this).val());
        onFormChange(); 
    });
    $("#minRow").change(function(){
        if(isNaN($("#minRow").val())){
            return;
        }
        $("#minRowSlider").slider("value", $(this).val()); 
        onFormChange(); 
    });
    $("#maxRow").change(function(){
        if(isNaN($("#maxRow").val())){
            return;
        }
        $("#maxRowSlider").slider("value", $(this).val()); 
        onFormChange(); 
    });

    // Sliders Event and its setting. Also, binding each slider value to its respective input field.
    $("#minColSlider").slider({
        animate: true,
        min:-50,
        max: 50,
        value: 0,
        step: 1,
        distance:0,
        slide: function( event, ui ) { // two-way binding
            $("#minCol").val(ui.value);
            onFormChange();
            
        }
    });
    $("#maxColSlider").slider({
        animate: true,
        min:-50,
        max: 50,
        value: 0,
        step: 1,
        slide: function( event, ui ) {
            $("#maxCol").val(ui.value);
            onFormChange();
        }
    });
    $("#minRowSlider").slider({
        animate: true,
        min:-50,
        max: 50,
        value: 0,
        step: 1,
        slide: function( event, ui ) {
            $("#minRow").val(ui.value);
            onFormChange();
        }
    });
    $("#maxRowSlider").slider({
        animate: true,
        min:-50,
        max: 50,
        value: 0,
        step: 1,
        slide: function( event, ui ) {
            $("#maxRow").val(ui.value);
            onFormChange();
        }
    });

    // Create tabs
    $("#savedTabs").tabs();
    
    // When the user clicked the 'Save Table' Button, call onClickSaveTable()
    $("#saveTableButton").click(function(){ onClickSaveTable(); });
    
    // When the user clicked the 'Delete Selected Table' Button, call onClickDeleteTable()
    $("#deleteTableButton").click(function(){ onClickDeleteTable(); });

});

/* onFormChange(): 
    When the user changed the inputs, check if multForm is valid. 
    If valid, call tableCreate() to create the table. */ 
function onFormChange(){
    // Not to update the table if there are any invalid inputs.
    if(!$("#multForm").valid()) {
        document.getElementById("multTable").innerHTML = "";
        return;
    }
    let colBegin = Number(document.getElementById("minCol").value);
    let colEnd = Number(document.getElementById("maxCol").value);
    let rowBegin = Number(document.getElementById("minRow").value);
    let rowEnd = Number(document.getElementById("maxRow").value);
    tableCreate(colBegin, colEnd, rowBegin, rowEnd);
}

var countTables = 0;
var tabs = "";
var content = "";

/* onClickSaveTable(): 
    When all inputs are valid, allow adding a tab and the table using the current input data. 
    Not to create a tab and show anything if one of the user inputs is invalid. */
function onClickSaveTable() {
    if($("#multForm").valid()){
        if(countTables >= 0){
            let colBegin = Number(document.getElementById("minCol").value);
            let colEnd = Number(document.getElementById("maxCol").value);
            let rowBegin = Number(document.getElementById("minRow").value);
            let rowEnd = Number(document.getElementById("maxRow").value);
            var table = tableCreate(colBegin, colEnd, rowBegin, rowEnd);
            $("#savedTabs ul").append("<li><a href=#content"+(countTables+1)+">["+rowBegin+","+rowEnd+"]&#215["+colBegin+","+colEnd+"]</a><span class='ui-icon ui-icon-close ui-closable-tab'></span><input type=checkbox class=checkbox></li>");
            $("#savedTabs").append("<div id=content"+(countTables+1)+">"+table+"</div>");
            countTables++;
            $(".ui-closable-tab").click("span.ui-icon-close", function() {
                var panelId = $(this).closest("li").remove().attr("aria-controls");
                $("#" + panelId).remove();
            });
        }
        $("#savedTabs").tabs("refresh");
        $("#savedTabs").tabs("option", "active", -1);
    }
}

/* onClickDeleteTable():
    By the index of the selected tabs in the checkbox, remove the selected tabs 
    and their contents (the tables) selected by the user. */
function onClickDeleteTable() {
    if ($(".checkbox").is(":checked")) {
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            var panelId = $(checkboxes[i]).closest("li").remove().attr("aria-controls");
            $("#" + panelId).remove();
        }
    }
    else {
        return ;
    }
    $("#savedTabs").tabs("refresh");
    $("#savedTabs").tabs("option", "active", -1);
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
    document.getElementById("multTable").innerHTML = table;
    return table;
}
