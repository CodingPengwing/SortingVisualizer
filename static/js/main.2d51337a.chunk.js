(this["webpackJsonpsorting-visualizer"]=this["webpackJsonpsorting-visualizer"]||[]).push([[0],{16:function(t,r,e){t.exports={container:"Selector_container__3vhKK",selector:"Selector_selector__2W_gv",sliders:"Selector_sliders__3o2ev",sliderDropdown:"Selector_sliderDropdown__3Ubdx",buttons:"Selector_buttons__1RrtI"}},24:function(t,r,e){t.exports={App:"App_App__2Fx1V",welcomediv:"App_welcomediv__WrbDi",welcome:"App_welcome__1OqrH",welcome2:"App_welcome2__2dCac"}},31:function(t,r,e){t.exports={arrayContainer:"SortingVisualizer_arrayContainer__ci01s",arrayBar:"SortingVisualizer_arrayBar__328_G",buttons:"SortingVisualizer_buttons__3oTjY"}},44:function(t,r,e){t.exports={navbar:"NavBar_navbar__3_lUG",author:"NavBar_author__2A4cE",icons:"NavBar_icons__ZsK-g"}},70:function(t,r,e){},72:function(t,r,e){},80:function(t,r,e){"use strict";e.r(r);var a,i,n,o,s,h,c,l=e(0),u=e.n(l),g=e(17),d=e.n(g),f=(e(70),e(24)),y=e.n(f),b=e(15),S=e(47),v=e(48),p=e(51),j=e(50);function m(t,r){for(var e=[],a=t;a<r;a++)e.push(a);return e.slice()}function k(t,r){return Math.floor(Math.random()*(r-t+1)+t)}function O(t,r,e){var a=[t[e],t[r]];t[r]=a[0],t[e]=a[1]}function x(t){for(var r=!0,e=0;e<t.length-1;e++)if(t[e]>t[e+1]){r=!1;break}return r}function T(t){for(var r=t.length-1;r>0;r--){var e=Math.floor(Math.random()*(r+1)),a=t[r];t[r]=t[e],t[e]=a}}function C(t){a=t.addToHistory;var r=function(t){if(t.length<=1)return t;var r=!1;for(;!r;){r=!0;for(var e=1;e<t.length;e++)a({array:t.slice(),highlights:[e-1,e]}),t[e-1]>t[e]&&(O(t,e-1,e),a({array:t.slice(),highlights:[e-1,e]}),r=!1)}return t}(t.array);return a({array:r.slice(),highlights:[]}),r.slice()}function A(t){i=t.addToHistory;var r=function(t){if(t.length<=1)return t;var r,e=!1,a=0,n=t.length-1;for(;!e&&a<n;){for(e=!0,r=a+1;r<=n;)i({array:t.slice(),highlights:[r-1,r]}),t[r-1]>t[r]&&(O(t,r-1,r),e=!1,i({array:t.slice(),highlights:[r-1,r]})),r++;if(n--,e)break;for(e=!0,r=n;r>a;)i({array:t.slice(),highlights:[r-1,r]}),t[r-1]>t[r]&&(O(t,r-1,r),e=!1,i({array:t.slice(),highlights:[r-1,r]})),r--;if(a++,e)break}return t}(t.array);return i({array:r.slice(),highlights:[]}),r.slice()}function _(t){n=t.addToHistory;var r=function(t){if(t.length<=1)return t;var r=1;for(;r<t.length;)n({array:t.slice(),highlights:[r-1,r]}),t[r-1]<=t[r]?r++:(O(t,r-1,r),n({array:t.slice(),highlights:[r-1,r]}),r>1&&r--);return t}(t.array);return n({array:r.slice(),highlights:[]}),r.slice()}function I(t){o=t.addToHistory;var r=function(t){if(t.length<=1)return t;t.unshift(null),function(t){for(var r=t.length,e=r,a=Math.floor(r/2);a>0;a--)H(t,a,e)}(t);for(var r=t.length,e=t.length-1;e>0;e--)w({array:t.slice(),highlights:[1,e]}),O(t,1,e),w({array:t.slice(),highlights:[1,e]}),H(t,1,r-=1);return t.shift(),t}(t.array);return o({array:r.slice(),highlights:[]}),r.slice()}function w(t){t.array.shift();for(var r=0;r<t.highlights.length;r++)t.highlights[r]-=1;o({array:t.array,highlights:t.highlights})}function H(t,r,e){if(!(2*r>=e)){var a=2*r,i=2*r+1<e?2*r+1:a;w({array:t.slice(),highlights:[r,a,i]});var n=r;t[a]>t[r]&&(n=a),t[i]>t[n]&&(n=i),n!==r&&(O(t,r,n),w({array:t.slice(),highlights:[r,n]}),H(t,n,e))}}function M(t){s=t.addToHistory;var r=function(t){if(t.length<=1)return t;for(var r=1;r<t.length;r++){var e=r-1;for(s({array:t.slice(),highlights:[e,r]});e>=0&&t[e]>t[e+1];)O(t,e,e+1),s({array:t.slice(),highlights:[e,e+1]}),e-=1}return t}(t.array);return s({array:r.slice(),highlights:[]}),r.slice()}function R(t){h=t.addToHistory;var r=t.array.length-1,e=B(t.array,0,r);return h({array:e.slice(),highlights:[]}),e.slice()}function B(t,r,e){if(e<=r)return t;var a=e-r+1,i=Math.ceil(r+a/2);return B(t,r,i-1),B(t,i,e),t[i-1]>=t[i]&&function(t,r,e,a){if(a<=r)return t;var i=[],n=r,o=e;for(;n<e&&o<=a;)h({array:t.slice(),highlights:[n,o]}),t[n]<=t[o]?i.push(t[n++]):i.push(t[o++]);for(;n<e;)h({array:t.slice(),highlights:[n,o-1]}),i.push(t[n++]);for(;o<=a;)h({array:t.slice(),highlights:[n-1,o]}),i.push(t[o++]);for(var s=0;s<i.length;s++)h({array:t.slice(),highlights:[r+s]}),t[r+s]=i[s]}(t,r,i,e),h({array:t.slice(),highlights:m(r,e+1)}),t}function z(t){c=t.addToHistory;var r=t.array.length-1,e=N(t.array,0,r);return c({array:e.slice(),highlights:[]}),e.slice()}function N(t,r,e){if(e<=r)return t;var a=function(t,r,e){if(e<=r)return r;var a=t[r],i=r+1,n=e;for(;;){for(;t[i]<=a&&i<n;)c({array:t.slice(),highlights:[r,i,n]}),i+=1;for(;t[n]>a&&i<=n;)c({array:t.slice(),highlights:[r,i,n]}),n-=1;if(!(i<n))break;c({array:t.slice(),highlights:[r,i,n]}),O(t,i,n),c({array:t.slice(),highlights:[r,i,n]})}return c({array:t.slice(),highlights:[r,n]}),O(t,r,n),c({array:t.slice(),highlights:[r,n]}),n}(t,r,e);return N(t,r,a-1),N(t,a+1,e),t}var P,D,F,U,Q=e(29);function G(t){P=t.addToHistory;var r=t.array,e=L(r,0,r.length-1);return P({array:e.slice(),highlights:[]}),e.slice()}function L(t,r,e){for(;r<e;){var a=V(t,r,e),i=Object(Q.a)(a,2),n=i[0],o=i[1];n-r<e-o?(L(t,r,n-1),r=o+1):(L(t,o+1,e),e=n-1)}return t}function V(t,r,e){if(e<=r)return[r,e];if(e-r+1>5){var a=k(r,e);P({array:t.slice(),highlights:[r,a]}),O(t,r,a),P({array:t.slice(),highlights:[r,a]})}for(var i=r+1,n=t[r];i<=e;)P({array:t.slice(),highlights:[r,i,e]}),t[i]<n?(O(t,r,i),P({array:t.slice(),highlights:[r,i]}),r++,i++):t[i]>n?(O(t,i,e),P({array:t.slice(),highlights:[r,i,e]}),e--):i++;if(e-r>=1){var o=m(r,e+1);P({array:t.slice(),highlights:o.slice()})}return[r,e]}function K(t){D=t.addToHistory;var r=function(t){if(t.length<=1)return t;for(var r=t.length,e=0;e<r;e++){for(var a=t[e],i=e,n=e;n<r;n++)D({array:t.slice(),highlights:[e,n,i]}),a>t[n]&&(a=t[n],i=n);D({array:t.slice(),highlights:[e,i]}),O(t,e,i),D({array:t.slice(),highlights:[e,i]})}return t}(t.array);return D({array:r.slice(),highlights:[]}),r.slice()}function E(t){F=t.addToHistory;var r=function(t){var r=1;for(;r<t.length;)r=3*r+1;for(;r>1;)for(var e=r=Math.floor(r/3);e<t.length;e++){var a=t[e],i=e;for(F({array:t.slice(),highlights:[e,i-r]});a<t[i-r]&&(t[i]=t[i-r],F({array:t.slice(),highlights:[i,i-r]}),!((i-=r)<r)););t[i]=a}return t}(t.array);return F({array:r.slice(),highlights:[]}),r.slice()}function J(t){U=t.addToHistory;var r=function(t){for(var r=t.length,e=function(t){var r=0;for(;t>=16;)r|=1&t,t>>=1;return t+r}(r),a=0;a<r;a+=e){W(t,a,Math.min(a+e-1,r-1))}var i=e;for(;i<r;){for(var n=0;n<r;n+=2*i){var o=Math.min(r-1,n+i-1),s=Math.min(n+2*i-1,r-1);o<s&&q(t,n,o,s)}i*=2}return t}(t.array);return U({array:r.slice(),highlights:[]}),r.slice()}function W(t,r,e){if(e<=r)return t;U({array:t.slice(),highlights:m(r,e+1)});for(var a=r+1;a<e+1;a++){var i=a;for(U({array:t.slice(),highlights:[i-1,i]});i>r&&t[i]<t[i-1];)O(t,i-1,i),U({array:t.slice(),highlights:[i-1,i]}),i--}return t}function q(t,r,e,a){if(a<=r)return t;U({array:t.slice(),highlights:m(r,a+1)});for(var i=[],n=r,o=e+1;n<=e&&o<=a;)U({array:t.slice(),highlights:[n,o]}),t[n]<=t[o]?i.push(t[n++]):i.push(t[o++]);for(;n<=e;)U({array:t.slice(),highlights:[n,o-1]}),i.push(t[n++]);for(;o<=a;)U({array:t.slice(),highlights:[n-1,o]}),i.push(t[o++]);for(var s=0;s<i.length;s++)U({array:t.slice(),highlights:[r+s]}),t[r+s]=i[s];return t}var Y,Z;function X(t){for(var r=!0,e=0;e<100;e++){var a=$();tt(a.slice().sort((function(t,r){return t-r})),t({array:a.slice(),range:[0,a.length-1],addToHistory:function(){}}))||(r=!1),console.log(r)}return r}function $(){for(var t,r,e=[],a=0;a<100;a++)e.push((t=-2e3,r=2e3,Math.floor(Math.random()*(r-t+1)+t)));return e.slice()}function tt(t,r){if(t.length!==r.length)return!1;for(var e=0;e<t.length;e++)if(t[e]!==r[e])return!1;return!0}function rt(t){if(Y=t.addToHistory,t.array.length>7)return t.array.slice();var r=function(t){for(var r=et(t),e=0;e<r.length;e++)if(Y({array:r[e],highlights:m(0,t.length)}),x(r[e]))return r[e]}(t.array);return Y({array:r.slice(),highlights:[]}),r.slice()}function et(t){for(var r=[],e=0;e<t.length;e+=1){var a=et(t.slice(0,e).concat(t.slice(e+1)));if(a.length)for(var i=0;i<a.length;i+=1)r.push([t[e]].concat(a[i]));else r.push([t[e]])}return r}function at(t){Z=t.addToHistory;var r=void t.array;return Z({array:r.slice(),highlights:[]}),r.slice()}var it=e(102),nt=e(61),ot=(e(71),e(16)),st=e.n(ot),ht=e(101),ct=e(105),lt=(e(72),e(106)),ut=e(104),gt=e(2),dt=Object(lt.a)(ut.a)({marginRight:"5%",fontFamily:"monospace",fontSize:"17px",textAlign:"center",textTransform:"uppercase",backgroundSize:"200% auto",transition:"0.25s ease-in",color:"#FFF",width:"200px",boxShadow:"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",cursor:"pointer",backgroundImage:"linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)","&:hover":{backgroundPosition:"right bottom"}}),ft=Object(lt.a)(dt)({backgroundImage:"linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)","&:hover":{backgroundPosition:"right bottom"}}),yt=Object(lt.a)(dt)({backgroundImage:"linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)","&:hover":{backgroundPosition:"right bottom"}}),bt=Object(lt.a)(dt)({backgroundImage:"linear-gradient(90deg, #00d2ff 0%, #3a7bd5 0%, #00d2ff 60%)","&:hover":{backgroundPosition:"right bottom"}}),St=function(t){var r=Object(l.useState)("Steady Random"),e=Object(Q.a)(r,2),a=e[0],i=e[1],n=Object(l.useState)("Quick Sort"),o=Object(Q.a)(n,2),s=o[0],h=o[1];function c(r){i(r),t.onChangeInput(r)}function u(r){h(r),t.onChangeSort(r)}return Object(gt.jsxs)("div",{className:st.a.container,children:[Object(gt.jsxs)("div",{className:st.a.sliders,children:[Object(gt.jsxs)("div",{className:st.a.sliderDropdown,children:[Object(gt.jsx)(ht.a,{gutterBottom:!0,style:{fontFamily:"monospace",color:"white",marginTop:"1%",marginRight:"4%"},children:"Array"}),Object(gt.jsxs)(it.a,{id:"dropdown-basic-button",title:a,style:{width:"53%"},children:[Object(gt.jsx)(nt.a.Item,{onClick:function(){return c("Steady Random")},children:"Steady Random Array"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return c("Random")},children:"Random Array"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return c("Sorted")},children:"Sorted Array"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return c("Reverse Sorted")},children:"Reverse Sorted Array"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return c("Uniform")},children:"Uniform Array"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return c("Partial Uniform")},children:"Partial Uniform Array"})]}),Object(gt.jsx)(ht.a,{gutterBottom:!0,style:{fontFamily:"monospace",color:"white",marginLeft:"4%",marginRight:"3%"},children:"Array Size"}),Object(gt.jsx)(ct.a,{onChange:function(r,e){t.onChangeSize(e,a)},defaultValue:t.disableSlider?7:100,valueLabelDisplay:"auto",disabled:t.disableSlider,step:1,min:5,max:100})]}),Object(gt.jsxs)("div",{className:st.a.sliderDropdown,children:[Object(gt.jsx)(ht.a,{gutterBottom:!0,style:{fontFamily:"monospace",color:"white",marginTop:"1%",marginRight:"5%"},children:"Sort"}),Object(gt.jsxs)(it.a,{id:"dropdown-basic-button",title:s,style:{width:"61%"},children:[Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Bogo Sort")},children:"Bogo Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Bubble Sort")},children:"Bubble Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Cocktail Shaker Sort")},children:"Cocktail Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Gnome Sort")},children:"Gnome Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Heap Sort")},children:"Heap Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Insertion Sort")},children:"Insertion Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Merge Sort")},children:"Merge Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Quick Sort")},children:"Quick Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Quick Sort Optimized")},children:"Quick Sort (Optimized)"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Selection Sort")},children:"Selection Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Shell Sort")},children:"Shell Sort"}),Object(gt.jsx)(nt.a.Item,{onClick:function(){return u("Tim Sort")},children:"Tim Sort"})]}),Object(gt.jsx)(ht.a,{gutterBottom:!0,style:{fontFamily:"monospace",color:"white",marginRight:"2%"},children:"Sorting Speed"}),Object(gt.jsx)(ct.a,{onChange:function(r,e){t.onChangeSpeed(e)},defaultValue:100,valueLabelDisplay:"auto",step:1,min:1,max:100})]})]}),Object(gt.jsxs)("div",{className:st.a.buttons,children:[Object(gt.jsx)(dt,{style:st.a.buttonStyle,onClick:function(){t.pause(),t.sort()},children:"Run"}),Object(gt.jsx)(yt,{style:st.a.buttonStyle,onClick:function(){return t.pause()},children:"Pause"}),Object(gt.jsx)(bt,{style:st.a.buttonStyle,onClick:function(){console.log("")},children:"Resume"}),Object(gt.jsx)(ft,{style:st.a.buttonStyle,onClick:function(){return t.reset()},children:"Reset"})]})]})},vt=e(31),pt=e.n(vt),jt=100,mt=10,kt=450;function Ot(t){var r="#00a1c9";return t.highlighted&&(r="#832380"),Object(gt.jsx)("div",{className:pt.a.arrayBar,style:{height:"".concat(t.value,"px"),backgroundColor:r}},t.idx)}var xt=function(t){Object(p.a)(e,t);var r=Object(j.a)(e);function e(){return Object(S.a)(this,e),r.apply(this,arguments)}return Object(v.a)(e,[{key:"renderBar",value:function(t){var r=this.props.highlights.includes(t);return Object(gt.jsx)(Ot,{value:this.props.array[t],idx:t,highlighted:r},t)}},{key:"render",value:function(){var t,r=[];for(t=0;t<this.props.array.length;t++)r.push(this.renderBar(t));return r.push(Object(gt.jsx)("div",{className:pt.a.arrayBar,style:{height:480,backgroundColor:"black"}},t)),Object(gt.jsx)("div",{className:pt.a.array,children:r})}}]),e}(u.a.Component),Tt=function(t){Object(p.a)(e,t);var r=Object(j.a)(e);function e(t){var a;return Object(S.a)(this,e),(a=r.call(this,t)).state={array:[],highlights:[],sortType:z,timeoutIDArray:[],resumePoint:0,disableSlider:!1,arrayState:"Steady"},a.history=[],a.updateState=function(t,r,e){a.setState({array:t,highlights:r,resumePoint:e})},a.addToHistory=function(t){a.history.push({array:t.array.slice(),highlights:t.highlights.slice()})},a.clearHistory=function(){a.history=[]},a.generateArray=a.generateArray.bind(Object(b.a)(a)),a.changeSort=a.changeSort.bind(Object(b.a)(a)),a.doSort=a.doSort.bind(Object(b.a)(a)),a.reset=a.reset.bind(Object(b.a)(a)),a.pause=a.pause.bind(Object(b.a)(a)),a.onChangeArraySize=a.onChangeArraySize.bind(Object(b.a)(a)),a.onChangeSortSpeed=a.onChangeSortSpeed.bind(Object(b.a)(a)),a}return Object(v.a)(e,[{key:"componentDidMount",value:function(){this.generateSteadyArray(),function(){var t=!0;console.log("Testing Bubble Sort:"),X(C)||(t=!1),console.log("Testing Cocktail Shaker Sort:"),X(A)||(t=!1),console.log("Testing Gnome Sort:"),X(_)||(t=!1),console.log("Testing Heap Sort:"),X(I)||(t=!1),console.log("Testing Insertion Sort:"),X(M)||(t=!1),console.log("Testing Merge Sort:"),X(R)||(t=!1),console.log("Testing Quick Sort:"),X(z)||(t=!1),console.log("Testing Quick Sort Optimized:"),X(G)||(t=!1),console.log("Testing Selection Sort:"),X(K)||(t=!1),console.log("Testing Shell Sort:"),X(E)||(t=!1),console.log("Testing Tim Sort:"),X(J)||(t=!1),t?console.log("All tests completed successfully. Dope!"):console.log("Testing failed, try again human.")}()}},{key:"changeSort",value:function(t){switch("Bogo Sort"===t?(this.pause(),this.setState({disableSlider:!0}),jt=7,this.generateSteadyArray()):this.state.disableSlider&&(this.pause(),this.setState({disableSlider:!1}),jt=100,this.generateSteadyArray()),t){case"Bogo Sort":this.setState({sortType:rt});break;case"Bubble Sort":this.setState({sortType:C});break;case"Cocktail Shaker Sort":this.setState({sortType:A});break;case"Gnome Sort":this.setState({sortType:_});break;case"Heap Sort":this.setState({sortType:I});break;case"Insertion Sort":this.setState({sortType:M});break;case"Intro Sort":this.setState({sortType:at});break;case"Merge Sort":this.setState({sortType:R});break;case"Quick Sort":this.setState({sortType:z});break;case"Quick Sort Optimized":this.setState({sortType:G});break;case"Selection Sort":this.setState({sortType:K});break;case"Shell Sort":this.setState({sortType:E});break;case"Tim Sort":this.setState({sortType:J})}}},{key:"generateArray",value:function(t){switch(this.pause(),t){case"Random":this.generateRandomArray();break;case"Steady Random":this.generateSteadyArray();break;case"Sorted":this.generateSortedArray();break;case"Reverse Sorted":this.generateReverseSortedArray();break;case"Uniform":this.generateUniformArray();break;case"Partial Uniform":this.generatePartialUniformArray()}}},{key:"generateRandomArray",value:function(){for(var t=Math.floor(445/jt),r=[],e=0;e<jt;e++)r.push(5+t*k(0,Math.floor(kt/t)));this.updateState(r.slice(),[])}},{key:"generateSteadyArray",value:function(){var t=Math.floor(445/jt),r=m(0,jt);T(r);for(var e=[],a=0;a<r.length;a++)e.push(5+t*r[a]);this.updateState(e.slice(),[])}},{key:"generateSortedArray",value:function(){for(var t=Math.floor(445/jt),r=[],e=0;e<jt;e++)r.push(5+t*e);this.updateState(r.slice(),[])}},{key:"generateReverseSortedArray",value:function(){for(var t=Math.floor(445/jt),r=[],e=jt-1;e>=0;e--)r.push(5+t*e);this.updateState(r.slice(),[])}},{key:"generateUniformArray",value:function(){for(var t=k(Math.floor(225),kt),r=[],e=0;e<jt;e++)r[e]=t;this.updateState(r.slice(),[])}},{key:"generatePartialUniformArray",value:function(){for(var t=Math.floor(89),r=[],e=1;e<=5;e++)r.push(5+e*t);for(var a=[],i=0;i<5;i++)for(var n=0;n<Math.floor(jt/5);n++)a.push(5+r[i]);for(;a.length<jt;)a.push(5+r[k(0,4)]);T(a),this.updateState(a.slice(),[])}},{key:"reset",value:function(){if(this.history.length>0){var t=this.history[0];this.updateState(t.array.slice(),[])}this.pause(),this.clearHistory()}},{key:"pause",value:function(){for(var t=this.state.timeoutIDArray.length,r=this.state.resumePoint;r<t;r++)clearTimeout(this.state.timeoutIDArray[r])}},{key:"animateHistory",value:function(){for(var t=this,r=function(r){var e=setTimeout((function(){t.updateState(t.history[r].array,t.history[r].highlights,r)}),mt*r);t.state.timeoutIDArray.push(e)},e=0;e<this.history.length;e++)r(e)}},{key:"doSort",value:function(){this.clearHistory();var t=this.state.sortType({array:this.state.array,addToHistory:this.addToHistory});return this.animateHistory(),t.slice()}},{key:"onChangeArraySize",value:function(t,r){jt!==t&&(jt=t,this.generateArray(r))}},{key:"onChangeSortSpeed",value:function(t){var r=this;if(mt!==t){mt=510-500*(t/100),this.pause();for(var e=1,a=function(t){var a=setTimeout((function(){r.updateState(r.history[t].array,r.history[t].highlights,t)}),mt*e);r.state.timeoutIDArray.push(a),e++},i=this.state.resumePoint;i<this.history.length;i++)a(i)}}},{key:"render",value:function(){return Object(gt.jsxs)("div",{children:[Object(gt.jsx)(St,{onChangeInput:this.generateArray,onChangeSort:this.changeSort,sort:this.doSort,reset:this.reset,pause:this.pause,onChangeSize:this.onChangeArraySize,onChangeSpeed:this.onChangeSortSpeed,disableSlider:this.state.disableSlider}),Object(gt.jsx)("div",{className:pt.a.arrayContainer,children:Object(gt.jsx)(xt,{array:this.state.array,highlights:this.state.highlights})})]})}}]),e}(u.a.Component),Ct=e(44),At=e.n(Ct),_t=e(49),It=e(60),wt=e.n(It);console.log(y.a);var Ht=function(t){return Object(gt.jsx)("div",{className:y.a.welcomediv,children:Object(gt.jsx)(wt.a,{delay:300,children:Object(gt.jsx)("h1",{className:y.a.welcome2,children:"sortify.io"})})})},Mt=function(t){return Object(gt.jsxs)("div",{className:At.a.navbar,children:[Object(gt.jsx)("h2",{className:At.a.author,children:"By: Tony & Ley"}),Object(gt.jsx)(Ht,{}),Object(gt.jsxs)("div",{className:At.a.icons,children:[Object(gt.jsx)("a",{href:"https://github.com/ilaylow",children:Object(gt.jsx)(_t.AiOutlineGithub,{size:55,style:{marginRight:"2.5%"}})}),Object(gt.jsx)("a",{href:"https://github.com/CodingPengwing",children:Object(gt.jsx)(_t.AiOutlineGithub,{size:55})})]})]})};Object(lt.a)(ut.a)({color:"white",backgroundColor:"black",marginRight:"2.5%",marginTop:"2.5%",padding:"0.5% 2%",transition:"ease-in 0.2s","&:hover":{backgroundColor:"white",color:"black"}});function Rt(){return Object(gt.jsxs)("div",{className:y.a.App,children:[Object(gt.jsx)(Mt,{}),Object(gt.jsx)(Tt,{})]})}var Bt=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,108)).then((function(r){var e=r.getCLS,a=r.getFID,i=r.getFCP,n=r.getLCP,o=r.getTTFB;e(t),a(t),i(t),n(t),o(t)}))};d.a.render(Object(gt.jsx)(u.a.StrictMode,{children:Object(gt.jsx)(Rt,{})}),document.getElementById("root")),Bt()}},[[80,1,2]]]);
//# sourceMappingURL=main.2d51337a.chunk.js.map