import { ArticleService } from './article.service';
import { CategoryService } from './category.service';
import { AuthenticationService } from './authentication.service';

export const services: any[] = [
    ArticleService,
    AuthenticationService,
    CategoryService
]

export * from './article.service';
export * from './category.service';
export * from './authentication.service';