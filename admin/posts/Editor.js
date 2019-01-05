// @flow
import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

type $Props = {
  setFieldValue: function,
};
type $State = { editorState: Function };

class Wysiwyg extends Component<$Props, $State> {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange: Function = editorState => {
    this.setState(
      {
        editorState
      },
      () =>
        this.props.setFieldValue(
          "content",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        )
    );
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default Wysiwyg;
