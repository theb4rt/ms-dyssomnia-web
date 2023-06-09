import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';
import * as moment from 'moment';
import { XmlToJson } from './nikto';
import { WebhookService } from '../services/webhook.service';

@Injectable()
export class NiktoService {
  private timeout: number;
  private extraOptions: object;
  private data: object;
  private tuning: string;
  private _targetUrl: string;
  private _maxTime?: number;
  private outputFormat: string;
  private reportDirectory: string;
  private configFile: string;
  private _userId: string;

  constructor(
    private readonly xmlToJson: XmlToJson,
    private readonly webhookService: WebhookService,
  ) {
    this.timeout = 3;
    this.tuning = '123489abc';
    this._maxTime = 300;
    this._targetUrl = '';
    this.outputFormat = 'xml';
    this._userId = '';
    this.reportDirectory = path.resolve(__dirname, '..', '..', 'reports');
    this.configFile = path.resolve(
      __dirname,
      '..',
      '..',
      'config_files',
      'nikto.conf',
    );
  }

  get targetUrl(): string {
    return this._targetUrl;
  }

  set targetUrl(value: string) {
    this._targetUrl = value;
  }

  get maxTime(): number {
    return this._maxTime;
  }

  set maxTime(value: number) {
    this._maxTime = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  async runNikto(): Promise<boolean> {
    const command = 'nikto';
    this.configureMaxTime();
    const nameFileOutput =
      this.targetUrl.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '') +
      '-' +
      this.getCurrentDate() +
      '.' +
      this.outputFormat;
    const args = [
      '-h',
      this.targetUrl,
      '-Tuning',
      this.tuning,
      '-timeout',
      this.timeout.toString(),
      '-Format',
      this.outputFormat,
      '-o',
      path.resolve(this.reportDirectory, nameFileOutput),
      '-config',
      this.configFile,
      ...(this._maxTime === null ? [] : ['-maxtime', this._maxTime.toString()]),
    ];

    const process = spawn(command, args);
    console.log('Nikto scan started for ' + this.targetUrl);
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    // process.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });
    process.on('close', async (code) => {
      if (code !== 0) {
        console.log(`nikto process exited with code ${code}`);
      }
      const xmlFilePath = path.resolve(this.reportDirectory, nameFileOutput);
      try {
        const dataFromXml = await this.xmlToJson.convert(xmlFilePath);
        dataFromXml.host = this.targetUrl;
        dataFromXml.user_id = this.userId;
        console.log('Sending data to the webhook');
        await this.webhookService.sendWebhookNikto('web/nikto', dataFromXml);
      } catch (error) {
        console.error('Error converting XML to JSON:', error);
      }
    });

    return true;
  }

  getCurrentDate(): string {
    return moment().format('YYYY-MM-DD-HH-mm-ss');
  }

  configureMaxTime = () => {
    if (this._maxTime === undefined) {
      this.maxTime = 10;
    } else if (this._maxTime === -1) {
      this.maxTime = null;
    }
  };
}
