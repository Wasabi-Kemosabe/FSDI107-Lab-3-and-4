var catalog = [];

function getCatalog() {

    $.ajax({
        url: "http://127.0.0.1:8080/api/products",
        type: "GET",
        success: function (res) {
            console.log("Response from server:", res);

            for (let i = 0; i < res.length; i++) {
                var item = res[i];
                if (item.user == "Angelo") {
                    catalog.push(item); // append to catalog                                      
                }
            }

            displayCatalog();
        },
        error: function (err) {
            console.error("Error getting data", err);
        }
    });
}


function displayCatalog() {
    console.log("Display catalog started");

    // for every item on the catalog array
    for (let i = 0; i < catalog.length; i++) {
        var item = catalog[i];

        displayItem(item);
    }
}

function displayItem(item) {
    // get the reference to UL
    var ul = $("#catalog");

    // create an LI
    var li =
        `
<div class="card" style="width: 18rem;">
<img src="${item.image}" class="card-img-top">
<div class="card-body">
<h5 class="card-title">${item.title}</h5>
<p class="card-text">${item.description}</p>
<h6>${item.price}</h6>
<a href="#" class="btn btn-primary">Add to cart</a>
</div>
</div>`;

    // add the li to ul
    ul.append(li);
}

function search() {
    var text = $("#txtSearch").val().toLowerCase();
    console.log("User wants to search for: " + text);

    // clear
    $("#catalog").html('');

    for (let i = 0; i < catalog.length; i++) {
        var item = catalog[i];

        // if the title contains text 
        // OR ( || ) the description contains text 
        // then display item
        if (item.title.toLowerCase().indexOf(text) >= 0 ||
            item.description.toLowerCase().indexOf(text) >= 0) {
            displayItem(item);
        }
    }

}



function homeWork() {
    console.log("Started solving HW");

    var data = [{
            name: "Sergio",
            age: 97,
            color: "black"
        },
        {
            name: "Carl",
            age: 17,
            color: "pink"
        },
        {
            name: "Joseph",
            age: 23,
            color: "red"
        },
        {
            name: "Joan",
            age: 34,
            color: "blue"
        },
        {
            name: "Terese",
            age: 29,
            color: "pink"
        },
        {
            name: "Paul",
            age: 47,
            color: "black"
        },
        {
            name: "Tyler",
            age: 36,
            color: "red"
        },
        {
            name: "Marian",
            age: 31,
            color: "orange"
        },
        {
            name: "Michael",
            age: 35,
            color: "green"
        },
        {
            name: "Jay",
            age: 51,
            color: "pink"
        }
    ];

    // 1 - The name of the oldest user
    solveOldest(data);

    // 2 - The name of the youngest

    // 3 - The list of differt colors

    // 4 - Which color has more occurrences


    console.log("--------------------------------------------");
}

function solveOldest(data) {
    // algorithm 

    var oldest = 0;
    var oldestName = "";

    for (var i = 0; i < data.length; i++) {
        var item = data[i];

        if (item.age > oldest) {
            oldest = item.age;
            oldestName = item.name;
        }
    }

    console.log('oldest:', oldestName);

}


function init() {

    homeWork();

    console.log("Init Catalog Page");
    // initializing
    getCatalog();


    // events
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (args) {
        if (args.keyCode == 13) {
            search();
            args.preventDefault(); // stop page refresh inside a form            
        }
    });

    $(".cat-filter").click(function () {
        console.log($(this));
        var category = $(this).attr('catname');
        console.log("filter by category", category);

    });

}

window.onload = init;







// inv/read homework
/*
    http methods
    http status codes
*/