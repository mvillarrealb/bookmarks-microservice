import { Test, TestingModule } from '@nestjs/testing';
import { ScraperAdapter } from './scraper.adapter';
import { HttpModule, HttpService } from '@nestjs/common';

describe('ScraperAdapter', () => {
  let provider: ScraperAdapter;
  let httpModule: HttpService;
  let fixture;
  const url = 'http://localhost:25500';
  const htmlDocument = `<html><h1>Hello World</h1></html>`;
  const createMockServer = () => {
    const expressApp = require('express')();
    expressApp.get('/', (req, res) => res.status(200).send(htmlDocument));
    return expressApp;
  };
  beforeAll(() => {
    const expressServer = createMockServer();
    fixture = expressServer.listen(25500);
  });
  afterAll(async () => {
    fixture.close();
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule.register({
        timeout: 1000,
        maxRedirects: 1,
      })],
      providers: [ScraperAdapter],
    }).compile();
    httpModule = module.get<HttpService>(HttpService);
    provider = module.get<ScraperAdapter>(ScraperAdapter);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
  it('Should scrape content', async () => {
    const response = await provider.scrapeDocument(url);
    expect(response).toEqual(htmlDocument);
  });
});
