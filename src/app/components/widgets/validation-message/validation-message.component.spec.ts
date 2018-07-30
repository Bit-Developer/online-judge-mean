import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ValidationMessageComponent } from "./validation-message.component";

describe("ValidationMessageComponent", () => {
  let component: ValidationMessageComponent;
  let fixture: ComponentFixture<ValidationMessageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ValidationMessageComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
