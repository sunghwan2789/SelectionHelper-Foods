window.foods = new CSVReader('data/foods.csv', function(data)
{
    this.id                 = data[0];
    this.name               = data[2];
    this.servingSize        = +data[3];
    this.kCalorie           = +data[4];
    this.carbohydrate       = +data[5];
    this.protein            = +data[6];
    this.fat                = +data[7];
    this.sugar              = +data[8];
    this.sodium             = +data[9];
    this.cholestreol        = +data[10];
    this.saturatedFattyAcid = +data[11];
    this.transFattyAcid     = +data[12];
});
