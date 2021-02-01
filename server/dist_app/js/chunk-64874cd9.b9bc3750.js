(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64874cd9"],{"3c84":function(e,t,a){},"736f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"join-team-view"},[a("div",{staticClass:"join-team-view__content"},[a("team-create-form",{attrs:{formError:e.createFormError},on:{submit:e.createTeamRequest,"update-form-error":e.updateCreateFormError}}),a("join-team-form",{attrs:{formError:e.joinFormError},on:{submit:e.joinTeamRequest,"update-form-error":e.updateJoinFormError}})],1)])},i=[],n=(a("96cf"),a("1da1")),o=a("d4ec"),s=a("bee2"),c=a("2caf"),l=a("262e"),u=a("9ab4"),m=a("60a3"),f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"team-create-form"},[a("h2",{staticClass:"team-create-form__headline"},[e._v("Create a team")]),a("form",{staticClass:"team-create-form__form",attrs:{novalidate:""},on:{submit:e.createClicked}},[a("transition",{attrs:{name:"fade"}},[e.formError?a("span",{staticClass:"team-create-form__error"},[e._v(e._s(e.formError))]):e._e()]),a("TextInput",{staticClass:"team-create-form__input",attrs:{field:e.formFields.name},model:{value:e.formFields.name.value,callback:function(t){e.$set(e.formFields.name,"value",t)},expression:"formFields.name.value"}}),a("TextInput",{staticClass:"team-create-form__input",attrs:{field:e.formFields.website},model:{value:e.formFields.website.value,callback:function(t){e.$set(e.formFields.website,"value",t)},expression:"formFields.website.value"}}),a("div",{staticClass:"team-create-form__server-wrapper"},[a("TextInput",{attrs:{field:e.formFields.serverIp},model:{value:e.formFields.serverIp.value,callback:function(t){e.$set(e.formFields.serverIp,"value",t)},expression:"formFields.serverIp.value"}}),a("TextInput",{attrs:{field:e.formFields.serverPw},model:{value:e.formFields.serverPw.value,callback:function(t){e.$set(e.formFields.serverPw,"value",t)},expression:"formFields.serverPw.value"}})],1),a("p",{staticClass:"team-create-form__label"},[e._v("Logo:")]),a("ImageUploader",{attrs:{limit:1},model:{value:e.files,callback:function(t){e.files=t},expression:"files"}}),a("input",{staticClass:"team-create-form__submit",attrs:{type:"submit",value:"Create team"}})],1)])},p=[],v=(a("b0c0"),a("4fad"),a("3835")),d=a("caeb"),b=a("4c1e"),h=a("8422"),j=a("f5e2"),_=function(e){Object(l["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.formFields={name:new d["a"]("Team name",!0,[j["a"].notEmpty(),j["a"].minLength(3),j["a"].maxLength(24)]),website:new d["a"]("Website",!1,[j["a"].isURL()]),serverIp:new d["a"]("Server IP",!1,[j["a"].minLength(3),j["a"].maxLength(200)]),serverPw:new d["a"]("Password",!1,[])},e.files=[],e}return Object(s["a"])(a,[{key:"createClicked",value:function(){Object(j["b"])(this.formFields)&&this.submit()}},{key:"submit",value:function(){var e=new FormData;this.files.length&&e.append("avatar",this.files[0],this.files[0].name);for(var t=0,a=Object.entries(this.formFields);t<a.length;t++){var r=Object(v["a"])(a[t],2),i=r[0],n=r[1];e.append(i,n.value)}return e}},{key:"updateFormError",value:function(e){return e}}]),a}(m["h"]);Object(u["a"])([Object(m["e"])()],_.prototype,"formError",void 0),Object(u["a"])([Object(m["b"])()],_.prototype,"submit",null),Object(u["a"])([Object(m["b"])()],_.prototype,"updateFormError",null),_=Object(u["a"])([Object(m["a"])({components:{TextInput:b["a"],ImageUploader:h["a"]}})],_);var O=_,g=O,y=(a("79a7"),a("2877")),C=Object(y["a"])(g,f,p,!1,null,null,null),F=C.exports,w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"join-team-form"},[a("h2",{staticClass:"join-team-form__headline"},[e._v("Join a team via code")]),a("form",{staticClass:"join-team-form__form",attrs:{novalidate:""},on:{submit:e.joinClicked}},[a("transition",{attrs:{name:"fade"}},[e.formError?a("span",{staticClass:"join-team-form__error"},[e._v(e._s(e.formError))]):e._e()]),a("TextInput",{staticClass:"join-team-form__input",attrs:{field:e.code},model:{value:e.code.value,callback:function(t){e.$set(e.code,"value",t)},expression:"code.value"}}),a("input",{staticClass:"join-team-form__submit",attrs:{type:"submit",value:"Join team"}})],1)])},k=[],E=function(e){Object(l["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.code=new d["a"]("Code",!0,[j["a"].exactLength(6)]),e}return Object(s["a"])(a,[{key:"updateFormError",value:function(e){return e}},{key:"submit",value:function(){return this.code.value.toLowerCase()}},{key:"joinClicked",value:function(){this.code.validate()&&this.submit()}}]),a}(m["h"]);Object(u["a"])([Object(m["e"])()],E.prototype,"formError",void 0),Object(u["a"])([Object(m["b"])()],E.prototype,"updateFormError",null),Object(u["a"])([Object(m["b"])()],E.prototype,"submit",null),E=Object(u["a"])([Object(m["a"])({components:{TextInput:b["a"]}})],E);var x=E,T=x,I=(a("e57d"),Object(y["a"])(T,w,k,!1,null,null,null)),R=I.exports,$=a("0a4f"),L=a("6c7d"),J=function(e){Object(l["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.createFormError="",e.joinFormError="",e}return Object(s["a"])(a,[{key:"createTeamRequest",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.createTeam(t);case 2:a=e.sent,a.error?this.updateCreateFormError(a.error):a.success&&this.$router.push(L["b"].Team);case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"joinTeamRequest",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.joinTeam(t);case 2:a=e.sent,a.error?this.updateJoinFormError(a.error):a.success&&this.$router.push(L["b"].Team);case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"updateCreateFormError",value:function(e){this.createFormError=e}},{key:"updateJoinFormError",value:function(e){this.joinFormError=e}}]),a}(m["h"]);Object(u["a"])([$["f"].Action],J.prototype,"createTeam",void 0),Object(u["a"])([$["f"].Action],J.prototype,"joinTeam",void 0),J=Object(u["a"])([Object(m["a"])({components:{TeamCreateForm:F,JoinTeamForm:R}})],J);var P=J,S=P,q=(a("791d"),Object(y["a"])(S,r,i,!1,null,null,null));t["default"]=q.exports},"791d":function(e,t,a){"use strict";var r=a("3c84"),i=a.n(r);i.a},"79a7":function(e,t,a){"use strict";var r=a("e569"),i=a.n(r);i.a},8422:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"image-uploader"},[a("label",{staticClass:"image-uploader__input"},[a("input",{attrs:{type:"file",id:"file",multiple:e.limit>1,accept:"image/*",disabled:e.value.length>=e.limit},on:{change:e.filesSelected}}),a("span",{attrs:{"file-input-value":e.fileString}})]),a("div",{staticClass:"image-uploader__preview"},[e._l(e.images,(function(t){return a("div",{key:t.uri,staticClass:"image-uploader__preview-item"},[a("img",{staticClass:"image-uploader__image",attrs:{src:t.uri,alt:""}}),a("fa-icon",{staticClass:"image-uploader__icon",attrs:{icon:"times"},on:{click:function(a){return e.removeImage(t)}}})],1)})),a("span",{staticClass:"image-uploader__preview-placeholder",class:{"-has-content":e.images.length}},[e._v("No images selected")])],2)])},i=[],n=(a("99af"),a("4de4"),a("4160"),a("a630"),a("3ca3"),a("159b"),a("2909")),o=a("d4ec"),s=a("bee2"),c=a("2caf"),l=a("262e"),u=a("9ab4"),m=a("60a3"),f=function(e){Object(l["a"])(a,e);var t=Object(c["a"])(a);function a(){var e;return Object(o["a"])(this,a),e=t.apply(this,arguments),e.images=[],e}return Object(s["a"])(a,[{key:"filesSelected",value:function(e){var t=Array.from(e.target.files);t.length&&this.input([].concat(Object(n["a"])(this.value),Object(n["a"])(t)))}},{key:"removeImage",value:function(e){this.input(this.value.filter((function(t){return t!==e.file})))}},{key:"input",value:function(e){return e}},{key:"filesChanged",value:function(e){var t=this;this.images=[],e.forEach((function(e){var a=new FileReader;a.onload=function(){return t.images.push({file:e,uri:a.result})},a.readAsDataURL(e)}))}},{key:"fileString",get:function(){return this.value.length?"".concat(this.value.length," file").concat(this.value.length>1?"s":""," selected. ").concat(this.value.length>this.limit?"Remove ".concat(this.value.length-this.limit," file").concat(this.value.length>1?"s":"","."):""):"Choose ".concat(this.limit>1?"up to "+this.limit:"a"," file").concat(this.limit>1?"s":"","...")}}]),a}(m["h"]);Object(u["a"])([Object(m["e"])()],f.prototype,"value",void 0),Object(u["a"])([Object(m["e"])({default:1})],f.prototype,"limit",void 0),Object(u["a"])([Object(m["b"])()],f.prototype,"input",null),Object(u["a"])([Object(m["i"])("value")],f.prototype,"filesChanged",null),f=Object(u["a"])([Object(m["a"])({})],f);var p=f,v=p,d=(a("e1ef"),a("2877")),b=Object(d["a"])(v,r,i,!1,null,null,null);t["a"]=b.exports},"9d78":function(e,t,a){},e0f5:function(e,t,a){},e1ef:function(e,t,a){"use strict";var r=a("e0f5"),i=a.n(r);i.a},e569:function(e,t,a){},e57d:function(e,t,a){"use strict";var r=a("9d78"),i=a.n(r);i.a}}]);
//# sourceMappingURL=chunk-64874cd9.b9bc3750.js.map