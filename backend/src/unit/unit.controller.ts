import { Body, Controller, Get, Post } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';

@Controller('unit')
export class UnitController {
    constructor(
        private unitService: UnitService,
    ) {}

    @Post()
    async create(@Body() unit: Partial<Unit>) {
        return await this.unitService.softCreate(unit);
    }

    @Post('standard')
    async createStandard() {
        return await this.unitService.createStandard();
    }

    @Get()
    async findBy(@Body('id') id?: string, @Body('name') name?: string): Promise<Unit> {
        if (id) {
            return await this.unitService.findById(id);
        } else if (name) {
            return await this.unitService.findByName(name);
        } else {
            throw Error('No parameter specified. Try specifying with `id` or `name`');
        }
    }

    @Get('all')
    async findAll(): Promise<Unit[]> {
        return await this.unitService.findAll();
    }
}