import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async create(dto: CreateProductDto) {
        return this.productModel.create(dto);
    }

    async findAll() {
        return this.productModel.find();
    }

    async findOne(id: string) {
        const product = await this.productModel.findById(id);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async update(id: string, dto: Partial<CreateProductDto>) {
        const product = await this.productModel.findByIdAndUpdate(id, dto, { new: true });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async remove(id: string) {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) throw new NotFoundException('Product not found');
        return { message: 'Product deleted successfully' };
    }
}