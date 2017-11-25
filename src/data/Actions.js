class Actions {
  constructor() {
    this.LeisureTime = {
      // users can only have two active activities at a time.
      available: 2,
      STUDY: {
        minAge: 6,
        maxAge: 100,
        name: "Study",
        verb: "study",
        description: "Use your free time to study. Increases intelligence.",
        active: false
      },
      SPORTS: {
        minAge: 6,
        maxAge: 60,
        name: "Sports",
        verb: "play sports",
        description:
          "Use your free time to play/practice sports. Increases fitness...",
        active: false
      },
      VIDEOGAMES: {
        minAge: 5,
        maxAge: 100,
        name: "Video Games",
        verb: "play video games",
        description: "Use your free time to play the latest video games.",
        active: false
      },
      // MISCHIEF: {minAge: 6, maxAge: 18, description: "", active: false}
      TV: {
        minAge: 4,
        maxAge: 100,
        name: "TV",
        verb: "watch TV",
        description:
          "Use your free time to watch TV. Who knows, you might learn a thing or two.",
        active: false
      },
      toggleLeisureTime(activity) {
        // This boolean expression could be better I think... TODO: reduce complexity.
        if (this.available === 0 && !this[activity].active) {
          return;
        } else {
          if (this[activity].active) {
            this.available++;
          } else {
            this.available--;
          }
          this[activity].active = !this[activity].active;
        }
      }
    };
  }
}

export default Actions;
