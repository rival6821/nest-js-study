import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

  @Get()
  getAll(): string {
    return "this will return all movies";
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `this will return one movie id:${movieId}`;
  }

  @Post()
  create() {
    return 'this will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie id:${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `this will patch a movie id:${movieId}`;
  }
}
