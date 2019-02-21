import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * inject wherever tags are required to be updated
 */
@Injectable()
export class SeoService {

  constructor(private meta: Meta, private titleService: Title) { }

  generateTags(tags) {

    // Set a title
    this.titleService.setTitle(tags.title);

    // Set meta tags for twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'Medium-puzan' });
    this.meta.updateTag({ name: 'twitter:site', content: '@medium-puzan' });
    this.meta.updateTag({ name: 'twitter:title', content: tags.title });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    // Set meta tags for facebook
    this.meta.updateTag({ property: 'og:type', content: 'Medium-puzan' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Medium-puzan' });
    this.meta.updateTag({ property: 'og:title', content: tags.title });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({ property: 'og:url', content: tags.slug });
  }
}