import { Injectable } from '@nestjs/common';
import { parseString } from 'xml2js';
import * as fs from 'fs';
@Injectable()
export class Nikto {}
@Injectable()
export class XmlToJson {
  async convert(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, xmlData) => {
        if (err) {
          reject(err);
        } else {
          parseString(xmlData, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  }
}
