var foodPreview = document.createElement('iframe');
foodPreview.id = 'foodp';
foodPreview.classList.add('load');
document.body.addEventListener('mousemove', function(e)
{
    foodPreview.style.left = e.clientX + 'px';
    foodPreview.style.top = e.clientY + 20 + 'px';
    if (!/foodh/.test(e.target.className))
    {
        foodPreview.classList.add('load');
        return;
    }
    foodPreview.classList.remove('load');
    var src = 'https://duckduckgo.com/?iax=1&ia=images&q=' + encodeURIComponent(e.target.textContent) + '#zero_click_wrapper';
    if (src != foodPreview.src)
    {
        foodPreview.src = src;
    }
});
document.body.appendChild(foodPreview);
