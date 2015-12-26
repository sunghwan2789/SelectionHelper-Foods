/** CSV 파일을 읽어 적당한 형식으로 변환하는 객체
 * @param path {String} path to csv
 * @param mapper {Constructor<Array>} id 멤버가 있는 객체 생성자
 */
function CSVReader(path, mapper)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, false);
    xhr.send();
    if (xhr.status != 200)
    {
        return;
    }

    this.data = {};

    var csv = xhr.responseText;
    var stream = csv.replace(/\r\n?/, '\n').split('\n').reverse();
    // ignore first line,,, table structure
    for (var line = stream.pop(); line = stream.pop();)
    {
        var data = new mapper(line.split(','));
        this.data[data.id] = data;
    }
}
/** 모든 행을 순차 탐색하는 함수
 * @param cb {Action<item>} callback
 */
CSVReader.prototype.forEach = function(cb)
{
    for (var i in this.data)
    {
        cb(this.data[i]);
    }
};
/** id를 가진 레코드를 찾는 함수
 * @param id {ID}
 * @see CSVReader()
 */
CSVReader.prototype.find = function(id)
{
    return this.data[id];
};
