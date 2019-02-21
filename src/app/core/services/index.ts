import { ArticleService }           from './article.service';
import { CategoryService }          from './category.service';
import { AuthenticationService }    from './authentication.service';
import { SeoService }               from './seo.service';

export const services: any[] = [
    ArticleService,
    AuthenticationService,
    CategoryService,
    SeoService
]

export * from './article.service';
export * from './category.service';
export * from './authentication.service';
export * from './seo.service';