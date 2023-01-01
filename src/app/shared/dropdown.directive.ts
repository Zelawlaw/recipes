import { Directive ,
  HostListener,
  OnInit,
   Renderer2, ElementRef } from "@angular/core";

@Directive({
  selector:'[appDropDown]'
})
export class DropdownDirective implements OnInit{
 openup !:boolean;

 constructor(private elref : ElementRef,private renderer:Renderer2){}
 ngOnInit(){
   this.openup = false;
 }

  @HostListener('click')
  clickMe(){
  this.openup = !this.openup;
  const menu = this.elref.nativeElement.querySelector('.dropdown-menu');
  console.log('menu :'+menu);
  if(this.openup)
  {
    this.renderer.addClass(menu,'show')
  }
  else{
   this.renderer.removeClass(menu,'show');
  }

  }


}
