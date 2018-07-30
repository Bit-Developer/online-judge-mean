import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-wysiwyg-editor",
  templateUrl: "./wysiwyg-editor.component.html"
})
export class WysiwygEditorComponent implements OnInit {
  // configuration of rich text editor(ngx-editor)
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: "10rem",
    minHeight: "5rem",
    width: "auto",
    minWidth: "0",
    translate: "no",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    imageEndPoint: "",
    toolbar: [
      [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "superscript",
        "subscript"
      ],
      ["fontName", "fontSize", "color"],
      [
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "indent",
        "outdent"
      ],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      [
        "paragraph",
        "blockquote",
        "removeBlockquote",
        "horizontalLine",
        "orderedList",
        "unorderedList"
      ],
      ["link", "unlink", "image", "video"]
    ]
  };

  constructor() {}

  ngOnInit() {}

  @Input() htmlContent: string;
}
