import { ScrapeUseCase } from './scrape.usecase';
import { ScrapeAdapter } from '../../test/scrape.adapter.fixture';
import * as cheerio from 'cheerio';

describe('scrape usecase test', () => {
    let adapter: ScrapeAdapter;
    let usecase: ScrapeUseCase;
    const title = 'Creating a Cheerio scrapper';
    const icon = 'https://cdn.sstatic.net/Sites/dba/img/favicon.ico?v=60c86c1ab344';
    const htmlA = `<html>
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
    beforeAll(() => {
        adapter = new ScrapeAdapter();
        usecase = new ScrapeUseCase(adapter);
    });
    it('Should parse tags', () => {
        const $ = cheerio.load(htmlA);
        const tags = usecase.extractTags($);
        expect(tags.size).toEqual(6);
        expect(Array.from(tags.keys())).toEqual(expect.arrayContaining([
            'og:type',
            'og:url',
            'og:site_name',
            'og:image',
            'twitter:card',
            'twitter:domain',
        ]));
    });
    it('Should parse document', async () => {
        const document = await usecase.loadContent(htmlA);
        expect(document.title).toEqual(title);
        expect(document.icon).toEqual(icon);
        expect(document.tags.size).toEqual(6);
    });
});
