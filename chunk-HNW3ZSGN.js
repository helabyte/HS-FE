import{f as m}from"./chunk-WEPIXFBJ.js";import{b as c}from"./chunk-CGRUOODS.js";import{i as u}from"./chunk-A3GZRW4D.js";import{Da as a,Ea as s,Rc as r,ha as o,sb as n}from"./chunk-Q2UPFTKC.js";var D=(()=>{class e{id=s();question=s();realtimeDatabaseService=o(c);router=o(u);localize=o(m);nextRoute="";onDraft(t){this.question()?this.realtimeDatabaseService.update("questions",this.id(),t).then(()=>this.navigateDraft()):this.realtimeDatabaseService.create("questions",t).then(()=>this.navigateDraft())}onSubmit(t){this.question()?this.realtimeDatabaseService.update("questions",this.id(),t).then(()=>this.navigateNextStep()):this.realtimeDatabaseService.create("questions",t).then(i=>this.navigateNextStep(i.id))}navigateDraft(){this.router.navigate([this.localize.parser.currentLang,"questions"])}navigateNextStep(t){this.router.navigate([this.localize.parser.currentLang,"questions",t||this.id(),this.nextRoute])}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=n({type:e,selectors:[["ng-component"]],inputs:{id:[1,"id"],question:[1,"question"]},decls:0,vars:0,template:function(i,p){},encapsulation:2})}return e})();var C=(()=>{class e{submitEvent=a();draftEvent=a();form;location=o(r);saveAsDraft(){console.log("Saving as Draft:",this.form.value),this.draftEvent.emit(this.form.value)}continue(){this.form.valid?(console.log("Continuing:",this.form.value),this.submitEvent.emit(this.form.value)):this.form.markAllAsTouched()}navigatePrevStep(){this.location.back()}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=n({type:e,selectors:[["ng-component"]],outputs:{submitEvent:"submitEvent",draftEvent:"draftEvent"},decls:0,vars:0,template:function(i,p){},encapsulation:2})}return e})();export{C as a,D as b};
