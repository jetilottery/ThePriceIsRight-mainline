define(function () {
    return function scenarioTransform(scenarioString) {

        var scenario = scenarioString.split('|');

        // var scenario = "HHH|BBB|2:Y2,Y2,Y2|2:Y2,Y2,Y2|000000200100:M|1:2,5,2,6,11|5".split('|');

        var parsedScenario = {
            game_1:[],
            game_2:[],
            game_3:{
                win:"",
                points:[]
            },
            game_4:{
                win:"",
                points:[]
            },
            bonus:{
                points: [],
                wheel: false
            },
            mountain:{
                layout:"",
                steps: []
            },
            wheel:'',
        };

        // console.table((function () {
        //     var data = {};
        //     Object.keys(scenarioData).forEach(function (e) {
        //        if(e !== 'prizeTable') {
        //            data[e] = scenarioData[e];
        //        }
        //     });
        //     return data;
        // })());

        scenario[0].split("").forEach(function (element) {
            parsedScenario.game_1.push({
                value:element[0],
                bonus:element[1]
            });
        });

        scenario[1].split("").forEach(function (element) {
            parsedScenario.game_2.push({
                value:element[0],
                bonus:element[1]
            });
        });
        parsedScenario.game_3.win = scenario[2].split(':')[0];
        parsedScenario.game_4.win = scenario[3].split(':')[0];

        scenario[2].split(':')[1].split(",").forEach(function (element) {
            parsedScenario.game_3.points.push({
                value: element.split('')[0],
                symbol: element.split('')[2] !== void(0) ? element.split('')[1] + element.split('')[2] : element.split('')[1],
            });
        });
        scenario[3].split(':')[1].split(",").forEach(function (element) {
            parsedScenario.game_4.points.push({
                value: element.split('')[0],
                symbol: element.split('')[2] !== void(0) ? element.split('')[1] + element.split('')[2] : element.split('')[1],
            });
        });
        parsedScenario.bonus.points = scenario[4].split(':')[0].split("");
        parsedScenario.bonus.wheel = scenario[4].split(':')[1] === 'M';

        parsedScenario.mountain.layout = scenario[5].split(":")[0];
        parsedScenario.mountain.steps = String(scenario[5].split(":")[1]).split(',');

        parsedScenario.wheel = scenario[6];

        console.log('ParsedData', parsedScenario);

        return parsedScenario;
    };
});
