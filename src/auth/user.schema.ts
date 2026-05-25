import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @ApiProperty({ example: 'user@example.com' })
    @Prop({ required: true, unique: true })
    email!: string;

    @ApiProperty({ example: 'password123' })
    @Prop({ required: true })
    password!: string;

    @ApiProperty({ example: 'user', enum: Role })
    @Prop({ default: Role.USER, enum: Role })
    role!: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);