import { RbacAllowDirective } from "./rbac-allow.directive";
import { AllowDirective } from "./allow.directive";

export const directives: any[] = [
    RbacAllowDirective,
    AllowDirective
]

export * from './rbac-allow.directive';
export * from './allow.directive';