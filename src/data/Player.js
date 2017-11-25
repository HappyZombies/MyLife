import Chance from "chance";
import Actions from "./Actions";
import School from "../utils/School"
const chance = new Chance();

class Player {
    constructor() {
        // their unique identifier
        this.id = chance.guid();
        // the players age
        this.age = 0;
        // their gender
        this.gender = chance.gender().toLowerCase();
        // pronoun
        this.pronoun = this.gender === "male" ? "his" : "her";
        // their name based on the gender.
        this.name = chance.name({ gender: this.gender });
        // their happiness, starts at 100
        this.happiness = 100;
        // their apperance, this affects their love life, their jobs and other things
        this.appearance = chance.d100();
        // fitness, this affects...somethings
        this.fitness = chance.d100();
        // how smart you are.
        this.intelligence = chance.d100();
        // whether the player is alive anymore.
        this.alive = true;
        // when active, their intelligence will slighty increase
        this.inSchool = false;
        // the country of birth
        this.country = chance.country({ full: true });
        // actions object that increases stats based on their value.
        this.actions = new Actions();
        // activities that will execute every year.
        this.activities = [new School()]

    }
}

export default Player;