import {
  Body,
  Controller,
  UseGuards,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Req,
} from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { TarefasService } from './tarefas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('tarefas') + prefixo global 'api' => rotas em /api/tarefas.
@UseGuards(JwtAuthGuard)
@Controller('tarefas')
export class TarefasController {
  // Injeção de dependência: o Nest entrega uma instância de TarefasService.
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarefasService.findOne(id);
  }

  
  @Post()
  create(
    @Body() dto: CreateTarefaDto,
    @Req() req: { user: { userId: number; email: string } },
  ) {
    return this.tarefasService.create(dto, req.user.email);
  }


  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTarefaDto,
  ) {
    return this.tarefasService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204) // 204 No Content: sucesso sem corpo na resposta
  remove(@Param('id', ParseIntPipe) id: number) {
    this.tarefasService.remove(id);
  }

  @Post(':id/anexo')
  @UseInterceptors(
    FileInterceptor('arquivo', {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  anexar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
          }),
          new FileTypeValidator({
            fileType: /^(image\/(png|jpe?g|webp|gif)|application\/pdf)$/,
          }),
        ],
      }),
    )
    arquivo: Express.Multer.File,
  ) {
    return this.tarefasService.anexar(id, arquivo);
  }
}
