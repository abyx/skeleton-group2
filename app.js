var Q = require('q');
var errorHandler = require('./ErrorHandler');
var validation = require('./Validation');
var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var Pusher = require('pusher');
var winston = require('winston');
var _ = require('lodash');
var app = express();

var diningRoomCurrent = [{roomID:1,currentOccupancy:99, lastUpdDate:new Date()},{roomID:2,currentOccupancy:30, lastUpdDate:new Date()},{roomID:3,currentOccupancy:15, lastUpdDate:new Date()}]

var diningRoomMetadata =
[
  {
    code:1,
    name:'Merkazi',
    capacity: 300,
    small:100,
    medium:200
  },
  {
    code:2,
    name:'Aviv',
    capacity: 200,
    small:50,
    medium:150
  },
  {
    code:3,
    name:'TakeAway',
    capacity: 25,
    small:5,
    medium:10
  }
]

var client = new elasticsearch.Client({ host: 'localhost:9200', log: 'trace', apiVersion: '2.0' });

var pusher = new Pusher({
  appId: '152324',
  key: '44c410ff9a1099ed08d8',
  secret: '7ef99fced8aa266072d2'
});

var logger = new (winston.Logger)({
  transports: [
   // new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/log/debug.log', json: false })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/log/exceptions.log', json: false })
  ],
  exitOnError: false
});
module.exports = logger;


app.use(express.static('public'));
app.use(bodyParser.json());

errorHandler.getErrorString(2);

app.param('id', function(req, res, next) {
  next();
});

app.get('/example', function(request, response) {
  response.send({success: true});
});

app.get('/placeshare', function(request, response) {
  diningRoomCurrent.forEach(function(dr){
    dr.lastUpdDate = new Date();
  });
  response.send(diningRoomCurrent);
});

app.get('/placeshare/metadata', function(request, response) {
  response.send(diningRoomMetadata);
});

app.put('/placeshareadd/:emp_number/:room_number/', function(request, response) {
  
  if (request.params.room_number && request.params.emp_number){
    //console.log(diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}))
	  if (diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}) &&
          validation.IsdiningRoom(request.params.room_number) &&
          !isNaN(request.params.emp_number) && request.params.emp_number > 0)
      {
		  logger.info("Dining room id %s is valid",request.params.room_number);
          diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}).currentOccupancy += parseInt(request.params.emp_number);
        //console.log("Before if: currentOccupancy" + diningRoomCurrent[request.params.room_number - 1].currentOccupancy)
        if (diningRoomCurrent[request.params.room_number - 1].currentOccupancy > diningRoomMetadata[request.params.room_number - 1].capacity) {
          diningRoomCurrent[request.params.room_number - 1].currentOccupancy = diningRoomMetadata[request.params.room_number - 1].capacity;
        }
		pusher.trigger('my-channel', 'my-event', {"message": "hello world"});
		  response.sendStatus(200);
		  
	  }else{
		  logger.info("Dining room id %s is invalid",request.params.room_number);
		  response.status(500).send({error: 'Invalid dining room number'}) 
	  }
  }
  
});

app.delete('/placeshareadd/:emp_number/:room_number', function(request, response) {

  if (request.params.room_number && request.params.emp_number){
    if (validation.IsdiningRoom(request.params.room_number) &&
        diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}) &&
        !isNaN(request.params.emp_number) && request.params.emp_number > 0 &&
        validation.IsPozitiveNum(diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}).currentOccupancy))
    {
      logger.info("delete - Dining room id %s is valid",request.params.room_number);
      diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}).currentOccupancy -= parseInt(request.params.emp_number);
      if (diningRoomCurrent.find(function(a) {return a.roomID == request.params.room_number;}).currentOccupancy < 0) {
        //console.log(diningRoomCurrent[request.params.room_number - 1])
        diningRoomCurrent.find(function (a) {
          return a.roomID == request.params.room_number;
        }).currentOccupancy = 0;
      }
	  	pusher.trigger('my-channel', 'my-event', {"message": "hello world"});
      response.sendStatus(200);
    }else{
      logger.info("Dining room id %s is invalid",request.params.room_number);
      //response.status(500).send({error: 'Invalid dining room number'})
      response.status(200).send({error: 'Invalid dining room number'})
    }
  }

});

app.post('/example/:id', function(request, response) {
  //console.log(request.body, request.params.id, 'query', request.query);
  response.sendStatus(200);
});

app.post('/another/example', function(request, response) {
  response.redirect('/example');
});

function resultToJson(result) {
  return _.merge({id: result._id}, result._source);
}

app.route('/resources')
  .get(function(request, response) {
    client.search({
      index: 'myindex',
      type: 'resources'
    }).then(
      function(resources) {
        response.send(_.map(resources.hits.hits, resultToJson));
      },
      function() {
        response.sendStatus(500);
      }
    );
  })
  .post(function(request, response) {
    client.create({
      index: 'myindex',
      type: 'resources',
      body: request.body
    }).then(function(result) {
      return getResourceById(result._id).then(function(object) {
        response.send(object);
      });
    }).catch(function() {
      response.sendStatus(500);
    });
  });

function getResourceById(id) {
  return client.get({
    index: 'myindex',
    type: 'resources',
    id: id
  }).then(function(result) {
    return resultToJson(result);
  });
}

app.route('/resources/:id')
  .get(function(request, response) {
    getResourceById(request.params.id).then(function(result) {
      response.send(result);
    }).catch(function(error) {
      if (error instanceof elasticsearch.errors.NotFound) {
        response.sendStatus(404);
      } else {
        response.sendStatus(500);
      }
    });
  })
  .delete(function(request, response) {
    client.delete({
      index: 'myindex',
      type: 'resources',
      id: request.params.id
    }).then(function(result) {
      response.sendStatus(204);
    }).catch(function(error) {
      if (error instanceof elasticsearch.errors.NotFound) {
        response.sendStatus(404);
      } else {
        response.sendStatus(500);
      }
    });
  })
  .put(function(request, response) {
    // NOTE: this is a partial update
    client.update({
      index: 'myindex',
      type: 'resources',
      id: request.params.id,
      body: {doc: request.body}
    }).then(function(result) {
      return getResourceById(result._id).then(function(object) {
        response.send(object);
      });
    }).catch(function(error) {
      if (error instanceof elasticsearch.errors.NotFound) {
        response.sendStatus(404);
      } else {
        response.sendStatus(500);
      }
    });
  });


client.ping({requestTimeout: 3000, hello: 'hey'}).then(
  function() {
    var server = app.listen(3000, function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log(' [*] Listening at http://%s:%s', host, port);
	  logger.info(' [*] Listening at http://%s:%s', host, port);
    });
  },
  function(err) {
    process.exit(1);
  }
);
