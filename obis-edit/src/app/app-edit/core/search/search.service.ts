import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../api/api.service';
import { ResultsService } from '../results/results.service';

import { Api_Response } from '../../../shared/models/api_response';
import { Acctax } from '../../../shared/models/acctax';
import { Comtax } from '../../../shared/models/comtax';
import { Syntax } from '../../../shared/models/syntax';
import { Hightax } from '../../../shared/models/hightax';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private response: Api_Response;
  private results: Array<Acctax | Comtax | Syntax> = [];
  private querySource: BehaviorSubject<string> = new BehaviorSubject<string>("");
  query = this.querySource.asObservable();

  constructor(private apiService: ApiService, private resultsService: ResultsService) { }

  get(acode: string, array: Array<Acctax | Comtax | Syntax> = this.results): Acctax | Comtax | Syntax {
    for(let r of array) {
      if(r.acode === acode) {
        return r;
      }
    }

    return null;
  }

  get_results(): Array<Acctax | Comtax | Syntax> {
    return this.results;
  }

  set_results(results: Array<Acctax | Comtax | Syntax>): void {
    this.results = results;
  }

  extract_acode(raw_acode: string): string {
    if(raw_acode.lastIndexOf("http", 0) === 0) {
      let url_arr = raw_acode.split("/");
      return url_arr[url_arr.length - 2];
    } else {
      return raw_acode;
    }
  }

  async query_api(query: string) {
    this.updateQuery(query);

    this.results = new Array<Acctax | Comtax | Syntax>();

    this.response = await this.apiService.get_query("acctax", "sname", query);

    await this.parse_response(this.response, 0, "acctax");

    this.response = await this.apiService.get_query("syntax", "sname", query);

    await this.parse_response(this.response, 0, "syntax");

    this.response = await this.apiService.get_query("comtax", "vernacularname", query);

    await this.parse_response(this.response, 0, "comtax");

    this.results.sort(this.compare);

    this.get_taxa_strings().then(() => this.resultsService.isQueryComplete.next(true));

    this.response = null;
  }

  async parse_response(response: Api_Response, count: number, type: string) {
    var new_count = (response.count - response.results.length) - count;
    var next_url = response.next;

    for(let result of response.results) {
      if(type == "acctax") {
        result = <Acctax>result;
        result.acode = this.extract_acode(result.acode);
        result.type = "acctax";
        result.display_name = result.sname;
      } else if(type == "comtax") {
        result = <Comtax>result;
        result.acode = this.extract_acode(result.acode);
        result.type = "comtax";
        result.display_name = result.vernacularname;
        result.vname = result.vernacularname;
      } else if(type == "syntax") {
        result = <Syntax>result;
        result.acode = this.extract_acode(result.acode);
        result.type = "syntax";
        result.display_name = result.sname;
      }

      if(!this.resultsService.contains(this.results, result)) {
        this.results.push(result);
      }

      count++;
    }

    if(new_count > 0) {
      next_url = next_url.replace("http", "https");

      this.response = await this.apiService.get_url_promise(next_url, "api_response");

      await this.parse_response(this.response, count, type);
    }
  }

  compare(a: Acctax | Syntax | Comtax, b: Acctax | Syntax | Comtax) {
    if((a.type === 'acctax' || a.type === 'syntax') && (b.type === 'acctax' || b.type === 'syntax')) {
      a = <Acctax | Syntax>(a);
      b = <Acctax | Syntax>(b);

      if(a.sname < b.sname) {
        if(a.family == "Terrestrial Community" || a.family == "National Vegetation Classification" || a.family == "Subterranean Community" || a.family == "Freshwater Community" || a.family == "Animal Assemblage") {
          return 1;
        }

        return -1;
        } else if(a.sname > b.sname) {
          if(b.family == "Terrestrial Community" || b.family == "National Vegetation Classification" || b.family == "Subterranean Community" || b.family == "Freshwater Community" || b.family == "Animal Assemblage") {
            return -1;
          }

          return 1;
        } else {
          if(a.family == "Terrestrial Community" || a.family == "National Vegetation Classification" || a.family == "Subterranean Community" || a.family == "Freshwater Community" || a.family == "Animal Assemblage") {
            return 1;
          }

          if(b.family == "Terrestrial Community" || b.family == "National Vegetation Classification" || b.family == "Subterranean Community" || b.family == "Freshwater Community" || b.family == "Animal Assemblage") {
            return -1;
          }

          return 0;
      }
    } else if(a.type === 'comtax' && b.type === 'comtax') {
      a = <Comtax>(a);
      b = <Comtax>(b);

      if(a.vname < b.vname) {
        return -1;
      } else if(a.vname > b.vname) {
        return 1;
      } else {
        return 0;
      }
    } else if((a.type === 'acctax' || a.type === 'syntax') && b.type === 'comtax') {
      a = <Acctax | Syntax>(a);

      if(a.family == "Terrestrial Community" || a.family == "National Vegetation Classification" || a.family == "Subterranean Community" || a.family == "Freshwater Community" || a.family == "Animal Assemblage") {
        return 1;
      }

      return -1;
    } else if(a.type === 'comtax' && (b.type === 'acctax' || b.type === 'syntax')) {
      b = <Acctax | Syntax>(b);

      if(b.family == "Terrestrial Community" || b.family == "National Vegetation Classification" || b.family == "Subterranean Community" || b.family == "Freshwater Community" || b.family == "Animal Assemblage") {
        return -1;
      }

      return 1;
    }
  }

  get_taxa_strings() {
    return new Promise((resolve, reject) => {
      for(let r of this.results) {
        let url: string;
        let family: string;
        let sname: string;

        if(r.type === 'acctax') {
          r = <Acctax>(r);
          family = r.family;
          sname = r.sname;
          url = "https://obis.ou.edu/api/obis/hightax/" + family + "/?format=json";

          this.apiService.get_url(url, "hightax").subscribe((response: Hightax) => {
            if(response.kingdom) {
              r.taxa = response.kingdom + " > " + response.phylum + " > " + response.taxclass + " > " + response.taxorder + " > " + family + " > " + sname;
            } else {
              r.taxa = "community";
            }
          }, error => reject(new Error(error))
          );
        } else if(r.type === 'comtax' || r.type === 'syntax') {
          let acode_url = "https://obis.ou.edu/api/obis/acctax/" + r.acode + "/";
          this.apiService.get_url(acode_url, "acctax").subscribe((response: Acctax) => {
            family = response.family;
            sname = response.sname;
            url = "https://obis.ou.edu/api/obis/hightax/" + family + "/?format=json";

            this.apiService.get_url(url, "hightax").subscribe((response: Hightax) => {
              if(response.kingdom) {
                r.taxa = response.kingdom + " > " + response.phylum + " > " + response.taxclass + " > " + response.taxorder + " > " + family + " > " + sname;
              } else {
                r.taxa = "community";
              }
            }, error => reject(new Error(error))
            );
          }, error => reject(new Error(error))
          );
        }
      }

      resolve();
    });
  }

  updateQuery(query: string) {
    this.querySource.next(query);
  }
}