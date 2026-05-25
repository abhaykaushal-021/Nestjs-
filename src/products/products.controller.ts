import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/user.schema';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @ApiOperation({ summary: 'Create product - Admin only' })
    @Roles(Role.ADMIN)
    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @ApiOperation({ summary: 'Get all products - All users' })
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @ApiOperation({ summary: 'Get product by id - All users' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update product - Admin only' })
    @Roles(Role.ADMIN)
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
        return this.productsService.update(id, dto);
    }

    @ApiOperation({ summary: 'Delete product - Admin only' })
    @Roles(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}