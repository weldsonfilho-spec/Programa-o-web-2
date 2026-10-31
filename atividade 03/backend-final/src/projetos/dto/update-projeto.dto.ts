import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

// Reaproveita as validações da criação, deixando todos os campos opcionais.
export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
