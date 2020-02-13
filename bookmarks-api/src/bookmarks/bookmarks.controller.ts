import { Controller, Get, Delete, Post } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
export class BookmarksController {
    constructor(
        private readonly service: BookmarksService,
    ) {}
    @Get('/')
    findAll() {}
    @Get('/:postId')
    findOne() {}
    @Post('/')
    create() {}
    @Delete('/:postId')
    delete() {}
}
