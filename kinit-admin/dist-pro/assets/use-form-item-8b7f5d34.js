import{w as e,k as a,aG as o,r as t,f as n,a9 as s,ab as r,aW as d}from"./index-9da7d198.js";import{f as m,a as l}from"./use-form-common-props-9d083c67.js";import{u}from"./index-cde97138.js";const i=({from:o,replacement:t,scope:n,version:s,ref:r,type:d="API"},m)=>{e((()=>a(m)),(e=>{}),{immediate:!0})},v=()=>({form:o(m,void 0),formItem:o(l,void 0)}),I=(a,{formItemContext:o,disableIdGeneration:m,disableIdManagement:l})=>{m||(m=t(!1)),l||(l=t(!1));const i=t();let v;const I=n((()=>{var e;return!!(!a.label&&o&&o.inputIds&&(null==(e=o.inputIds)?void 0:e.length)<=1)}));return s((()=>{v=e([r(a,"id"),m],(([e,a])=>{const t=null!=e?e:a?void 0:u().value;t!==i.value&&((null==o?void 0:o.removeInputId)&&(i.value&&o.removeInputId(i.value),(null==l?void 0:l.value)||a||!t||o.addInputId(t)),i.value=t)}),{immediate:!0})})),d((()=>{v&&v(),(null==o?void 0:o.removeInputId)&&i.value&&o.removeInputId(i.value)})),{isLabeledByFormItem:I,inputId:i}};export{v as a,I as b,i as u};