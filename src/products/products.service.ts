import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryFilter, Types } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async findAll(query: ProductQueryDto) {
    const limit = Math.min(query.limit ?? 10, 10);
    const skip = query.skip ?? 0;
    const filters: QueryFilter<ProductDocument> = {};

    if (query.name) {
      filters.name = { $regex: query.name, $options: 'i' };
    }

    if (query.description) {
      filters.description = { $regex: query.description, $options: 'i' };
    }

    if (query.price !== undefined) {
      filters.price = query.price;
    }

    if (query.cursor) {
      filters._id = { $gt: new Types.ObjectId(query.cursor) };
    }

    if (query.search) {
      filters.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    const products = await this.productModel
      .find(filters)
      .sort({ _id: 1 })
      .skip(skip)
      .limit(limit);

    return {
      items: products,
      pagination: {
        limit,
        skip,
        cursor: query.cursor ?? null,
        nextCursor:
          products.length === limit ? products[products.length - 1].id : null,
      },
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: Partial<CreateProductDto>) {
    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }
}
