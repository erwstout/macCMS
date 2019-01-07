// @flow
import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

type $Props = {
  setFieldValue: function,
  value: string
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
    const {value} = this.props
    return (
      <div>
        <Editor
          editorState={value === '' || value === '<p></p>' ? EditorState.createEmpty() : editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default Wysiwyg;
