/********* 初始化 ************/

var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号\nnode server.js 8888')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /********* 判断路径 ************/

    console.log('含查询字符串的路径\n' + pathWithQuery)

    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        var amount = fs.readFileSync('./database', 'utf8')
        string = string.replace('&&&amount&&&', amount)
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(string)
        response.end()
    } else if (path === '/style.css') {
        var string = fs.readFileSync('./style.css', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css')
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        var string = fs.readFileSync('./main.js', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/javascript')
        response.write(string)
        response.end()
    } else if (path === '/jquery-3.4.1.min.js') {
        var string = fs.readFileSync('./jquery-3.4.1.min.js', 'utf8')
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/javascript')
        response.write(string)
        response.end()
    } else if (path === '/pay') {
        let amount = fs.readFileSync('./database', 'utf8')
        amount -= 1
        fs.writeFileSync('./database', amount)
        let callback = query.callback
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/javascript')
        response.write(`
        ${callback}.call(undefined, 'success')
        `)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write('出错了')
        response.end()
    }

    /********* Server开启结果 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n本地地址 http://localhost:' + port)
console.log('注意：以下地址需修改hosts文件')
console.log('本地地址 http://frank.com:' + port)
console.log('本地地址 http://jack.com:' + port)

