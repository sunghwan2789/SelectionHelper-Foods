document.querySelector('#toggle-nav').addEventListener('click', function(e)
{
    var opened;
    e.preventDefault();
    opened = document.querySelector('nav').classList.toggle('opened');
});
document.querySelector('nav > button').addEventListener('click', function(e)
{
    var opened;
    e.preventDefault();
    opened = this.classList.toggle('opened');
});
