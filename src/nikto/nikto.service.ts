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
  private _maxTime?: number;
  private outputFormat: string;
  private reportDirectory: string;
  private configFile: string;

  constructor(private readonly xmlToJson: XmlToJson) {
    this.timeout = 3;
    this.tuning = '123489abc';
    this._maxTime = 30;
    this._targetUrl = '';
    this.outputFormat = 'xml';
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

  async runNikto(): Promise<string> {
    const command = 'nikto';
    this.configureMaxTime();
    const nameFileOutput =
      this.targetUrl.replace(/(^\w+:|^)\/\//, '') +
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
        console.log(JSON.stringify(jsonData, null, 2));
      } catch (error) {
        console.error('Error converting XML to JSON:', error);
      }
    });

    return 'Nikto scan started.';
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
