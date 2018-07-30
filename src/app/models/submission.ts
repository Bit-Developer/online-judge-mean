export class Submission {
  constructor(
    public _id: string,
    public username: string,
    public questionname: string,
    public language: string,
    public solution: string,
    public status: string, // initial: not submitted, pass, fail
    public timeupdated: Date,
    public timesubmitted: Date,
    public runtime: number
  ) {}
}
