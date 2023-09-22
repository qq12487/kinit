import{E as e}from"./el-button-8f21380c.js";import{c as o,b as n,u as t,E as l,O as r,w as a,F as i}from"./el-popper-2fae9050.js";import{_ as s,e as u,q as d,r as c,aE as p,aG as m,a9 as f,k as v,be as g,b,d as w,aR as h,f as y,cd as I,ab as E,w as C,bP as k,$ as _,o as F,l as T,m as S,x as R,ad as x,bO as O,ap as B,a as $,D,E as M,bu as K,aI as L,u as P,aC as N,h as G,j as A,ar as z,ac as j,s as H,O as J,y as Y,p as U,bm as q,a3 as V,n as W,t as Q,ae as X}from"./index-9da7d198.js";import{u as Z}from"./index-cde97138.js";import{u as ee}from"./use-form-common-props-9d083c67.js";import{c as oe}from"./useForm-ecbcdb43.js";import{c as ne}from"./refs-4f0941bf.js";var te=s(u({inheritAttrs:!1}),[["render",function(e,o,n,t,l,r){return d(e.$slots,"default")}],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection.vue"]]);var le=s(u({name:"ElCollectionItem",inheritAttrs:!1}),[["render",function(e,o,n,t,l,r){return d(e.$slots,"default")}],["__file","/home/runner/work/element-plus/element-plus/packages/components/collection/src/collection-item.vue"]]);const re="data-el-collection-item",ae=e=>{const o=`El${e}Collection`,n=`${o}Item`,t=Symbol(o),l=Symbol(n),r={...te,name:o,setup(){const e=c(null),o=new Map;p(t,{itemMap:o,getItems:()=>{const n=v(e);if(!n)return[];const t=Array.from(n.querySelectorAll(`[${re}]`));return[...o.values()].sort(((e,o)=>t.indexOf(e.ref)-t.indexOf(o.ref)))},collectionRef:e})}},a={...le,name:n,setup(e,{attrs:o}){const n=c(null),r=m(t,void 0);p(l,{collectionItemRef:n}),f((()=>{const e=v(n);e&&r.itemMap.set(e,{ref:e,...o})})),g((()=>{const e=v(n);r.itemMap.delete(e)}))}};return{COLLECTION_INJECTION_KEY:t,COLLECTION_ITEM_INJECTION_KEY:l,ElCollection:r,ElCollectionItem:a}},ie=b({style:{type:w([String,Array,Object])},currentTabId:{type:w(String)},defaultCurrentTabId:String,loop:Boolean,dir:{type:String,values:["ltr","rtl"],default:"ltr"},orientation:{type:w(String)},onBlur:Function,onFocus:Function,onMousedown:Function}),{ElCollection:se,ElCollectionItem:ue,COLLECTION_INJECTION_KEY:de,COLLECTION_ITEM_INJECTION_KEY:ce}=ae("RovingFocusGroup"),pe=Symbol("elRovingFocusGroup"),me=Symbol("elRovingFocusGroupItem"),fe={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"},ve=(e,o,n)=>{const t=((e,o)=>{if("rtl"!==o)return e;switch(e){case h.right:return h.left;case h.left:return h.right;default:return e}})(e.key,n);if(!("vertical"===o&&[h.left,h.right].includes(t)||"horizontal"===o&&[h.up,h.down].includes(t)))return fe[t]},ge=e=>{const{activeElement:o}=document;for(const n of e){if(n===o)return;if(n.focus(),o!==document.activeElement)return}},be="currentTabIdChange",we="rovingFocusGroup.entryFocus",he={bubbles:!1,cancelable:!0},ye=u({name:"ElRovingFocusGroupImpl",inheritAttrs:!1,props:ie,emits:[be,"entryFocus"],setup(e,{emit:n}){var t;const l=c(null!=(t=e.currentTabId||e.defaultCurrentTabId)?t:null),r=c(!1),a=c(!1),i=c(null),{getItems:s}=m(de,void 0),u=y((()=>[{outline:"none"},e.style])),d=o((o=>{var n;null==(n=e.onMousedown)||n.call(e,o)}),(()=>{a.value=!0})),f=o((o=>{var n;null==(n=e.onFocus)||n.call(e,o)}),(e=>{const o=!v(a),{target:n,currentTarget:t}=e;if(n===t&&o&&!v(r)){const e=new Event(we,he);if(null==t||t.dispatchEvent(e),!e.defaultPrevented){const e=s().filter((e=>e.focusable)),o=[e.find((e=>e.active)),e.find((e=>e.id===v(l))),...e].filter(Boolean).map((e=>e.ref));ge(o)}}a.value=!1})),g=o((o=>{var n;null==(n=e.onBlur)||n.call(e,o)}),(()=>{r.value=!1}));p(pe,{currentTabbedId:I(l),loop:E(e,"loop"),tabIndex:y((()=>v(r)?-1:0)),rovingFocusGroupRef:i,rovingFocusGroupRootStyle:u,orientation:E(e,"orientation"),dir:E(e,"dir"),onItemFocus:e=>{n(be,e)},onItemShiftTab:()=>{r.value=!0},onBlur:g,onFocus:f,onMousedown:d}),C((()=>e.currentTabId),(e=>{l.value=null!=e?e:null})),k(i,we,((...e)=>{n("entryFocus",...e)}))}});var Ie=s(u({name:"ElRovingFocusGroup",components:{ElFocusGroupCollection:se,ElRovingFocusGroupImpl:s(ye,[["render",function(e,o,n,t,l,r){return d(e.$slots,"default")}],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group-impl.vue"]])}}),[["render",function(e,o,n,t,l,r){const a=_("el-roving-focus-group-impl"),i=_("el-focus-group-collection");return F(),T(i,null,{default:S((()=>[R(a,x(O(e.$attrs)),{default:S((()=>[d(e.$slots,"default")])),_:3},16)])),_:3})}],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-group.vue"]]);var Ee=s(u({components:{ElRovingFocusCollectionItem:ue},props:{focusable:{type:Boolean,default:!0},active:{type:Boolean,default:!1}},emits:["mousedown","focus","keydown"],setup(e,{emit:n}){const{currentTabbedId:t,loop:l,onItemFocus:r,onItemShiftTab:a}=m(pe,void 0),{getItems:i}=m(de,void 0),s=Z(),u=c(null),d=o((e=>{n("mousedown",e)}),(o=>{e.focusable?r(v(s)):o.preventDefault()})),f=o((e=>{n("focus",e)}),(()=>{r(v(s))})),g=o((e=>{n("keydown",e)}),(e=>{const{key:o,shiftKey:n,target:t,currentTarget:r}=e;if(o===h.tab&&n)return void a();if(t!==r)return;const s=ve(e);if(s){e.preventDefault();let o=i().filter((e=>e.focusable)).map((e=>e.ref));switch(s){case"last":o.reverse();break;case"prev":case"next":{"prev"===s&&o.reverse();const e=o.indexOf(r);o=l.value?(d=e+1,(u=o).map(((e,o)=>u[(o+d)%u.length]))):o.slice(e+1);break}}B((()=>{ge(o)}))}var u,d})),b=y((()=>t.value===v(s)));return p(me,{rovingFocusGroupItemRef:u,tabIndex:y((()=>v(b)?0:-1)),handleMousedown:d,handleFocus:f,handleKeydown:g}),{id:s,handleKeydown:g,handleFocus:f,handleMousedown:d}}}),[["render",function(e,o,n,t,l,r){const a=_("el-roving-focus-collection-item");return F(),T(a,{id:e.id,focusable:e.focusable,active:e.active},{default:S((()=>[d(e.$slots,"default")])),_:3},8,["id","focusable","active"])}],["__file","/home/runner/work/element-plus/element-plus/packages/components/roving-focus-group/src/roving-focus-item.vue"]]);const Ce=b({trigger:n.trigger,effect:{...t.effect,default:"light"},type:{type:w(String)},placement:{type:w(String),default:"bottom"},popperOptions:{type:w(Object),default:()=>({})},id:String,size:{type:String,default:""},splitButton:Boolean,hideOnClick:{type:Boolean,default:!0},loop:{type:Boolean,default:!0},showTimeout:{type:Number,default:150},hideTimeout:{type:Number,default:150},tabindex:{type:w([Number,String]),default:0},maxHeight:{type:w([Number,String]),default:""},popperClass:{type:String,default:""},disabled:{type:Boolean,default:!1},role:{type:String,default:"menu"},buttonProps:{type:w(Object)},teleported:t.teleported}),ke=b({command:{type:[Object,String,Number],default:()=>({})},disabled:Boolean,divided:Boolean,textValue:String,icon:{type:$}}),_e=b({onKeydown:{type:w(Function)}}),Fe=[h.down,h.pageDown,h.home],Te=[h.up,h.pageUp,h.end],Se=[...Fe,...Te],{ElCollection:Re,ElCollectionItem:xe,COLLECTION_INJECTION_KEY:Oe,COLLECTION_ITEM_INJECTION_KEY:Be}=ae("Dropdown"),$e=Symbol("elDropdown"),{ButtonGroup:De}=e;var Me=s(u({name:"ElDropdown",components:{ElButton:e,ElButtonGroup:De,ElScrollbar:D,ElDropdownCollection:Re,ElTooltip:l,ElRovingFocusGroup:Ie,ElOnlyChild:r,ElIcon:M,ArrowDown:K},props:Ce,emits:["visible-change","click","command"],setup(e,{emit:o}){const n=L(),t=P("dropdown"),{t:l}=N(),r=c(),a=c(),i=c(null),s=c(null),u=c(null),d=c(null),m=c(!1),f=[h.enter,h.space,h.down],b=y((()=>({maxHeight:G(e.maxHeight)}))),w=y((()=>[t.m(T.value)])),I=y((()=>oe(e.trigger))),k=Z().value,_=y((()=>e.id||k));function F(){var e;null==(e=i.value)||e.onClose()}C([r,I],(([e,o],[n])=>{var t,l,r;(null==(t=null==n?void 0:n.$el)?void 0:t.removeEventListener)&&n.$el.removeEventListener("pointerenter",S),(null==(l=null==e?void 0:e.$el)?void 0:l.removeEventListener)&&e.$el.removeEventListener("pointerenter",S),(null==(r=null==e?void 0:e.$el)?void 0:r.addEventListener)&&o.includes("hover")&&e.$el.addEventListener("pointerenter",S)}),{immediate:!0}),g((()=>{var e,o;(null==(o=null==(e=r.value)?void 0:e.$el)?void 0:o.removeEventListener)&&r.value.$el.removeEventListener("pointerenter",S)}));const T=ee();function S(){var e,o;null==(o=null==(e=r.value)?void 0:e.$el)||o.focus()}p($e,{contentRef:s,role:y((()=>e.role)),triggerId:_,isUsingKeyboard:m,onItemEnter:function(){},onItemLeave:function(){const e=v(s);I.value.includes("hover")&&(null==e||e.focus()),d.value=null}}),p("elDropdown",{instance:n,dropdownSize:T,handleClick:function(){F()},commandHandler:function(...e){o("command",...e)},trigger:E(e,"trigger"),hideOnClick:E(e,"hideOnClick")});return{t:l,ns:t,scrollbar:u,wrapStyle:b,dropdownTriggerKls:w,dropdownSize:T,triggerId:_,triggerKeys:f,currentTabId:d,handleCurrentTabIdChange:function(e){d.value=e},handlerMainButtonClick:e=>{o("click",e)},handleEntryFocus:function(e){m.value||(e.preventDefault(),e.stopImmediatePropagation())},handleClose:F,handleOpen:function(){var e;null==(e=i.value)||e.onOpen()},handleBeforeShowTooltip:function(){o("visible-change",!0)},handleShowTooltip:function(e){"keydown"===(null==e?void 0:e.type)&&s.value.focus()},handleBeforeHideTooltip:function(){o("visible-change",!1)},onFocusAfterTrapped:e=>{var o,n;e.preventDefault(),null==(n=null==(o=s.value)?void 0:o.focus)||n.call(o,{preventScroll:!0})},popperRef:i,contentRef:s,triggeringElementRef:r,referenceElementRef:a}}}),[["render",function(e,o,n,t,l,r){var a;const i=_("el-dropdown-collection"),s=_("el-roving-focus-group"),u=_("el-scrollbar"),c=_("el-only-child"),p=_("el-tooltip"),m=_("el-button"),f=_("arrow-down"),v=_("el-icon"),g=_("el-button-group");return F(),A("div",{class:H([e.ns.b(),e.ns.is("disabled",e.disabled)])},[R(p,{ref:"popperRef",role:e.role,effect:e.effect,"fallback-placements":["bottom","top"],"popper-options":e.popperOptions,"gpu-acceleration":!1,"hide-after":"hover"===e.trigger?e.hideTimeout:0,"manual-mode":!0,placement:e.placement,"popper-class":[e.ns.e("popper"),e.popperClass],"reference-element":null==(a=e.referenceElementRef)?void 0:a.$el,trigger:e.trigger,"trigger-keys":e.triggerKeys,"trigger-target-el":e.contentRef,"show-after":"hover"===e.trigger?e.showTimeout:0,"stop-popper-mouse-event":!1,"virtual-ref":e.triggeringElementRef,"virtual-triggering":e.splitButton,disabled:e.disabled,transition:`${e.ns.namespace.value}-zoom-in-top`,teleported:e.teleported,pure:"",persistent:"",onBeforeShow:e.handleBeforeShowTooltip,onShow:e.handleShowTooltip,onBeforeHide:e.handleBeforeHideTooltip},z({content:S((()=>[R(u,{ref:"scrollbar","wrap-style":e.wrapStyle,tag:"div","view-class":e.ns.e("list")},{default:S((()=>[R(s,{loop:e.loop,"current-tab-id":e.currentTabId,orientation:"horizontal",onCurrentTabIdChange:e.handleCurrentTabIdChange,onEntryFocus:e.handleEntryFocus},{default:S((()=>[R(i,null,{default:S((()=>[d(e.$slots,"dropdown")])),_:3})])),_:3},8,["loop","current-tab-id","onCurrentTabIdChange","onEntryFocus"])])),_:3},8,["wrap-style","view-class"])])),_:2},[e.splitButton?void 0:{name:"default",fn:S((()=>[R(c,{id:e.triggerId,ref:"triggeringElementRef",role:"button",tabindex:e.tabindex},{default:S((()=>[d(e.$slots,"default")])),_:3},8,["id","tabindex"])]))}]),1032,["role","effect","popper-options","hide-after","placement","popper-class","reference-element","trigger","trigger-keys","trigger-target-el","show-after","virtual-ref","virtual-triggering","disabled","transition","teleported","onBeforeShow","onShow","onBeforeHide"]),e.splitButton?(F(),T(g,{key:0},{default:S((()=>[R(m,j({ref:"referenceElementRef"},e.buttonProps,{size:e.dropdownSize,type:e.type,disabled:e.disabled,tabindex:e.tabindex,onClick:e.handlerMainButtonClick}),{default:S((()=>[d(e.$slots,"default")])),_:3},16,["size","type","disabled","tabindex","onClick"]),R(m,j({id:e.triggerId,ref:"triggeringElementRef"},e.buttonProps,{role:"button",size:e.dropdownSize,type:e.type,class:e.ns.e("caret-button"),disabled:e.disabled,tabindex:e.tabindex,"aria-label":e.t("el.dropdown.toggleDropdown")}),{default:S((()=>[R(v,{class:H(e.ns.e("icon"))},{default:S((()=>[R(f)])),_:1},8,["class"])])),_:1},16,["id","size","type","class","disabled","tabindex","aria-label"])])),_:3})):J("v-if",!0)],2)}],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown.vue"]]);const Ke=u({name:"DropdownItemImpl",components:{ElIcon:M},props:ke,emits:["pointermove","pointerleave","click","clickimpl"],setup(e,{emit:n}){const t=P("dropdown"),{role:l}=m($e,void 0),{collectionItemRef:r}=m(Be,void 0),{collectionItemRef:a}=m(ce,void 0),{rovingFocusGroupItemRef:i,tabIndex:s,handleFocus:u,handleKeydown:d,handleMousedown:c}=m(me,void 0),p=ne(r,a,i),f=y((()=>"menu"===l.value?"menuitem":"navigation"===l.value?"link":"button")),v=o((e=>{const{code:o}=e;if(o===h.enter||o===h.space)return e.preventDefault(),e.stopImmediatePropagation(),n("clickimpl",e),!0}),d);return{ns:t,itemRef:p,dataset:{[re]:""},role:f,tabIndex:s,handleFocus:u,handleKeydown:v,handleMousedown:c}}}),Le=["aria-disabled","tabindex","role"];const Pe=()=>{const e=m("elDropdown",{}),o=y((()=>null==e?void 0:e.dropdownSize));return{elDropdown:e,_elDropdownSize:o}};var Ne=s(u({name:"ElDropdownItem",components:{ElDropdownCollectionItem:xe,ElRovingFocusItem:Ee,ElDropdownItemImpl:s(Ke,[["render",function(e,o,n,t,l,r){const a=_("el-icon");return F(),A(V,null,[e.divided?(F(),A("li",j({key:0,role:"separator",class:e.ns.bem("menu","item","divided")},e.$attrs),null,16)):J("v-if",!0),Y("li",j({ref:e.itemRef},{...e.dataset,...e.$attrs},{"aria-disabled":e.disabled,class:[e.ns.be("menu","item"),e.ns.is("disabled",e.disabled)],tabindex:e.tabIndex,role:e.role,onClick:o[0]||(o[0]=o=>e.$emit("clickimpl",o)),onFocus:o[1]||(o[1]=(...o)=>e.handleFocus&&e.handleFocus(...o)),onKeydown:o[2]||(o[2]=q(((...o)=>e.handleKeydown&&e.handleKeydown(...o)),["self"])),onMousedown:o[3]||(o[3]=(...o)=>e.handleMousedown&&e.handleMousedown(...o)),onPointermove:o[4]||(o[4]=o=>e.$emit("pointermove",o)),onPointerleave:o[5]||(o[5]=o=>e.$emit("pointerleave",o))}),[e.icon?(F(),T(a,{key:0},{default:S((()=>[(F(),T(U(e.icon)))])),_:1})):J("v-if",!0),d(e.$slots,"default")],16,Le)],64)}],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item-impl.vue"]])},inheritAttrs:!1,props:ke,emits:["pointermove","pointerleave","click"],setup(e,{emit:n,attrs:t}){const{elDropdown:l}=Pe(),r=L(),i=c(null),s=y((()=>{var e,o;return null!=(o=null==(e=v(i))?void 0:e.textContent)?o:""})),{onItemEnter:u,onItemLeave:d}=m($e,void 0),p=o((e=>(n("pointermove",e),e.defaultPrevented)),a((o=>{if(e.disabled)return void d(o);const n=o.currentTarget;n===document.activeElement||n.contains(document.activeElement)||(u(o),o.defaultPrevented||null==n||n.focus())}))),f=o((e=>(n("pointerleave",e),e.defaultPrevented)),a((e=>{d(e)})));return{handleClick:o((o=>{if(!e.disabled)return n("click",o),"keydown"!==o.type&&o.defaultPrevented}),(o=>{var n,t,a;e.disabled?o.stopImmediatePropagation():((null==(n=null==l?void 0:l.hideOnClick)?void 0:n.value)&&(null==(t=l.handleClick)||t.call(l)),null==(a=l.commandHandler)||a.call(l,e.command,r,o))})),handlePointerMove:p,handlePointerLeave:f,textContent:s,propsAndAttrs:y((()=>({...e,...t})))}}}),[["render",function(e,o,n,t,l,r){var a;const i=_("el-dropdown-item-impl"),s=_("el-roving-focus-item"),u=_("el-dropdown-collection-item");return F(),T(u,{disabled:e.disabled,"text-value":null!=(a=e.textValue)?a:e.textContent},{default:S((()=>[R(s,{focusable:!e.disabled},{default:S((()=>[R(i,j(e.propsAndAttrs,{onPointerleave:e.handlePointerLeave,onPointermove:e.handlePointerMove,onClickimpl:e.handleClick}),{default:S((()=>[d(e.$slots,"default")])),_:3},16,["onPointerleave","onPointermove","onClickimpl"])])),_:3},8,["focusable"])])),_:3},8,["disabled","text-value"])}],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-item.vue"]]);const Ge=u({name:"ElDropdownMenu",props:_e,setup(e){const n=P("dropdown"),{_elDropdownSize:t}=Pe(),l=t.value,{focusTrapRef:r,onKeydown:a}=m(i,void 0),{contentRef:s,role:u,triggerId:d}=m($e,void 0),{collectionRef:c,getItems:p}=m(Oe,void 0),{rovingFocusGroupRef:f,rovingFocusGroupRootStyle:g,tabIndex:b,onBlur:w,onFocus:I,onMousedown:E}=m(pe,void 0),{collectionRef:C}=m(de,void 0),k=y((()=>[n.b("menu"),n.bm("menu",null==l?void 0:l.value)])),_=ne(s,c,r,f,C),F=o((o=>{var n;null==(n=e.onKeydown)||n.call(e,o)}),(e=>{const{currentTarget:o,code:n,target:t}=e;if(o.contains(t),h.tab===n&&e.stopImmediatePropagation(),e.preventDefault(),t!==v(s))return;if(!Se.includes(n))return;const l=p().filter((e=>!e.disabled)).map((e=>e.ref));Te.includes(n)&&l.reverse(),ge(l)}));return{size:l,rovingFocusGroupRootStyle:g,tabIndex:b,dropdownKls:k,role:u,triggerId:d,dropdownListWrapperRef:_,handleKeydown:e=>{F(e),a(e)},onBlur:w,onFocus:I,onMousedown:E}}}),Ae=["role","aria-labelledby"];var ze=s(Ge,[["render",function(e,o,n,t,l,r){return F(),A("ul",{ref:e.dropdownListWrapperRef,class:H(e.dropdownKls),style:W(e.rovingFocusGroupRootStyle),tabindex:-1,role:e.role,"aria-labelledby":e.triggerId,onBlur:o[0]||(o[0]=(...o)=>e.onBlur&&e.onBlur(...o)),onFocus:o[1]||(o[1]=(...o)=>e.onFocus&&e.onFocus(...o)),onKeydown:o[2]||(o[2]=q(((...o)=>e.handleKeydown&&e.handleKeydown(...o)),["self"])),onMousedown:o[3]||(o[3]=q(((...o)=>e.onMousedown&&e.onMousedown(...o)),["self"]))},[d(e.$slots,"default")],46,Ae)}],["__file","/home/runner/work/element-plus/element-plus/packages/components/dropdown/src/dropdown-menu.vue"]]);const je=Q(Me,{DropdownItem:Ne,DropdownMenu:ze}),He=X(Ne),Je=X(ze);export{Je as E,je as a,He as b,Ce as d};