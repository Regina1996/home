var mongoose = require('mongoose');
var uri = "mongodb+srv://admin:Password12345678@clusterrega-oesvq.mongodb.net/test?retryWrites=true";
var uri = uri.replace("test", "Registan");
mongoose.connect('mongodb://localhost:27017/all', {useNewUrlParser: true});
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
        var Alice = new Hero({
          nick: "Alice"
        })
        Alice.save(function(err,Alice){
          callback(err, "Alice")
        })
      },
      function(callback){
        var Rabbit = new Hero({
          nick: "Rabbit"
        })
        Rabbit.save(function(err,Rabbit){
          callback(err,"Rabbit")
        })
      },
      function(callback){
        var Cat =new Hero({
          nick: "Cat"
        })
        Cat.save(function(err,Cat){
          callback(err,"Cat")
        })
      },
      function(callback){
        var Mad =new Hero({
          nick: "Mad"
        })
        Mad.save(function(err,Mad){
          callback(err,"Mad")
        })
      },
      function(callback){
        var Queen =new Hero({
          nick: "Queen"
        })
        Queen.save(function(err,Queen){
          callback(err,"Queen")
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
