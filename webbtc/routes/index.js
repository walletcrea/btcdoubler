var express = require('express');
var router = express.Router();
var NameGenerator = require("name_generator")
var new_name = NameGenerator();
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});

/* GET home page. */
router.get('/', function(req, res, next) {
    con.query("SELECT id,amount,withdrawadd,time FROM payouts  WHERE withdrawadd !='"+null+"' and `amount`>0 limit 50",function (err,response) {
        console.log(err)
        res.render('index', {title: 'Bitcoin Doubler',users:response,message:'Please enter a valid Bitcoin address'});
    })
}).post('/',function (req,res) {
    con.query("SELECT id FROM account WHERE id='" + req.body.btc + "'", function (err, response) {
        client.getAccount(btc, function (err, account) {
            if (response.length === 0) {
                account.createAddress(null, function (err, address) {
                    var deposit = address.address
                    var user = {
                        id: req.body.btc,
                        balance: 0,
                        withdrawadd: req.body.btc,
                        ref: new_name,
                        deposit: deposit

                    }
                    con.query("INSERT into account SET?", user, function (err, results) {
                        con.query("SELECT balance,ref,deposit,friends FROM account WHERE id='" + req.body.btc + "'", function (error, results) {
                            res.render('dashboard', {balance: results[0].balance,ref:results[0].ref,deposit:results[0].deposit,friends:results[0].friends})
                        })
                    })
                })

            } else {
                con.query("SELECT balance,ref,deposit,friends FROM account WHERE id='" + req.body.btc + "'", function (error, results) {
                    res.render('dashboard', {balance: results[0].balance,ref:results[0].ref,deposit:results[0].deposit,friends:results[0].friends})


                })

            }
        })
    })
})


module.exports = router;
