var Q = require('q');
var errorHandler = require('./ErrorHandler');
var validation = require('./Validation');
var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
var winston = require('winston');
var _ = require('lodash');
var app = express();

var client = new elasticsearch.Client({ host: 'localhost:9200', log: 'trace', apiVersion: '2.0' });

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
  response.send({success: 99});
});

app.put('/placeshareadd/:emp_id/:room_number', function(request, response) {
  console.log(request.body, request.params.emp_id,request.params.room_number, 'query', request.query);
  
  if (request.params.room_number){
	  if (validation.IsdiningRoom(request.params.room_number)){
		  logger.info("Dining room id %s is valid",request.params.room_number);
		  response.sendStatus(200);
	  }else{
		  logger.info("Dining room id %s is invalid",request.params.room_number);
		  response.status(500).send({error: 'Invalid dining room number'}) 
	  }
  }
  
});

app.post('/example/:id', function(request, response) {
  console.log(request.body, request.params.id, 'query', request.query);
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
