import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: "app-widget-result-panel",
  templateUrl: "./result-panel.component.html"
})
export class ResultPanelComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() testResult: number;
  @Output() testResultChange = new EventEmitter<number>();
  @Input() resultMessage: string;

  close() {
    this.testResult = -1;
    this.testResultChange.emit(-1);
  }

  getInput() {
    if (this.resultMessage) {
      let strs = this.resultMessage.split(";");
      return strs[0];
    }
  }
  getYourAnswer() {
    if (this.resultMessage) {
      let strs = this.resultMessage.split(";");
      return strs[1];
    }
  }
  getExpectedAnswer() {
    if (this.resultMessage) {
      let strs = this.resultMessage.split(";");
      return strs[2];
    }
  }
}
