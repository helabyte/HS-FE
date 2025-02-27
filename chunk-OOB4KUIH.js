import{L as I,M as x,a as k,d as c,e as F,f as d,s as B}from"./chunk-DGZYI55D.js";import{Ba as g,E as V,F as w,Fa as z,Mc as M,ba as u,ca as C,ea as R,g as D,gb as E,ha as o,hb as O,i as b,j as a,p as S,tb as y,ub as T}from"./chunk-Q2UPFTKC.js";var L=class{};function Y(i){return i&&typeof i.connect=="function"&&!(i instanceof b)}var p=function(i){return i[i.REPLACED=0]="REPLACED",i[i.INSERTED=1]="INSERTED",i[i.MOVED=2]="MOVED",i[i.REMOVED=3]="REMOVED",i}(p||{}),q=new R("_ViewRepeater"),A=class{applyChanges(r,e,t,s,n){r.forEachOperation((l,h,m)=>{let f,_;if(l.previousIndex==null){let v=t(l,h,m);f=e.createEmbeddedView(v.templateRef,v.context,v.index),_=p.INSERTED}else m==null?(e.remove(h),_=p.REMOVED):(f=e.get(h),e.move(f,m),_=p.MOVED);n&&n({context:f?.context,operation:_,record:l})})}detach(){}};var P=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new a;constructor(r=!1,e,t=!0,s){this._multiple=r,this._emitChanges=t,this.compareWith=s,e&&e.length&&(r?e.forEach(n=>this._markSelected(n)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...r){this._verifyValueAssignment(r),r.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...r){this._verifyValueAssignment(r),r.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...r){this._verifyValueAssignment(r);let e=this.selected,t=new Set(r);r.forEach(n=>this._markSelected(n)),e.filter(n=>!t.has(this._getConcreteValue(n,t))).forEach(n=>this._unmarkSelected(n));let s=this._hasQueuedChanges();return this._emitChangeEvent(),s}toggle(r){return this.isSelected(r)?this.deselect(r):this.select(r)}clear(r=!0){this._unmarkAll();let e=this._hasQueuedChanges();return r&&this._emitChangeEvent(),e}isSelected(r){return this._selection.has(this._getConcreteValue(r))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(r){this._multiple&&this.selected&&this._selected.sort(r)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(r){r=this._getConcreteValue(r),this.isSelected(r)||(this._multiple||this._unmarkAll(),this.isSelected(r)||this._selection.add(r),this._emitChanges&&this._selectedToEmit.push(r))}_unmarkSelected(r){r=this._getConcreteValue(r),this.isSelected(r)&&(this._selection.delete(r),this._emitChanges&&this._deselectedToEmit.push(r))}_unmarkAll(){this.isEmpty()||this._selection.forEach(r=>this._unmarkSelected(r))}_verifyValueAssignment(r){r.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(r,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(r,t))return t;return r}else return r}};var X=(()=>{class i{_listeners=[];notify(e,t){for(let s of this._listeners)s(e,t)}listen(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>e!==t)}}ngOnDestroy(){this._listeners=[]}static \u0275fac=function(t){return new(t||i)};static \u0275prov=u({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var U=20,G=(()=>{class i{_ngZone=o(g);_platform=o(k);_renderer=o(E).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new a;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let t=this.scrollContainers.get(e);t&&(t.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=U){return this._platform.isBrowser?new D(t=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let s=e>0?this._scrolled.pipe(w(e)).subscribe(t):this._scrolled.subscribe(t);return this._scrolledCount++,()=>{s.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):S()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,t)=>this.deregister(t)),this._scrolled.complete()}ancestorScrolled(e,t){let s=this.getAncestorScrollContainers(e);return this.scrolled(t).pipe(V(n=>!n||s.indexOf(n)>-1))}getAncestorScrollContainers(e){let t=[];return this.scrollContainers.forEach((s,n)=>{this._scrollableContainsElement(n,e)&&t.push(n)}),t}_scrollableContainsElement(e,t){let s=B(t),n=e.getElementRef().nativeElement;do if(s==n)return!0;while(s=s.parentElement);return!1}static \u0275fac=function(t){return new(t||i)};static \u0275prov=u({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})(),Xe=(()=>{class i{elementRef=o(z);scrollDispatcher=o(G);ngZone=o(g);dir=o(I,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new a;_renderer=o(O);_cleanupScroll;_elementScrolled=new a;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let t=this.elementRef.nativeElement,s=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=s?e.end:e.start),e.right==null&&(e.right=s?e.start:e.end),e.bottom!=null&&(e.top=t.scrollHeight-t.clientHeight-e.bottom),s&&d()!=c.NORMAL?(e.left!=null&&(e.right=t.scrollWidth-t.clientWidth-e.left),d()==c.INVERTED?e.left=e.right:d()==c.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=t.scrollWidth-t.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let t=this.elementRef.nativeElement;F()?t.scrollTo(e):(e.top!=null&&(t.scrollTop=e.top),e.left!=null&&(t.scrollLeft=e.left))}measureScrollOffset(e){let t="left",s="right",n=this.elementRef.nativeElement;if(e=="top")return n.scrollTop;if(e=="bottom")return n.scrollHeight-n.clientHeight-n.scrollTop;let l=this.dir&&this.dir.value=="rtl";return e=="start"?e=l?s:t:e=="end"&&(e=l?t:s),l&&d()==c.INVERTED?e==t?n.scrollWidth-n.clientWidth-n.scrollLeft:n.scrollLeft:l&&d()==c.NEGATED?e==t?n.scrollLeft+n.scrollWidth-n.clientWidth:-n.scrollLeft:e==t?n.scrollLeft:n.scrollWidth-n.clientWidth-n.scrollLeft}static \u0275fac=function(t){return new(t||i)};static \u0275dir=T({type:i,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return i})(),H=20,Ke=(()=>{class i{_platform=o(k);_listeners;_viewportSize;_change=new a;_document=o(M,{optional:!0});constructor(){let e=o(g),t=o(E).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let s=n=>this._change.next(n);this._listeners=[t.listen("window","resize",s),t.listen("window","orientationchange",s)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:t,height:s}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+s,right:e.left+t,height:s,width:t}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,t=this._getWindow(),s=e.documentElement,n=s.getBoundingClientRect(),l=-n.top||e.body.scrollTop||t.scrollY||s.scrollTop||0,h=-n.left||e.body.scrollLeft||t.scrollX||s.scrollLeft||0;return{top:l,left:h}}change(e=H){return e>0?this._change.pipe(w(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(t){return new(t||i)};static \u0275prov=u({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();var W=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=y({type:i});static \u0275inj=C({})}return i})(),Je=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=y({type:i});static \u0275inj=C({imports:[x,W,x,W]})}return i})();export{L as a,Y as b,p as c,q as d,A as e,P as f,X as g,G as h,Xe as i,Ke as j,W as k,Je as l};
