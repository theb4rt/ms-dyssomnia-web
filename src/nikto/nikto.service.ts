import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';
import * as moment from 'moment';
import { XmlToJson } from './nikto';

@Injectable()
export class NiktoService {
  private timeout: number;
  private extraOptions: object;
  private data: object;
  private tuning: string;
  private _targetUrl: string;
  private maxTime: number;
  private outputFormat: string;
  private reportDirectory: string;

  constructor(private readonly xmlToJson: XmlToJson) {
    this.timeout = 3;
    this.tuning = '123489abc';
    this.maxTime = 30;
    this._targetUrl = '';
    this.outputFormat = '.xml';
    this.reportDirectory = path.resolve(__dirname, '..', '..', 'reports');
  }

  get targetUrl(): string {
    return this._targetUrl;
  }

  set targetUrl(value: string) {
    this._targetUrl = value;
  }
  async runNikto(): Promise<string> {
    const command = 'nikto';
    const nameFileOutput =
      this.targetUrl.replace(/(^\w+:|^)\/\//, '') +
      this.getCurrentDate() +
      this.outputFormat;
    const args = [
      '-h',
      this.targetUrl,
      '-Tuning',
      this.tuning,
      '-timeout',
      this.timeout.toString(),
      '-maxtime',
      this.maxTime.toString(),
      '-Format',
      this.outputFormat,
      '-o',
      path.resolve(this.reportDirectory, nameFileOutput),
    ];

    const process = spawn(command, args);
    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
     });
    process.on('close', async (code) => {
      if (code !== 0) {
        console.log(`nikto process exited with code ${code}`);
      }
      const xmlFilePath = path.resolve(this.reportDirectory, nameFileOutput);
      try {
        const jsonData = await this.xmlToJson.convert(xmlFilePath);
        console.log(jsonData);
      } catch (error) {
        console.error('Error converting XML to JSON:', error);
      }
    });

    return 'Nikto scan started.';
  }

  getCurrentDate(): string {
    return moment().format('YYYY-MM-DD-HH-mm-ss');
  }
}
