/* Riot 2.0.7, @license MIT, (c) 2015 Muut Inc. + contributors */
(function(){var e={version:"v2.0.7"};"use strict";e.observable=function(e){e=e||{};var t={};e.on=function(n,r){if(typeof r=="function"){n.replace(/\S+/g,function(e,n){(t[e]=t[e]||[]).push(r);r.typed=n>0})}return e};e.off=function(n,r){if(n=="*")t={};else if(r){var i=t[n];for(var o=0,u;u=i&&i[o];++o){if(u==r){i.splice(o,1);o--}}}else{n.replace(/\S+/g,function(e){t[e]=[]})}return e};e.one=function(t,n){if(n)n.one=1;return e.on(t,n)};e.trigger=function(n){var r=[].slice.call(arguments,1),i=t[n]||[];for(var o=0,u;u=i[o];++o){if(!u.busy){u.busy=1;u.apply(e,u.typed?[n].concat(r):r);if(u.one){i.splice(o,1);o--}else if(i[o]!==u){o--}u.busy=0}}return e};return e};(function(e,t){if(!this.top)return;var n=location,r=e.observable(),i=u(),o=window;function u(){return n.hash.slice(1)}function f(e){return e.split("/")}function a(e){if(e.type)e=u();if(e!=i){r.trigger.apply(null,["H"].concat(f(e)));i=e}}var l=e.route=function(e){if(e[0]){n.hash=e;a(e)}else{r.on("H",e)}};l.exec=function(e){e.apply(null,f(u()))};l.parser=function(e){f=e};o.addEventListener?o.addEventListener(t,a,false):o.attachEvent("on"+t,a)})(e,"hashchange");e._tmpl=function(){var e={},t=/("|').+?[^\\]\1|\.\w*|\w*:|\b(?:this|true|false|null|undefined|new|typeof|Number|String|Object|Array|Math|Date|JSON)\b|([a-z_]\w*)/gi;return function(t,r){return t&&(e[t]=e[t]||n(t))(r)};function n(e,t){t=(e||"{}").replace(/\\{/g,"￰").replace(/\\}/g,"￱").split(/({[\s\S]*?})/);return new Function("d","return "+(!t[0]&&!t[2]?r(t[1]):"["+t.map(function(e,t){return t%2?r(e,1):'"'+e.replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"'}).join(",")+'].join("")').replace(/\uFFF0/g,"{").replace(/\uFFF1/g,"}"))}function r(e,t){e=e.replace(/\n/g," ").replace(/^[{ ]+|[ }]+$|\/\*.+?\*\//g,"");return/^\s*[\w-"']+ *:/.test(e)?"["+e.replace(/\W*([\w-]+)\W*:([^,]+)/g,function(e,n,r){return r.replace(/\w[^,|& ]*/g,function(e){return i(e,t)})+'?"'+n+'":"",'})+'].join(" ")':i(e,t)}function i(e,n){return"(function(v){try{v="+(e.replace(t,function(e,t,n){return n?"d."+n:e})||"x")+"}finally{return "+(n?'!v&&v!==0?"":v':"v")+"}}).call(d)"}}();(function(e,t){if(!t)return;var n=e._tmpl,r=[],i={},o=document;function u(e,t){for(var n=0;n<(e||[]).length;n++){if(t(e[n],n)===false)n--}}function f(e,t){t&&Object.keys(t).map(function(n){e[n]=t[n]});return e}function a(e,t){return e.filter(function(e){return t.indexOf(e)<0})}function l(e,t){e=t(e)===false?e.nextSibling:e.firstChild;while(e){l(e,t);e=e.nextSibling}}function c(e){var t=e.trim().slice(1,3).toLowerCase(),n=/td|th/.test(t)?"tr":t=="tr"?"tbody":"div";el=o.createElement(n);el.innerHTML=e;return el}function s(e,t){t.trigger("update");u(e,function(e){var r=e.tag,i=e.dom;function o(e){i.removeAttribute(e)}if(e.loop){o("each");return v(e,t)}if(r)return r.update?r.update():e.tag=d({tmpl:r[0],fn:r[1],root:i,parent:t});var u=e.attr,f=n(e.expr,t);if(f==null)f="";if(e.value===f)return;e.value=f;if(!u)return i.nodeValue=f;if(!f&&e.bool||/obj|func/.test(typeof f))o(u);if(typeof f=="function"){i[u]=function(e){e=e||window.event;e.which=e.which||e.charCode||e.keyCode;e.target=e.target||e.srcElement;e.currentTarget=i;e.item=t.__item||t;if(f.call(t,e)!==true){e.preventDefault&&e.preventDefault();e.returnValue=false}t.update()}}else if(/^(show|hide|if)$/.test(u)){o(u);if(u=="hide")f=!f;i.style.display=f?"":"none"}else{if(e.bool){i[u]=f;if(!f)return;f=u}i.setAttribute(u,f)}});t.trigger("updated")}function p(e){var t={},n=[];l(e,function(e){var n=e.nodeType,o=e.nodeValue;if(n==3&&e.parentNode.tagName!="STYLE"){r(e,o)}else if(n==1){o=e.getAttribute("each");if(o){r(e,o,{loop:1});return false}var f=i[e.tagName.toLowerCase()];u(e.attributes,function(n){var i=n.name,o=n.value;if(/^(name|id)$/.test(i))t[o]=e;if(!f){var u=i.split("__")[1];r(e,o,{attr:u||i,bool:u});if(u){e.removeAttribute(i);return false}}});if(f)r(e,0,{tag:f})}});return{expr:n,elem:t};function r(e,t,r){if(t?t.indexOf("{")>=0:r){var i={dom:e,expr:t};n.push(f(i,r||{}))}}}function d(t){var i=t.opts||{},a=c(t.tmpl),l=t.root,d=t.parent,v=p(a),m={root:l,opts:i,parent:d,__item:t.item},g={};f(m,v.elem);u(l.attributes,function(e){g[e.name]=e.value});function h(){Object.keys(g).map(function(e){var t=i[e]=n(g[e],d||m);if(typeof t=="object")l.removeAttribute(e)})}h();if(!m.on){e.observable(m);delete m.off}if(t.fn)t.fn.call(m,i);m.update=function(e,t){if(d&&a&&!a.firstChild){l=d.root;a=null}if(t||o.body.contains(l)){f(m,e);f(m,m.__item);h();s(v.expr,m);!t&&m.__item&&d.update();return true}else{m.trigger("unmount")}};m.update(0,true);while(a.firstChild){if(t.before)l.insertBefore(a.firstChild,t.before);else l.appendChild(a.firstChild)}m.trigger("mount");r.push(m);return m}function v(e,t){if(e.done)return;e.done=true;var r=e.dom,i=r.previousSibling,o=r.parentNode,u=r.outerHTML,f=e.expr,l=f.split(/\s+in\s+/),c=[],s,p;if(l[1]){f="{ "+l[1];p=l[0].slice(1).trim().split(/,\s*/)}t.one("mount",function(){var e=r.parentNode;if(e){o=e;o.removeChild(r)}});function v(){return Array.prototype.indexOf.call(o.childNodes,i)+1}t.on("updated",function(){var e=n(f,t);is_array=Array.isArray(e);if(is_array)e=e.slice(0);else{if(!e)return;var r=JSON.stringify(e);if(r==s)return;s=r;e=Object.keys(e).map(function(t,n){var r={};r[p[0]]=t;r[p[1]]=e[t];return r})}a(c,e).map(function(e){var t=c.indexOf(e);o.removeChild(o.childNodes[v()+t]);c.splice(t,1)});a(e,c).map(function(n,r){var i=e.indexOf(n);if(p&&!s){var f={};f[p[0]]=n;f[p[1]]=i;n=f}var a=d({before:o.childNodes[v()+i],parent:t,tmpl:u,item:n,root:o});t.on("update",function(){a.update(0,true)})});c=e})}e.tag=function(e,t,n){n=n||noop,i[e]=[t,n]};e.mountTo=function(e,t,n){var r=i[t];return r&&d({tmpl:r[0],fn:r[1],root:e,opts:n})};e.mount=function(t,n){if(t=="*")t=Object.keys(i).join(", ");var r=[];u(o.querySelectorAll(t),function(t){if(t.riot)return;var i=t.tagName.toLowerCase(),o=e.mountTo(t,i,n);if(o){r.push(o);t.riot=1}});return r};e.update=function(){return r=r.filter(function(e){return!!e.update()})}})(e,this.top);if(typeof exports==="object")module.exports=e;else if(typeof define==="function"&&define.amd)define(function(){return e});else this.riot=e})();
!function(){"use strict";var a=["html","json","jsonp","script"],b=["connect","delete","get","head","options","patch","post","put","trace"],c=function f(){var a={},b={},c={url:function(a){return h.call(this,"url",a,d.string)},sync:function(a){return h.call(this,"sync",a,d.bool)},cache:function(a){return h.call(this,"cache",a,d.bool)},type:function(a){return h.call(this,"type",a,d.type)},header:function(b,c){return a.headers=a.headers||{},d.string(b),"undefined"!=typeof c?(d.string(c),a.headers[b]=c,this):a.headers[b]},auth:function(b,c){return d.string(b),d.string(c),a.auth={user:b,passwd:c},this},method:function(a){return h.call(this,"method",a,d.method,function(a){return"post"===a.toLowerCase()&&this.header("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),a})},queryString:function(a){return h.call(this,"queryString",a,d.queryString)},data:function(a){return h.call(this,"data",a,d.plainObject)},body:function(a){return h.call(this,"body",a,null,function(a){if("object"==typeof a){if(!(a instanceof FormData)){try{a=JSON.stringify(a)}catch(b){throw new TypeError("Unable to stringify body's content : "+b.name)}this.header("Content-Type","application/json")}}else a+="";return a})},into:function(a){return h.call(this,"into",a,d.selector,function(a){return"string"==typeof a?document.querySelectorAll(a):a instanceof HTMLElement?[a]:void 0})},jsonPaddingName:function(a){return h.call(this,"jsonPaddingName",a,d.string)},jsonPadding:function(a){return h.call(this,"jsonPadding",a,d.func)},on:function(a,c){return"function"==typeof c&&(b[a]=b[a]||[],b[a].push(c)),this},off:function(a){return b[a]=[],this},trigger:function(a,c){var d=this,e=function(a,c){b[a]instanceof Array&&b[a].forEach(function(a){a.call(d,c)})};if("undefined"!=typeof a){a+="";var f=/^([0-9])([0-9x])([0-9x])$/i,g=a.match(f);g&&g.length>3?Object.keys(b).forEach(function(a){var b=a.match(f);!(b&&b.length>3&&g[1]===b[1])||"x"!==b[2]&&g[2]!==b[2]||"x"!==b[3]&&g[3]!==b[3]||e(a,c)}):b[a]&&e(a,c)}return this},go:function(){var b=a.type||(a.into?"html":"json"),c=j();return"function"==typeof g[b]?g[b].call(this,c):void 0}},g={json:function(a){var b=this;g._xhr.call(this,a,function(a){try{a=JSON.parse(a)}catch(c){return b.trigger("error",c),null}return a})},html:function(b){g._xhr.call(this,b,function(b){return a.into&&a.into.length&&a.into.forEach(function(a){a.innerHTML=b}),b})},_xhr:function(b,c){var d,e,f,g=this,h=a.method||"get",j=a.sync!==!0,k=new XMLHttpRequest,l=a.data,m=a.body;if(l&&i()){"string"!=typeof m&&(m="");for(d in l)m+=d+"="+l[d]+"\n\r"}if(f=[h,b,j],a.auth&&(f.push(a.auth.user),f.push(a.auth.passwd)),k.open.apply(k,f),a.headers)for(e in a.headers)k.setRequestHeader(e,a.headers[e]);k.onprogress=function(a){a.lengthComputable&&g.trigger("progress",a.loaded/a.total)},k.onload=function(){var a=k.responseText;this.status>=200&&this.status<300&&("function"==typeof c&&(a=c(a)),g.trigger("success",a)),g.trigger(this.status,a),g.trigger("end",a)},k.onerror=function(a){g.trigger("error",a,arguments)},k.send(m)},jsonp:function(b){var c,d=this,g=document.querySelector("head"),h=a.sync!==!0,i=a.jsonPaddingName||"callback",j=a.jsonPadding||"_padd"+(new Date).getTime()+Math.floor(1e4*Math.random()),k={};if(f[j])throw new Error("Padding "+j+"  already exists. It must be unique.");/^ajajsonp_/.test(j)||(j="ajajsonp_"+j),window[j]=function(a){d.trigger("success",a),g.removeChild(c),window[j]=void 0},k[i]=j,b=e(b,k),c=document.createElement("script"),c.async=h,c.src=b,c.onerror=function(){d.trigger("error",arguments),g.removeChild(c),window[j]=void 0},g.appendChild(c)},script:function(b){var c,d=this,e=document.querySelector("head")||document.querySelector("body"),f=a.sync!==!0;if(!e)throw new Error("Ok, wait a second, you want to load a script, but you don't have at least a head or body tag...");c=document.createElement("script"),c.async=f,c.src=b,c.onerror=function(){d.trigger("error",arguments),e.removeChild(c)},c.onload=function(){d.trigger("success",arguments)},e.appendChild(c)}},h=function(b,c,e,f){if("undefined"!=typeof c){if("function"==typeof e)try{c=e.call(d,c)}catch(g){throw new TypeError("Failed to set "+b+" : "+g.message)}return a[b]="function"==typeof f?f.call(this,c):c,this}return"undefined"===a[b]?null:a[b]},i=function(){return["delete","patch","post","put"].indexOf(a.method)>-1},j=function(){var b=a.url,c="undefined"!=typeof a.cache?!!a.cache:!0,d=a.queryString,f=a.data;return c===!1&&(d+="ajabuster="+(new Date).getTime()),b=e(b,d),f&&!i()&&(b=e(b,f)),b};return c},d={bool:function(a){return!!a},string:function(a){if("string"!=typeof a)throw new TypeError("a string is expected, but "+a+" ["+typeof a+"] given");return a},plainObject:function(a){if("object"!=typeof a||a.constructor!==Object)throw new TypeError("an object is expected, but "+a+"  ["+typeof a+"] given");return a},type:function(b){if(b=this.string(b),a.indexOf(b.toLowerCase())<0)throw new TypeError("a type in ["+a.join(", ")+"] is expected, but "+b+" given");return b.toLowerCase()},method:function(a){if(a=this.string(a),b.indexOf(a.toLowerCase())<0)throw new TypeError("a method in ["+b.join(", ")+"] is expected, but "+a+" given");return a.toLowerCase()},queryString:function(a){var b={};return"string"==typeof a?a.replace("?","").split("&").forEach(function(a){var c=a.split("=");2===c.length&&(b[decodeURIComponent(c[0])]=decodeURIComponent(c[1]))}):b=a,this.plainObject(b)},selector:function(a){if("string"!=typeof a&&!(a instanceof HTMLElement))throw new TypeError("a selector or an HTMLElement is expected, "+a+" ["+typeof a+"] given");return a},func:function(a){if(a=this.string(a),!/^([a-zA-Z_])([a-zA-Z0-9_\-])+$/.test(a))throw new TypeError("a valid function name is expected, "+a+" ["+typeof a+"] given");return a}},e=function(a,b){var c;if(a=a||"",b){-1===a.indexOf("?")&&(a+="?");for(c in b)a+="&"+encodeURIComponent(c)+"="+encodeURIComponent(b[c])}return a};"function"==typeof define&&define.amd?define([],function(){return c}):"object"==typeof exports?module.exports=c:window.aja=window.aja||c}();
/**
 * @license
 * Fuse - Lightweight fuzzy-search
 *
 * Copyright (c) 2012 Kirollos Risk <kirollos@gmail.com>.
 * All Rights Reserved. Apache Software License 2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(t){function e(t,n){this.list=t,this.options=n=n||{};var i,o,s,r;for(i=0,r=["sort","includeScore","shouldSort"],o=r.length;o>i;i++)s=r[i],this.options[s]=s in n?n[s]:e.defaultOptions[s];for(i=0,r=["searchFn","sortFn","keys","getFn"],o=r.length;o>i;i++)s=r[i],this.options[s]=n[s]||e.defaultOptions[s]}var n=function(t,e){if(e=e||{},this.options=e,this.options.location=e.location||n.defaultOptions.location,this.options.distance="distance"in e?e.distance:n.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:n.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||n.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen>this.options.maxPatternLength)throw new Error("Pattern length is too long");this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet()};n.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},n.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},n.prototype._bitapScore=function(t,e){var n=t/this.patternLen,i=Math.abs(this.options.location-e);return this.options.distance?n+i/this.options.distance:i?1:n},n.prototype.search=function(t){if(t=this.options.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0};var e,n,i,o,s,r,a,h,p,c=t.length,l=this.options.location,f=this.options.threshold,u=t.indexOf(this.pattern,l),d=this.patternLen+c,g=1,m=[];for(-1!=u&&(f=Math.min(this._bitapScore(0,u),f),u=t.lastIndexOf(this.pattern,l+this.patternLen),-1!=u&&(f=Math.min(this._bitapScore(0,u),f))),u=-1,e=0;e<this.patternLen;e++){for(i=0,o=d;o>i;)this._bitapScore(e,l+o)<=f?i=o:d=o,o=Math.floor((d-i)/2+i);for(d=o,s=Math.max(1,l-o+1),r=Math.min(l+o,c)+this.patternLen,a=Array(r+2),a[r+1]=(1<<e)-1,n=r;n>=s;n--)if(p=this.patternAlphabet[t.charAt(n-1)],a[n]=0===e?(a[n+1]<<1|1)&p:(a[n+1]<<1|1)&p|((h[n+1]|h[n])<<1|1)|h[n+1],a[n]&this.matchmask&&(g=this._bitapScore(e,n-1),f>=g)){if(f=g,u=n-1,m.push(u),!(u>l))break;s=Math.max(1,2*l-u)}if(this._bitapScore(e+1,l)>f)break;h=a}return{isMatch:u>=0,score:g}};var i=function(t,e,n){var s,r,a;if(e){a=e.indexOf("."),-1!==a?(s=e.slice(0,a),r=e.slice(a+1)):s=e;var h=t[s];if(h)if(r||"string"!=typeof h&&"number"!=typeof h)if(o.isArray(h))for(var p=0,c=h.length;c>p;p++)i(h[p],r,n);else r&&i(h,r,n);else n.push(h)}else n.push(t);return n},o={deepValue:function(t,e){return i(t,e,[])},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)}};e.defaultOptions={id:null,caseSensitive:!1,includeScore:!1,shouldSort:!0,searchFn:n,sortFn:function(t,e){return t.score-e.score},getFn:o.deepValue,keys:[]},e.prototype.search=function(t){var e,n,i,s,r=new this.options.searchFn(t,this.options),a=this.list,h=a.length,p=this.options,c=this.options.keys,l=c.length,f=[],u={},d=[],g=function(t,e,n){if(void 0!==t&&null!==t)if("string"==typeof t)i=r.search(t),i.isMatch&&(s=u[n],s?s.score=Math.min(s.score,i.score):(u[n]={item:e,score:i.score},f.push(u[n])));else if(o.isArray(t))for(var a=0;a<t.length;a++)g(t[a],e,n)};if("string"==typeof a[0])for(var m=0;h>m;m++)g(a[m],m,m);else for(var m=0;h>m;m++)for(n=a[m],e=0;l>e;e++)g(p.getFn(n,c[e]),n,m);p.shouldSort&&f.sort(p.sortFn);for(var y=p.includeScore?function(t){return f[t]}:function(t){return f[t].item},v=p.id?function(t){f[t].item=p.getFn(f[t].item,p.id)[0]}:function(){},m=0,b=f.length;b>m;m++)v(m),d.push(y(m));return d},"object"==typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){return e}):t.Fuse=e}(this);

riot.tag('emojis', '<div id="info" if="{ current }"><p onclick="{ copy }" class="current-container"><span class="emo emoji v-align s_{ current.name.replace(/\\+/, &quot;&quot;) }"></span><input id="currentInput" value=":{ current.name }:" class="v-align"></p><p><span class="tag tag-blue">{ current.unicode }</span><span each="{ key in current.keywords }" class="tag tag-green">{ key }</span><a href="https://github.com/jgsme/emo/edit/master/src/data/emojis.custom.ja.json"><span class="tag tag-red">Add new one?</span></a></p></div><span each="{ emoji in emojis }" onclick="{ parent.show }" data="{ JSON.stringify(emoji) }" class="emo emo-margin emoji s_{ emoji.name.replace(/\\+/, &quot;&quot;) }"></span>', function(opts) {this.emojis = [];

this.show = (function(_this) {
  return function(event) {
    return _this.current = JSON.parse(event.target.getAttribute('data'));
  };
})(this);

this.copy = (function(_this) {
  return function(event) {
    return document.getElementById('currentInput').select();
  };
})(this);

this.on('update', (function(_this) {
  return function() {
    return _this.emojis = opts.data;
  };
})(this));

});

riot.tag('finder', '<form class="pure-form"><input id="in" onkeyup="{ change }" autofocus="autofocus"></form></form><div class="emojis"><emojis data="{ emojis }"></emojis></div>', function(opts) {var fuse, original;

this.emojis = [];

fuse = original = null;

aja().method('get').url('/data/emojis.json').on('success', (function(_this) {
  return function(emojis) {
    var emoji, hash;
    original = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = emojis.length; _i < _len; _i++) {
        emoji = emojis[_i];
        _results.push({
          name: emoji.name,
          unicode: emoji.keywords[emoji.keywords.length - 1],
          keywords: emoji.keywords.slice(0, -1)
        });
      }
      return _results;
    })();
    _this.update({
      emojis: original
    });
    fuse = new Fuse(original, {
      threshold: 0.1,
      distance: 800,
      keys: ['name', 'keywords']
    });
    hash = location.hash.replace(/#/, '');
    document.getElementById('in').value = hash;
    return _this.change({
      target: {
        value: hash
      }
    });
  };
})(this)).go();

this.change = function(event) {
  var searchWord;
  searchWord = event.target.value;
  this.update({
    emojis: searchWord.length === 0 ? original : fuse.search(searchWord)
  });
  return location.hash = searchWord;
};

});
(function() {
  riot.mount('*');

}).call(this);
