var mysql = require("mysql");

var inquirer = require("inquirer");

var table = require("cli-table")

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});


var total;

var nameOfProduct;

var finalPrice;

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    
  });

   function readProducts(){
    console.log("selecting products.....");
    connection.query("SELECT * FROM products", function(err,res){
      if (err) throw err;

      

      for(var i = 0; i<res.length;i+=1){

        var finalPrice = res[i].price.toFixed(1);

        //log("price is " + res[3].price)

        console.log("ID:" + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + finalPrice + " | " + "Stock: " + res[i].stock_quantity);
      }
      start();
      
    })
  }


  // function consoleTotals(){
  //   connection.query("SELECT * FROM products", function(err, res){
      
  //     if (err) throw err;

  //     console.log("Thank you for your purcharse of " + answer.quantity )

  //   })
  // }


  
  


  function start(){
    inquirer.prompt([{
            name:"getId",
            type:"input",
            message:"Enter the ID of the item you wish to purchase!",
            validate:function(value){
              if(isNaN(value) == false){
                return true;
              } else {
                return false;
              }
            } 
          },{
            name:"quantity",
            type:"input",
            message:"how much do you need?",
            validate: function(value){
             var valid = value.match(/^[0-9]+$/)
             if(valid){
               return true
             }
             return "ENTER A VALID NUMBER"
            }
          }]).then(function(answer){
            connection.query('SELECT * FROM products WHERE id = ?',[answer.getId],function(err,res){
              if (answer.quantity > res[0].stock_quantity){ 
                console.log("Insufficient Quantity!")             

              }else{

              //finalTotal = parseInt(answer.quantity);
              finalPrice = res[0].price.toFixed(2);

              total = finalPrice * answer.quantity;
              thisDepartment = res[0].department_name;
              nameOfProduct = res[0].product_name;
              
              

              console.log(nameOfProduct);
              console.log(res[0].price);

              console.log("Thank you for buying " + answer.quantity + " " + nameOfProduct + "!" + " Your total is $" + total)
              //update products to table
              connection.query('UPDATE products SET ? WHERE ? ', [{
                stock_quantity: res[0].stock_quantity - answer.quantity
              },{
                id: answer.getId
              }],function(err,res){
                
              });
              newOrder();

            }


            })
            
          })
  }

function newOrder(){
  inquirer.prompt([{
    type: "confirm",
   message: "Do you wish to place a new order?",
   name: "neworder",
   default: true
    }
    ]).then(function(answer){
      if(true){
        readProducts();
      }else{
        connection.end();
        
        console.log("Thank you for your business!!!");
      }
    })
  };



 readProducts();
