import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {
  }

  @Input() set ifRole(roles: string[]) {
    this.authService.getUserLogged().subscribe(res => {
      for (let role of roles) {
        if (res?.ruoli?.find(ruolo => ruolo === role)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }
    })
  }
}
