var path = require("path");
var sequelize = require("sequelize");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const { json } = require("sequelize");
const { raw } = require("express");


module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login")
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members")
  });

  app.get("/vendor", isAuthenticated, function (req, res) {
    res.render("vendor")
  });

  // app.get("/enterwinery/:id", isAuthenticated, function (req, res) {
  //   res.render("winery")
  // });

  app.get("/winerypage/:id", isAuthenticated, function (req, res) {
    db.Wineries.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Wine, db.Event]

    }).then(function (wineryData) {
      console.log(wineryData.get())
      results = wineryData.get()
      results.Wines = results.Wines.map((wine) => wine.get())
      results.Events = results.Events.map((event) => event.get())
      res.render("winerypage", {
        data: results
      })
      console.log(results)
    })
  });



  app.get("/bookings/:id", isAuthenticated,function(req,res){
    db.Booking.findAll({
      where:{
        EventId: req.params.id
      },
      attributes:['numberbooked'],
      include: [{model:db.User, attributes:['email']}],
      raw:true
    }).then(function(result){
      const x = JSON.stringify(result);
      console.log(x)
      const y = JSON.parse(x)
      console.log(y)
      res.render("booking",{data:x})
      
    }).catch(function (err){
      res.status(401).json(err);
    });
  })

};