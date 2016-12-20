"use strict";
const data_stat = {
    fg_per_g: "FGM",
    fga_per_g: "FGA",
    fg3_per_g: "TPM",
    ft_per_g: "FTM",
    fta_per_g: "FTA",
    trb_per_g: "RB",
    ast_per_g: "AST",
    stl_per_g: "STL",
    blk_per_g: "BLK",
    tov_per_g: "TOV",
    pts_per_g: "PTS"
};
class Player {
    constructor(fName, lName, team) {
        this.firstname = fName;
        this.lastname = lName;
        this.team = team;
        this.FGA = 0;
        this.FGM = 0;
        this.FTA = 0;
        this.FTM = 0;
        this.RB = 0;
        this.AST = 0;
        this.STL = 0;
        this.BLK = 0;
        this.TOV = 0;
        this.PTS = 0;
        this.TPM = 0;
    }
    toJson() {
        let jsoned = {};
        let _this = this;
        Object.getOwnPropertyNames(_this).forEach((prop) => {
            const val = _this[prop];
            if (prop === 'toJSON' || prop === 'constructor') {
                return;
            }
            if (typeof val === 'function') {
                jsoned[prop] = val.bind(jsoned);
                return;
            }
            jsoned[prop] = val;
        });
        return jsoned;
    }
    loadStats($, href) {
        let statRow = $('a[href="' + href + '"]').parent().parent().find('td');
        console.log('LOAD STATS');
        console.log(statRow.length);
        let _player = this;
        statRow.each(function (i, index) {
            let temp = $(this).html();
            console.log(temp);
            console.log($(this).prop('data-stat'));
            let data_stat_prop = $(this).prop('data-stat');
            if (data_stat[data_stat_prop]) {
                console.log('DATA-STAT ' + data_stat[data_stat_prop]);
                let stat_prop = data_stat[data_stat_prop];
                _player[stat_prop] = $(this).text();
            }
        });
        console.log('POINTS + ' + this.PTS);
    }
    importStatLine(statline) {
        for (var stat in statline) {
            if (this[stat]) {
                this[stat] += statline[stat];
            }
            else {
                this[stat] = statline[stat];
            }
        }
    }
}
exports.Player = Player;
