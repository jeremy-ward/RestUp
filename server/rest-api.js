//=== api routes for interaction with supplier database =====
//=== "api/XXXX..."

//=== get required dependencies
module.exports=function(db){
var express     = require('express'),
    router      = express.Router(),
    Controller  = require("./db-controller"),
    dbCtrl      = new Controller(db);

//=== set up api routes =========================

  //GET Routes ========================
    //=== gets all  =
    router.get('/', function(req, res){
      var searchTerm = req.query.name?req.query.name:undefined,
          cb= function(x){res.send(x)};
      dbCtrl.findActive(searchTerm, cb);
    });

    //=== get one  by id
    router.get('/:_id', function(req, res){
      var cb= function(x){res.send(x)};
      dbCtrl.findOne(req.params._id, cb);
    });
  

  //POST Routes ======================
    //=== add a new one ==
    router.post("/", function(req, res){
      var cb= function(x){res.send(x)};
      dbCtrl.addOne(req.body, cb);
    });


  //===PUT Routes======================
    //=== updates one ==
    router.put("/:_id", function(req, res){
      var cb= function(x){res.send(x)};
      dbCtrl.updateOne(req.params._id, req.body, cb);
    });


  //===DELETE Routes ==================
    //=== remove a one (set is as not active, or hard deletes) 
    router.delete("/:_id", function(req, res){
      var cb= function(x){res.send(x)},
          hardDelete = req.query.hard?true:false;
      dbCtrl.deleteOne(req.params._id, hardDelete, cb);
    });

    return router;
};