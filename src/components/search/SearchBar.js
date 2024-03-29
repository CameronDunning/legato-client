import React, { useState } from "react";

import TeacherListItem from "./TeacherListItem";
import VideoListItem from "./VideoListItem";

import {
  TextField,
  MenuItem,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  Card,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import {
  isTeacherNameIncluded,
  isLevelIncluded,
  isInstrumentIncluded,
  isRateIncluded
} from "./helpers/isIncluded";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "80%"
  },
  searchBar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justify: "center"
  },
  card: {
    margin: theme.spacing(2)
  }
}));

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Select");
  const [level, setLevel] = useState("Select");
  const [rate, setRate] = useState("");

  const [isVideo, setIsVideo] = useState(false);
  const [isProfile, setIsProfile] = useState(true);

  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const instruments = [
    "Select",
    "Bassoon",
    "Cello",
    "Clarinet",
    "Double bass",
    "Drums",
    "Flute",
    "French horn",
    "Guitar",
    "Oboe",
    "Organ",
    "Percussion",
    "Piano",
    "Saxophone",
    "Trombone",
    "Trumpet",
    "Viola",
    "Violin",
    "Voice"
  ];

  const levels = ["Select", "Beginner", "Intermediate", "Advanced"];

  let filteredTeachers = props.teachers.filter(function(teacher) {
    let check = false;
    if (
      isTeacherNameIncluded(name, teacher) &&
      isLevelIncluded(level, instrument, teacher) &&
      isInstrumentIncluded(instrument, teacher) &&
      isRateIncluded(rate, teacher)
    ) {
      check = true;
    }
    return check;
  });

  let filteredTeachersRandomOrder = shuffle(filteredTeachers);

  const searchByVideo = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfile(false);
    setIsVideo(true);
  };

  const searchByProfile = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsVideo(false);
    setIsProfile(true);
  };

  const classes = useStyles();

  return (
    <div style={{ paddingBottom: "40px" }}>
      <Paper>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Profiles" onClick={e => searchByProfile(e)} />
          <Tab label="Videos" onClick={e => searchByVideo(e)} />
        </Tabs>
      </Paper>

      <Card className={classes.card} elevate={4}>
        <Typography variant="h5" style={{ marginTop: "1em" }}>
          Search by:
        </Typography>
        <Grid container spacing={3} className={classes.searchBar}>
          <Grid item xs={7} sm={4}>
            <TextField
              className={classes.formControl}
              type="text"
              label="Teacher Name"
              variant="outlined"
              onChange={event => setName(event.target.value)}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ minWidth: 100 }}
            >
              <InputLabel>Max Rate</InputLabel>
              <OutlinedInput
                type="number"
                onChange={event => setRate(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              select
              label="Instrument"
              variant="outlined"
              className={classes.formControl}
              value={instrument}
              onChange={e => setInstrument(e.target.value)}
            >
              {instruments.map((instrument, i) => {
                return (
                  <MenuItem key={i} value={instrument}>
                    {instrument}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              select
              label="Level"
              variant="outlined"
              className={classes.formControl}
              onChange={e => setLevel(e.target.value)}
              value={level}
            >
              {levels.map((level, i) => {
                return (
                  <MenuItem key={i} value={level}>
                    {level}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
        </Grid>
      </Card>

      {isVideo && (
        <div style={{ marginLeft: "16px", marginRight: "16px" }}>
          <Grid container spacing={2} direction="row" alignItems="baseline">
            {filteredTeachersRandomOrder.map(
              teacher =>
                teacher.videos &&
                teacher.videos
                  .filter(video => {
                    if (
                      instrument === "Select" ||
                      video.instrument === instrument
                    ) {
                      return true;
                    }
                    return false;
                  })
                  .map((video, i) => {
                    return (
                      <Grid item key={i} xs={12} md={4}>
                        <VideoListItem
                          key={i}
                          video={video}
                          teacher={teacher}
                          instrument={instrument}
                          setTrigger={props.setTrigger}
                        />
                      </Grid>
                    );
                  })
            )}
          </Grid>
        </div>
      )}

      {isProfile && (
        <div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="baseline"
          >
            {filteredTeachersRandomOrder.map((teacher, i) => (
              <Grid item key={i}>
                <TeacherListItem
                  key={i}
                  teacher={teacher}
                  setTrigger={props.setTrigger}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
