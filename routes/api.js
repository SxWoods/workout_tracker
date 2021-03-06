const router = require('express').Router();
const Workout = require('../models/workout');

router.post("/api/workouts", (req,res) => {
    Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
      .sort({ date: -1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
      .sort({ _id: -1 })
      .limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
});

router.put("/api/workouts/:id", (req,res) => {
    Workout.findByIdAndUpdate(req.params.id, 
        {$push:{exercises:req.body}},
        {new:true,runValidators:true})
        .then(dbWorkout => {
            res.json(dbWorkout);
          })
          .catch(err => {
            res.status(400).json(err);
          });
});



module.exports = router;