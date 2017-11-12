
class School {
    constructor(player, event) {
        this.player = player;
        this.event = event;
        this._studyLeisureTime = this.player.actions.LeisureTime.STUDY.active ? .1 : 0;
            this.intelligenceValues = {
                IN_SCHOOL_ABOVE_AVERAGE: 0.75 + this._studyLeisureTime,
                IN_SCHOOL_AVERAGE: 0.5 + this._studyLeisureTime,
                IN_SCHOOL_BELOW_AVERAGE: 0.3 + this._studyLeisureTime,
                NOT_IN_SCHOOL_REALLY_SMART: 0.1 + this._studyLeisureTime,
                NOT_IN_SCHOOL: -0.25 + this._studyLeisureTime
            }
        this.increaseIntelligence();
        this.startSchool();
    }
    startSchool() {
        if (this.player.age === 6) {
            this.event.addSmallEvent({ message: `${this.player.name} started school.` });
            this.player.inSchool = true;
        }
        if (this.player.age === 18) {
            this.event.addSmallEvent({ message: `${this.player.name} graduated from High School.` });
            this.player.inSchool = false;
        }
    }

    increaseIntelligence() {
        if (this.player.inSchool) {
            this._inSchoolIntelligence();
        } else if (this.player.inSchool && this.player.age > 6) {
            this._notInSchoolIntelligence();
        }
        if (this.player.intelligence >= 100) {
            this.player.intelligence = 100;
        }
    }

    _inSchoolIntelligence() {
        if (this.player.intelligence >= 85) {
            this.player.intelligence = this.player.intelligence + this.intelligenceValues.IN_SCHOOL_ABOVE_AVERAGE;
        } else if (this.player.intelligence <= 84 && this.player.intelligence >= 25) {
            this.player.intelligence = this.player.intelligence + this.intelligenceValues.IN_SCHOOL_AVERAGE;
        } else {
            this.player.intelligence = this.player.intelligence + this.intelligenceValues.IN_SCHOOL_BELOW_AVERAGE;
        }
    }


    _notInSchoolIntelligence() {
        if (this.player.intelligence >= 90) {
            this.player.intelligence = this.player.intelligence + this.intelligenceValues.NOT_IN_SCHOOL_REALLY_SMART;
        } else if (this.player.intelligence <= 25) {
            this.player.intelligence = this.player.intelligence + this.intelligenceValues.NOT_IN_SCHOOL;
        }
    }

    /**
     * Returns both player and event.
     */
    getObj() {
        return { player: this.player, event: this.event };
    }

    getPlayer() {
        return this.player;
    }

    getEvent() {
        return this.event;
    }


}

export default School;