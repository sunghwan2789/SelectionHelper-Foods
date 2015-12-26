window.restaurants = new CSVReader('data/restaurants.csv', function(data)
{
    this.id       = data[0];
    this.position = {lat: +data[1], lng: +data[2]};
    this.name     = data[3];
    this.tel      = data[4];
    this.foods    = data.slice(5);
});
