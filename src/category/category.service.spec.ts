import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepo: jest.Mocked<CategoryRepository>;

  const mockCategory = {
    id: 1,
    name: 'Electronics',
    description: 'Electronic products',
    productId: 10,
    image: 'image.png',
  };

  const categoryRepositoryMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createCategory: jest.fn(),
  };

  const prismaServiceMock = {}; // not used directly but required for DI

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: categoryRepositoryMock,
        },
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepo = module.get(CategoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCategories', () => {
    it('should return all categories', async () => {
      categoryRepo.findAll.mockResolvedValue([mockCategory] as any);

      const result = await service.getAllCategories();

      expect(categoryRepo.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('getCategoryById', () => {
    it('should return a category when found', async () => {
      categoryRepo.findOne.mockResolvedValue(mockCategory as any);

      const result = await service.getCategoryById(1);

      expect(categoryRepo.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException if category not found', async () => {
      categoryRepo.findOne.mockResolvedValue(null);

      expect(() => service.getCategoryById(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated' };
      categoryRepo.update.mockResolvedValue(mockCategory as any);

      const result = await service.update(1, dto);

      expect(categoryRepo.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      categoryRepo.delete.mockResolvedValue({ deleted: true } as any);

      const result = await service.delete(1);

      expect(categoryRepo.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });

  describe('createCategory', () => {
    it('should create a category', async () => {
      const data = {
        name: 'Books',
        description: 'Book category',
        productId: 5,
        image: 'books.png',
      };

      categoryRepo.createCategory.mockResolvedValue(mockCategory as any);

      const result = await service.createCategory(data);

      expect(categoryRepo.createCategory).toHaveBeenCalledWith(data);
      expect(result).toEqual(mockCategory);
    });
  });
});
