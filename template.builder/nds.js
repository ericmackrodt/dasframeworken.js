var htmlparser = require("htmlparser2");
var sys = require('sys');
var rawHtml = "Xyz <script language= javascript>var foo = '<<bar>>';< /  script><!--<!-- Waah! -- -->";
var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
        console.log(error);
    else
        console.log('done');
});
var parser = new htmlparser.Parser(handler);
parser.parseComplete(rawHtml);
sys.puts(sys.inspect(handler.dom, false, null));
//console.log(handler.dom);