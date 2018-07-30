import { Component, Injectable, OnInit } from "@angular/core";

@Injectable()
export abstract class RootComponent implements OnInit {
  protected logging = true;
  protected loading = false;

  ngOnInit() {}

  asyncBegin() {
    this.loading = true;
  }
  asyncEnd() {
    this.loading = false;
  }

  handleSuccess(message: string, keep?: boolean, navURL?: string) {
    this.printLog(message);
    this.loading = false;
  }

  handleError(error: string) {
    this.printError(error);
    this.loading = false;
  }

  printLog(message: any) {
    if (this.logging) {
      console.log(message);
    }
  }

  printError(message: any) {
    if (this.logging) {
      console.error(message);
    }
  }
}
