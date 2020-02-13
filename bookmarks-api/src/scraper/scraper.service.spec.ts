import { Test, TestingModule } from '@nestjs/testing';
import { ScraperService } from './scraper.service';
import { HttpModule } from '@nestjs/common';
import { ScraperAdapter } from './scraper.adapter';

describe('ScraperService', () => {
  let service: ScraperService;
  let adapter: ScraperAdapter;
  const title = 'Creating a Cheerio scrapper';
  const icon = 'https://cdn.sstatic.net/Sites/dba/img/favicon.ico?v=60c86c1ab344';
  const html = `<html>
  <head>
      <title>${title}</title>
      <link rel="shortcut icon" href="${icon}">
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">
      <meta property="og:type" content= "website" />
      <meta property="og:url" content="https://dba.stackexchange.com/questions/27732/set-names-to-attributes-when-creating-json-with-row-to-json"/>
      <meta property="og:site_name" content="Database Administrators Stack Exchange" />
      <meta property="og:image" itemprop="image primaryImageOfPage" content="https://cdn.sstatic.net/Sites/dba/img/apple-touch-icon@2.png?v=246e2cb2439c" />
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:domain" content="dba.stackexchange.com"/>
      <meta description="unreachable" />
  </head>
  <body>
      MOCK me around
  </body>
  </html>`;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperService, ScraperAdapter],
      imports: [HttpModule.register({
        timeout: 1000,
        maxRedirects: 1,
      })],
    }).compile();

    service = module.get<ScraperService>(ScraperService);
    adapter = module.get<ScraperAdapter>(ScraperAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should scrape documents', async () => {
    jest.spyOn(adapter, 'scrapeDocument')
        .mockImplementationOnce(async () => html);
    const document = await service.loadContent('http://localhost:2555');
    expect(document.title).toEqual(title);
    expect(document.icon).toEqual(icon);
    expect(document.tags.size).toEqual(6);
    expect(Array.from(document.tags.keys())).toEqual(expect.arrayContaining([
      'og:type',
      'og:url',
      'og:site_name',
      'og:image',
      'twitter:card',
      'twitter:domain',
    ]));
  });
});
