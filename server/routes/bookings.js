var express = require('express');
const app = express();
var router = express.Router();
// var mongojs = require('mongojs');
const mongoose = require('mongoose');
const bookings = require('../models/Booking');
const drivers = require('../models/Driver');
const driverlocation = require('../models/DriverLocation');
const bodyPaser = require('body-parser');

app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
var db = mongoose.connect('mongodbandress', {
  useCreateIndex: true,
  useNewUrlParser: true
});

router.get('/driverslocation', async function(req, res, next) {
  try {
    const resp = await driverlocation.find({});
    res.json(resp);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
});

router.post('/driverslocation', function(req, res, next) {
  var driverLoc = new driverlocation(req.body);
  if (!driverLoc.driverId) {
    console.log(driverLoc);
    res.status(400);
    res.json({
      error: 'Bad Data Format'
    });
  } else {
    driverLoc.save(driverLoc, function(err, savedDriverLocation) {
      if (err) {
        res.send(err);
      }
      res.json(savedDriverLocation);
    });
  }
});

router.put('/driverslocation/:locationId', function(req, res, next) {
  var io = req.app.io;
  var driverLoc = new driverlocation(req.body);
  driverlocation.findById(req.params.locationId, (error, driverLoc) => {
    if (error) {
      res.send(err);
    } else {
      // driverLoc.driverId = req.body.driverId;
      // driverLoc.coordinate = req.body.coordinate;
      driverLoc.socketId = req.body.socketId;
      // return res.json(driverLoc);
      driverLoc.save(driverLoc, function(err, savedDriverLocation) {
        if (err) {
          res.send(err);
        }
        res.json(savedDriverLocation);
      });
    }
  });
});

// router.get('/driverslocationSocket', function(req, res, next) {
//   // var io = req.app.io;
//   var driverLoc = new driverlocation(req.body);

//   driverlocation.findById(req.params.locationId, (error, driverLoc) => {
//     if (error) {
//       res.send(err);
//     } else {
//       // driverLoc.driverId = req.body.driverId;
//       // driverLoc.coordinate = req.body.coordinate;
//       driverLoc.socketId = req.body.socketId;
//       // return res.json(driverLoc);
//       driverLoc.save(driverLoc, function(err, savedDriverLocation) {
//         if (err) {
//           res.send(err);
//         }
//         res.json(savedDriverLocation);
//       });
//     }
//   });
// });

// router.get('/driverslocationSocket',function(req, res, next) {

//   try {
//     const resp = await drivers.find({});
//     res.json(resp);
//     console.log(resp);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get('/driverslocationSocket', async function(req, res, next) {
  driverlocation.find({
    coordinate: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(req.query.logitude),
            parseFloat(req.query.latitude)
          ]
        },
        $maxDistance: 1000
      }
    },
    function(err, location) {
      if (err) {
        res.send(err);
      } else {
        res.send(location);
      }
    }
  });
  try {
    const resp = await driverlocation.find({});
    res.json(resp);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
});

// var mycollection = dbb.collection('bookings');

router.get('/drivers', async function(req, res, next) {
  try {
    const resp = await drivers.find({});
    res.json(resp);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
});

router.post('/drivers', function(req, res, next) {
  var driver = new drivers(req.body);
  if (!driver.firstName) {
    console.log(driver);
    res.status(400);
    res.json({
      error: 'Bad Data Format'
    });
  } else {
    driver.save(driver, function(err, savedDrivers) {
      if (err) {
        res.send(err);
      }
      res.json(savedDrivers);
    });
  }
});

router.get('/bookings', async function(req, res, next) {
  try {
    const resp = await bookings.find({});
    res.json(resp);
    console.log(resp);
  } catch (error) {
    console.log(error);
  }
});

router.post('/bookings', function(req, res, next) {
  var book = new bookings(req.body);
  var nearByDriver = req.body.data.nearByDriver;
  console.log('drivertreqqq', req.body);
  var io = req.app.io;
  if (!book.userName) {
    console.log(book);
    res.status(400);
    res.json({
      error: 'Bad Data Format'
    });
  } else {
    book.save(book, function(err, savedBooking) {
      if (err) {
        res.send(err);
      }
      res.json(savedBooking);
      if (nearByDriver.socketId) {
        io.emit(nearByDriver.socketId + 'driverRequest', savedBooking);
      } else {
        console.log('Driver not Connected');
      }
    });
  }
});

module.exports = router;
