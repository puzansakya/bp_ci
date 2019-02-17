import { JwtInterceptor } from './jwt.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const interceptors: any[] = [
    JwtInterceptor,
    ErrorInterceptor
]

export * from './error.interceptor';
export * from './jwt.interceptor';