import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class NiktoService {
  private timeout: number;
  private extraOptions: object;
  private data: object;
  private tuning: string;
  private _targetUrl: string;

  constructor() {
    this.timeout = 3;
    this.tuning = '123489abc';
    this._targetUrl = '';
  }

  get targetUrl(): string {
    return this._targetUrl;
  }

  set targetUrl(value: string) {
    this._targetUrl = value;
  }
  async runNikto(): Promise<string> {
    const command = 'nikto';
    const args = [
      '-h',
      this.targetUrl,
      '-Tuning',
      this.tuning,
      '-timeout',
      `${this.timeout}`,
    ];

    const process = spawn(command, args);

    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        console.log(`nikto process exited with code ${code}`);
      }
    });

    return 'Nikto scan started.';
  }
}
