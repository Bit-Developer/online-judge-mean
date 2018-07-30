export class TextUtil {
  static isJson(val: any) {
    if (val) {
      if (
        /^[\],:{}\s]*$/.test(
          val
            .replace(/\\["\\\/bfnrtu]/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        return true;
      }
    }
    return false;
  }
}
