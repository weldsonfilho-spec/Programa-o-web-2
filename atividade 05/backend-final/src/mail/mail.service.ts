import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private readonly resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error('RESEND_API_KEY não configurada');
    }

    this.resend = new Resend(apiKey);
  }

  async tarefaCriada(para: string, titulo: string): Promise<void> {
    const from =
      process.env.MAIL_FROM || 'Tarefas <onboarding@resend.dev>';

    const tituloSeguro = titulo.replace(/[&<>"']/g, (caractere) => {
      const entidades: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      };
      return entidades[caractere];
    });

    const { error } = await this.resend.emails.send({
      from,
      to: para,
      subject: 'Nova tarefa criada',
      html: `<p>Sua tarefa <b>${tituloSeguro}</b> foi criada.</p>`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}