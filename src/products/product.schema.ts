import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @ApiProperty({ example: 'Laptop' })
    @Prop({ required: true })
    name!: string;

    @ApiProperty({ example: 'A powerful laptop' })
    @Prop()
    description!: string;

    @ApiProperty({ example: 999 })
    @Prop({ required: true })
    price!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);