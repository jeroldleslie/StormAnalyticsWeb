const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/storm-events', ['propertyDamageMonthly', 'cropsDamageMonthly', 'stormEventsMonthly', 'minMeanMaxMonthly', 'stormEventOccuranceMonthly']);


router.get('/propertydamage', (req, res) => {
  db.propertyDamageMonthly.aggregate([
    {
      $group: {
        _id: { event_type: "$event_type" },
        totalAmount: { $sum: "$property_damage" }
      }
    }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/propertydamageline', (req, res) => {
  db.propertyDamageMonthly.aggregate([{ $group: { _id: { year: { $year: "$date" }, event_type: "$event_type" }, totalAmount: { $sum: "$property_damage" } } }], function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  })
});

router.get('/propertydamagefortable', (req, res) => {
  db.propertyDamageMonthly.aggregate(
    [{ $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, totalAmount: { $sum: "$property_damage" }, count: { $sum: 1 } } }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});



//Crops
router.get('/cropsdamage', (req, res) => {
  db.cropsDamageMonthly.aggregate([
    {
      $group: {
        _id: { event_type: "$event_type" },
        totalAmount: { $sum: "$crops_damage" },
        count: { $sum: 1 }
      }
    }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/cropsdamageline', (req, res) => {
  db.cropsDamageMonthly.aggregate([{ $group: { _id: { year: { $year: "$date" }, event_type: "$event_type" }, totalAmount: { $sum: "$crops_damage" } } }], function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  })
});

router.get('/cropsdamagefortable', (req, res) => {
  db.cropsDamageMonthly.aggregate(
    [{ $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, totalAmount: { $sum: "$crops_damage" }, count: { $sum: 1 } } }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});




//Deaths Direct
router.get('/deathsdirect', (req, res) => {
  db.stormEventsMonthly.aggregate([
    {
      $group: {
        _id: { event_type: "$event_type" },
        totalAmount: { $sum: "$deaths_direct" },
        count: { $sum: 1 }
      }
    }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/deathsdirectline', (req, res) => {
  db.stormEventsMonthly.aggregate([{ $group: { _id: { year: { $year: "$date" }, event_type: "$event_type" }, totalAmount: { $sum: "$deaths_direct" } } }], function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  })
});

router.get('/deathsdirectfortable', (req, res) => {
  db.stormEventsMonthly.aggregate(
    [{ $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, totalAmount: { $sum: "$deaths_direct" }, count: { $sum: 1 } } }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

//Deaths InDirect
router.get('/deathsindirect', (req, res) => {
  db.stormEventsMonthly.aggregate([
    {
      $group: {
        _id: { event_type: "$event_type" },
        totalAmount: { $sum: "$deaths_indirect" },
        count: { $sum: 1 }
      }
    }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/deathsindirectline', (req, res) => {
  db.stormEventsMonthly.aggregate([{ $group: { _id: { year: { $year: "$date" }, event_type: "$event_type" }, totalAmount: { $sum: "$deaths_indirect" } } }], function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  })
});

router.get('/deathsindirectfortable', (req, res) => {
  db.stormEventsMonthly.aggregate(
    [{ $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, totalAmount: { $sum: "$deaths_indirect" }, count: { $sum: 1 } } }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

//Injuries Direct
router.get('/injuriesdirect', (req, res) => {
  db.stormEventsMonthly.aggregate([
    {
      $group: {
        _id: { event_type: "$event_type" },
        totalAmount: { $sum: "$injuries_direct" },
        count: { $sum: 1 }
      }
    }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/injuriesdirectline', (req, res) => {
  db.stormEventsMonthly.aggregate([{ $group: { _id: { year: { $year: "$date" }, event_type: "$event_type" }, totalAmount: { $sum: "$injuries_direct" } } }], function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  })
});

router.get('/injuriesdirectfortable', (req, res) => {
  db.stormEventsMonthly.aggregate(
    [{ $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, totalAmount: { $sum: "$injuries_direct" }, count: { $sum: 1 } } }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

//Injuries InDirect
router.get('/injuriesindirect', (req, res) => {
  db.stormEventsMonthly.aggregate([
    {
      $group: {
        _id: { event_type: "$event_type" },
        totalAmount: { $sum: "$injuries_indirect" },
        count: { $sum: 1 }
      }
    }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/injuriesindirectline', (req, res) => {
  db.stormEventsMonthly.aggregate([{ $group: { _id: { year: { $year: "$date" }, event_type: "$event_type" }, totalAmount: { $sum: "$injuries_indirect" } } }], function (err, docs) {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  })
});

router.get('/injuriesindirectfortable', (req, res) => {
  db.stormEventsMonthly.aggregate(
    [{ $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, totalAmount: { $sum: "$injuries_indirect" }, count: { $sum: 1 } } }], function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});



router.get('/minmaxmagnitudes', (req, res) => {
  db.minMeanMaxMonthly.aggregate(
    [{ $group: { _id: { event_type: "$event_type" }, min: { $min: "$magnitude_min" }, max: { $max: "$magnitude_max" }, mean: { $avg: "$magnitude_mean" } } }],
    function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});


router.get('/overalleventocc', (req, res) => {
  db.stormEventOccuranceMonthly.aggregate(
    [{ $group: { _id: { event_type: "$event_type" }, count: { $sum: "$num_occ" } } }],
    function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

router.get('/overalleventoccbyyear', (req, res) => {
  db.stormEventOccuranceMonthly.aggregate(
    [{ $group: { _id: { event_type: "$event_type", year: { $year: "$date" } }, count: { $sum: "$num_occ" } } }],
    function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});

//Get all donors
router.get('/locations/:year/:type', function (req, res, next) {
  let _eventtype = req.params.type;
  let _year = parseInt(req.params.year);

  db.location.find(
    { event_type: { $eq: _eventtype }, year: {$eq: _year} }, { lat: 1, lon: 1, _id: 0 },
    function (err, docs) {
      if (err) {
        res.send(err);
      }
      res.json(docs);
    })
});


db.location.find({ event_type: { $eq: "Hail" } }, { lat: 1, lon: 1, _id: 0 })
module.exports = router;