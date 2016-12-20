/**
 * Created by areynolds2 on 11/6/2016.
 */
var app = {};

var app_constants = {
    LEAGUE_URL : 'https://basketball.fantasysports.yahoo.com/nba/101733',
    MY_TEAM_INDEX : 1
};

app.myTeam = []

app.opposingTeam = [
    { name : 'James Harden' , team : 'HOU'}
];

app.team1 = {
    team_table_id : '#team1Table',
    team_totals_table_id : '#AndrewsTeam'
};

app.team2 = {
    team_table_id : '#team2Table',
    team_totals_table_id : '#OpposingTeam'
};

$(document).ready(function(){
    console.log('runner');

    app.myTeam.forEach(function(player , index){
        var firstname = player.name.split(' ')[0];
        var lastname = player.name.split(' ')[1];
        var team = player.team;
        var paramStr = "fName=" + firstname + "&lName=" + lastname + "&team=" + team;
        if(player.cut){
            paramStr += '&cutdate=' + player.cut;
        }
        $.get('/connect/getPlayerWeeklyStats?' + paramStr)
            .done(function(data){
                if( player.cut ){
                    data.cut = true;
                }
                app.addPlayerToHtml(data , app.team1 );
            })
            .fail(function(err){
                alert('ERROR');
            })

    });

    app.opposingTeam.forEach(function(player , index){
        var firstname = player.name.split(' ')[0];
        var lastname = player.name.split(' ')[1];
        var team = player.team;
        var paramStr = "fName=" + firstname + "&lName=" + lastname + "&team=" + team;
        if(player.cut){
            paramStr += '&cutdate=' + player.cut;
        }
        $.get('/connect/getPlayerWeeklyStats?' + paramStr)
            .done(function(data){
                if( player.cut ){
                    data.cut = true;
                }
                app.addPlayerToHtml(data, app.team2 );
            })
            .fail(function(err){
                alert('ERROR');
            })

    });
    $('#generateProjectionBtn').click( app.generateProjectionFn )
});

app.addPlayerToHtml = function(player , team ){
    var $table = $(team.team_table_id);
    var $row = $('<tr>');
    if(player.cut){
        $row.addClass('danger');
    }
    $row.append('<td>' + player.firstname + ' ' + player.lastname +'</td>');
    $row.append('<td>' + player.team + '</td>');
    var fgpct = parseFloat(player.FGM) / parseFloat( player.FGA ) * 100 ;
    var ftpct = parseFloat(player.FTM) / parseFloat( player.FTA ) * 100
    $row.append('<td>' + fgpct.toFixed(2) +'</td>');
    $row.append('<td>' + ftpct.toFixed(2) +'</td>');
    $row.append('<td>' + player.TPM +'</td>');
    $row.append('<td>' + player.PTS +'</td>');
    $row.append('<td>' + player.RB +'</td>');
    $row.append('<td>' + player.AST +'</td>');
    $row.append('<td>' + player.STL +'</td>');
    $row.append('<td>' + player.BLK +'</td>');
    $row.append('<td>' + player.TOV +'</td>');
    $table.append($row);
    app.addPlayerStatToTeamStats( player , team )
};


app.addPlayerStatToTeamStats = function( player , team ){
    for(var stat in player){
        if( ! isNaN( parseInt( player[stat]) ) ){
            if( team[stat] ){
                team[stat] += parseFloat ( player[stat] ) ;
            } else{
                team[stat] = player[stat];
            }
        }
    }
    app.updateTeamTableHtml( team );
};

app.updateTeamTableHtml = function( team ){
    var $team = $(team.team_totals_table_id);
    var fgpct = parseFloat(team.FGM) / parseFloat( team.FGA ) * 100;
    var ftpct = parseFloat(team.FTM) / parseFloat( team.FTA ) * 100;
    $( $team.find('td')[0] ).html( fgpct.toFixed(2) );
    $( $team.find('td')[1] ).html( ftpct.toFixed(2) );
    $( $team.find('td')[2] ).html( team.TPM.toFixed(2) );
    $( $team.find('td')[3] ).html( team.PTS.toFixed(2) );
    $( $team.find('td')[4] ).html( team.RB.toFixed(2) );
    $( $team.find('td')[5] ).html( team.AST.toFixed(2) );
    $( $team.find('td')[6] ).html( team.STL.toFixed(2) );
    $( $team.find('td')[7] ).html( team.BLK.toFixed(2) );
    $( $team.find('td')[8] ).html( team.TOV.toFixed(2) );
};

app.generateProjectionFn = function(){
    console.log('GENERATING PROJECTION');

    app.myTeam.forEach(function(player , index){
        if( ! player.injury_flag && ! player.cut ){
            var firstname = player.name.split(' ')[0];
            var lastname = player.name.split(' ')[1];
            var team = player.team;
            var paramStr = "fName=" + firstname + "&lName=" + lastname + "&team=" + team;
            $.get('/connect/getPlayerStats?' + paramStr)
                .done(function(data){
                    app.generatePlayerProjectWeeklyStats(data);
                    app.addPlayerStatToTeamStats(data , app.team1 );
                })
                .fail(function(err){
                    alert('ERROR');
                })
        }
    });

    app.opposingTeam.forEach(function(player , index){
        if( ! player.injury_flag && ! player.cut ){
            var firstname = player.name.split(' ')[0];
            var lastname = player.name.split(' ')[1];
            var team = player.team;
            var paramStr = "fName=" + firstname + "&lName=" + lastname + "&team=" + team;
            $.get('/connect/getPlayerStats?' + paramStr)
                .done(function(data){
                    app.generatePlayerProjectWeeklyStats(data);
                    app.addPlayerStatToTeamStats(data, app.team2 );
                })
                .fail(function(err){
                    alert('ERROR');
                })
        }
    });

};

app.generatePlayerProjectWeeklyStats = function(player){
    var games = player.wk_games;
    for(var key in player){
        if( ! isNaN( parseInt( player[key]) ) &&
            key != 'wk_games'){
            var game_projection = player[key];
            player[key] = parseFloat(game_projection) * games;
        }
    }
};