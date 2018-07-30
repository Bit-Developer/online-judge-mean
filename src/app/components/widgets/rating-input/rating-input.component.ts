import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import {
  ControlValueAccessor,
  ControlContainer,
  AbstractControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: "app-widget-rating-input",
  templateUrl: "./rating-input.component.html",
  styleUrls: ["./rating-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor, OnInit {
  @Input() formControlName: string;

  public control: AbstractControl;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.control = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn(
          "Missing FormControlName directive from host element of the component"
        );
      }
    } else {
      console.warn("Can't find parent FormGroup directive");
    }
  }

  stars: boolean[] = Array(5).fill(false);

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding("style.opacity")
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // Function to call when the rating changes.
  onChange = (rating: number) => {};

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {};

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => rating > i);
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
