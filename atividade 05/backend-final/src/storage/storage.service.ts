import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private supabase: SupabaseClient;
  private bucket: string;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !key) {
      throw new Error('Credenciais do Supabase não configuradas');
    }

    this.supabase = createClient(url, key);
    this.bucket = process.env.SUPABASE_BUCKET || 'anexos';
  }

  async enviar(arquivo: Express.Multer.File): Promise<string> {
    const caminho = `tarefas/${randomUUID()}${extname(arquivo.originalname).toLowerCase()}`;

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(caminho, arquivo.buffer, {
        contentType: arquivo.mimetype,
      });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    const { data } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(caminho);

    return data.publicUrl;
  }
}