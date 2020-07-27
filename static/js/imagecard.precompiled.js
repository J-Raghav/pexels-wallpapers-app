(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['imagecard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"card border-0\">\r\n      <img class=\"card-img\" src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? lookupProperty(stack1,"large") : stack1), depth0))
    + "\">\r\n      <div class=\"card-img-overlay bottom d-flex justify-content-between p-3\">\r\n        <a href=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"photographer_url") || (depth0 != null ? lookupProperty(depth0,"photographer_url") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"photographer_url","hash":{},"data":data,"loc":{"start":{"line":6,"column":17},"end":{"line":6,"column":37}}}) : helper)))
    + "\" id=\"photographer-name\"><span  class=\"\" style=\"\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"photographer") || (depth0 != null ? lookupProperty(depth0,"photographer") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"photographer","hash":{},"data":data,"loc":{"start":{"line":6,"column":87},"end":{"line":6,"column":103}}}) : helper)))
    + "</span></a>\r\n        <a class=\"download-link\" data-src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? lookupProperty(stack1,"original") : stack1), depth0))
    + "\" data-title=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":73},"end":{"line":7,"column":82}}}) : helper)))
    + "\"> <i class=\"fa fa-download\"></i> Download</a>\r\n      </div>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cardImage\" style=\"width:100%;margin-bottom:1rem;display:inline-block\">\r\n"
    + ((stack1 = lookupProperty(helpers,"with").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"image") : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":10,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});
})();