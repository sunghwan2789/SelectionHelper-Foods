var HealthFood = {};
HealthFood.getHistory = function()
{
    return JSON.parse(localStorage['history'] || '[]');
};
HealthFood.addHistory = function(datetime, food)
{
    var histo = HealthFood.getHistory();
    histo.push({
        datetime: datetime,
        food: food
    });
    HealthFood.setHistory(histo);
};
HealthFood.setHistory = function(histos)
{
    if (typeof histos == 'undefined')
    {
        localStorage.removeItem('history');
        return;
    }
    histos.sort(function(a, b)
    {
        return a.datetime - b.datetime;
    });
    localStorage['history'] = JSON.stringify(histos);
}
HealthFood.getSetting = function()
{
    var defaults = JSON.stringify({
        sex: 'm',
        age: 20,
        weight: 70,
        height: 170
    });
    return JSON.parse(localStorage['setting'] || defaults);
};
HealthFood.setSetting = function(setting)
{
    if (typeof setting == 'undefined')
    {
        localStorage.removeItem('setting');
        return;
    }
    localStorage['setting'] = JSON.stringify(setting);
};
/** 한국인 영양섭취기준 활용가이드 참조 */
HealthFood.getNecessarykCalorie = function(setting)
{
    if (setting.sex == 'f')
    {
        return 354 - 6.91 * setting.age + /*setting.activity*/ 1.12 * (
            9.36 * setting.weight + 7.26 * setting.height
        );
    }
    return 662 - 9.53 * setting.age + 1.11 * (
        15.91 * setting.weight + 5.396 * setting.height
    );
};
/** 최근 몇 시간동안 섭취한 열량을 계산한다.
 * @param hours {Numeber} 시간
 */
HealthFood.getkCalorieLastHours = function(hours)
{
    hours = hours || 24;
    var now = Date.now();
    var histos = HealthFood.getHistory();
    var kCalorie = 0;
    for (var i = 0; i < histos.length; i++)
    {
        var histo = histos[i];
        var diff = (now - histo.datetime) / 1000 / 60 / 60;
        // 1일 영양소 기준치를 바탕으로 건강한지 검토할 것임
        if (diff > hours)
        {
            continue;
        }
        kCalorie += histo.food.kCalorie;
    }
    return kCalorie;
};
HealthFood.isHealthy = function(food)
{
    // 네 끼로 계산해야 하기 때문에 / 3 * 4
    var limit = HealthFood.getNecessarykCalorie(HealthFood.getSetting()) / 3 * 4;
    return HealthFood.getkCalorieLastHours() + food.kCalorie < limit;
};
