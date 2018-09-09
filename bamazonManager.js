var inquirer = require("inquirer");
var mysql = require ("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user:"root",
    password:"root",
    database:"bamazon"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id: " + connection.threadId)

})



////read the products!
function readProducts(){
    console.log("selecting products.....");
    connection.query("SELECT * FROM products", function(err,res){
    if (err) throw err;
    for(var i = 0; i<res.length;i+=1){

    //log("price is " + res[3].price)

    console.log("ID:" + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock: " + res[i].stock_quantity);
    }
    })
};


function low(){
    console.log("These are the products with low inventory!")
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5",
    function(err,res){
        if (err) throw err;
        for(var i = 0; i < res.length;i+=1){
        console.log("ID:" + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Stock: " + res[i].stock_quantity);
        }
    })
}

function managerStart(){
    inquirer.prompt([{
        type:"list",
        name: "input",
        choices:["1- View products for sale",
    "2- View low inventory", "3- Add to inventory", "4- Add new product"]

    }]).then(function(answer){
        if(answer.input === "1- View products for sale"){
            readProducts();
        } else if(answer.input === "2- View low inventory"){

            low();

        }

    })
}




managerStart();



