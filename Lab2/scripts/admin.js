// Object contructor
function Item(title, desc, price, image, cat) {
    this.title = title;
    this.description = desc;
    this.price = price;
    this.image = image;
    this.category = cat;
    this.user = "Angelo";
}

function saveItem() {
    // get data
    var title = $("#txtTitle").val();
    var desc = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var image = $("#txtImage").val();
    var cat = $("#selCategory").val();

    // create object
    var theItem = new Item(title, desc, price, image, cat);
    console.log(theItem);

    console.log("the title: ", theItem.title);

    // save object to back end
    var serverURL = "http://127.0.0.1:8080/api/products";
    $.ajax({
        url: serverURL,
        type: "POST",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function (res) {
            console.log("Req succeed", res);
        },
        error: function (error) {
            console.error("Error on req", error);
        }
    });

    // alert the user that the obj has been saved
}

function testAjax() {
    var serverURL = "http://restclass.azurewebsites.net/API/test";

    $.ajax({
        url: serverURL,
        type: "GET",
        success: function (res) {
            console.log("Req succeed", res);
        },
        error: function (error) {
            console.error("Error on req", error);
        }
    });
}

function init() {
    console.log("Init admin page");

    // initializations

    // events
    $("#btnSave").click(saveItem);
}


window.onload = init;