import { Module, HttpModule } from '@nestjs/common';
import { ScraperAdapter } from './scraper.adapter';
import { ScraperService } from './scraper.service';

@Module({
  imports: [HttpModule.register({
    timeout: 1000,
    maxRedirects: 1,
  })],
  providers: [ScraperAdapter, ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
