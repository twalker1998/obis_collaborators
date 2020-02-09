import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUCN } from '../../shared/models/php/iucn';
import { Nativity } from '../../shared/models/php/nativity';
import { OccurrenceData } from '../../shared/models/occurrence-data';
import { OkSwap } from '../../shared/models/php/ok-swap';
import { Ranks } from '../../shared/models/php/ranks';
import { Statuses } from '../../shared/models/php/statuses';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  baseUrl = 'http://obsvweb1.ou.edu/obis_db_scripts/';

  constructor(private httpClient: HttpClient) { }

  getOccurrenceData(sname: string) {
    return this.httpClient.get<OccurrenceData>(this.baseUrl + 'occurrence-table.php?sname=' + sname);
  }

  isAcodeUnique(acode: string) {
    return this.httpClient.get(this.baseUrl + 'check-acode.php?acode=' + acode);
  }

  doesFamilyExist(family: string) {
    return this.httpClient.get(this.baseUrl + 'check-family.php?family=' + family);
  }

  getIUCNCodes() {
    return this.httpClient.get<IUCN>(this.baseUrl + 'iucn.php');
  }

  getNativities() {
    return this.httpClient.get<Nativity>(this.baseUrl + 'nativity.php');
  }

  getSwaps() {
    return this.httpClient.get<OkSwap>(this.baseUrl + 'swap.php');
  }

  getRanks() {
    return this.httpClient.get<Ranks>(this.baseUrl + 'ranks.php');
  }

  getStatuses() {
    return this.httpClient.get<Statuses>(this.baseUrl + 'statuses.php');
  }
}
