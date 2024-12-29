import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlreadyExistsException } from '../exceptions/exceptions';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService {
    constructor(
        @InjectRepository(Unit)
        private readonly unitRepository: Repository<Unit>,
    ) {}

    // Create a new ingredient
    async create(unitData: Partial<Unit>): Promise<Unit> {
        try {
            const ingredient = this.unitRepository.create(unitData);
            return await this.unitRepository.save(ingredient);
        } catch (error) {
            if (error.code === '23505') {
                throw new AlreadyExistsException(`Unit with name "${unitData.name}" already exists`);
            } else {
                throw error;
            }
        }
    }

    async softCreate(unitData: Partial<Unit>): Promise<Unit> {
        const existingUnit = await this.findByName(unitData.name);
        if (!existingUnit) {
            return this.create(unitData);
        } else {
            return existingUnit;
        }
    }

    async findAll(): Promise<Unit[]> {
        return await this.unitRepository.find();
    }

    async findById(id: string): Promise<Unit> {
        return await this.unitRepository.findOneBy({id: id});
    }

    async findByName(name: string): Promise<Unit> {
        return await this.unitRepository.findOneBy({name: name});
    }
}
