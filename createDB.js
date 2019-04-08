var mongoose = require('mongoose');
var uri = "mongodb+srv://admin:<password>@clusterrega-oesvq.mongodb.net/test?retryWrites=true";
uri = uri.replace("test", "Registan")


mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});


var async = require('async')
var Hero = require('./models/hero').Hero;
// очистим бд
// вставим три героя
// закроем соединение с бд
function open(callback){
  mongoose.connection.on('open', callback)
}

function dropDB(callback){
  var db = mongoose.connection.db
  db.dropDatabase(callback)}

function insertHero(callback){
    async.parallel([
      function(callback){
        var pig = new Hero({
          nick: "Pig"
        })
        pig.save(function(err,pig){
          callback(err, "Pig")
        })
      },
      function(callback){
        var vinni = new Hero({
          nick: "Vinni"
        })
        vinni.save(function(err,vinni){
          callback(err,"vinni")
        })
      },
      function(callback){
        var sova =new Hero({
          nick: "Sova"
        })
        sova.save(function(err,sova){
          callback(err,"sova")
        })
      }
    ],
    function(err,result){
      callback(err)
    })
  }
  function close(callback){
    mongoose.disconnect(callback)
  }

  async.series([
    open,
    dropDB,
    insertHero,
    close
  ],
function(err,result){
  if(err) throw err
  console.log("OK!!!")
}
)
