var fs = require('fs')
var path = require('path')
var http = require('http')
var httpProxy = require('http-proxy')
var $ = require('./jquery')
var urlMod = require('url')

function print(s){
    console.log(s+'\n');return;

    var $logs = $('.logs')
    if ($logs[0].scrollHeight > 1000){
        $logs.html('')
    }
    $('.logs').append(s+'<br><br>')[0].scrollTop = 2000
}

print('logs...')

//! 数据操作
var DataOP = function (){
    var currentPath = process.cwd()
    var dataPath = path.join(currentPath, 'data.json')
    var data = {urlMapping:{}}

    if (fs.existsSync(dataPath)){
        try {
            data = JSON.parse(fs.readFileSync(dataPath))
        }
        catch (ex){
        }
    }

    return {
        getUrlMapping : function (){
            return data.urlMapping
        },
        saveData : function (url1, url2, urlData){
            if (url1 != ''){
                delete data.urlMapping[url1]
            }

            if (url2 != ''){
                data.urlMapping[url2] = {data:urlData}
            }

            try {
                fs.writeFileSync(dataPath, JSON.stringify(data))
            }
            catch (ex){
                print('文件写入错误！' + ex.toString())
            }
        }
    }
}()

var Main = function (){
    var urlMapping = DataOP.getUrlMapping()
    var proxy = httpProxy.createProxyServer({})

    var server = http.createServer(function (req, res){
        var reqUrl = req.url
        var reqObj = urlMod.parse(reqUrl)
        var reqHref = reqObj.href

        print(JSON.stringify(urlMod.parse(reqUrl)))

        res.setHeader('X-Proxy-Header', 'small-proxy-server')

        //如果配置了mock
        if (reqHref in urlMapping){
            print('<b style="color:#4cae4c">' + reqUrl + '</b>')
            var customRes = urlMapping[reqHref]
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.write(customRes.data)
            res.end()
        }
        else {
            print(reqUrl)
            print(reqObj.protocol + '//' + reqObj.host)
            proxy.web(req, res, {
                target : reqObj.protocol + '//' + reqObj.host
            })
        }
    })

    return {
        run : function (){
            server.listen(8989)
        }
    }

}()

Main.run()
//module.exports = $.extend(DataOP, Main)





























