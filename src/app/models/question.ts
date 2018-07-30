export class Question {
  constructor(
    public _id: string,
    public uniquename: string,
    public sequence: number,
    public title: string,
    public description: string,
    public mainfunction: string,
    public jsmain: string,
    public pythonmain: string,
    public solution: string,
    public difficulty: number,
    public frequency: number,
    public rating: number,
    public hints: string
  ) {}
}
