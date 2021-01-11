import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it('should return array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  });

  describe("getOne", () => {
    it('should return a movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['Test']
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie not found id:999`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['Test']
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {

    it('create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['Test']
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('update movie', () => {
      service.create({
        title: 'testMovie',
        year: 2000,
        genres: ['Test']
      });
      service.update(1, { title: 'updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, { title: 'updated Test' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
