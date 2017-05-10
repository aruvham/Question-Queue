import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import TagArray from './TagArray.jsx';

const roles = ['admin', 'student'];

class QuestionFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionText: this.props.question ? this.props.question.questionText : '',
      codeSnippet: this.props.question ? this.props.question.codeSnippet : '',
      roles: roles,
      appliedTags: this.props.question ? this.props.question.tags : [],
      dialogOpen: false,
      showCode: false,
      showButtonText: this.props.question ? 'Show Code' : 'Add some code',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleCode = this.toggleCode.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }


  handleTagAdd(tag) {
    const appliedTags = this.state.appliedTags;
    if (appliedTags.includes(tag)) return;
    this.setState({ pendingTag: tag });
    if (!this.state.allTags.includes(tag)) {
      if (this.props.user.role === 'admin') {
        this.openDialog();
        return;
      }
      return;
    }
    this.confirmNewTag();
  }

  confirmNewTag() {
    const tag = this.state.pendingTag;
    const appliedTags = this.state.appliedTags;
    appliedTags.push(tag);
    // add tag to list of available tags if not present
    const allTags = this.state.allTags;
    if (!allTags.includes(tag)) allTags.push(tag);
    this.setState({ appliedTags, allTags });
    this.refs.tagBar.setState({ searchText: '' });
  }

  handleTagDelete(tag) {
    const appliedTags = this.state.appliedTags;
    const tagToDelete = appliedTags.indexOf(tag);
    appliedTags.splice(tagToDelete, 1);
    this.setState({ appliedTags });
  }

  openDialog() { this.setState({ dialogOpen: true }); }
  closeDialog() { this.setState({ dialogOpen: false }); }
  toggleCode() {
    const showCode = !this.state.showCode;
    this.setState({ showCode });
  }

  handleSubmit(event) {
    event.preventDefault();
    // don't add a snippet if user has not modified code editor
    let codeSnippet = this.state.codeSnippet;
    if (codeSnippet === '') codeSnippet = '';
    this.props.handleSubmit(this.state.questionText,
                            codeSnippet,
                            this.state.appliedTags);
    this.setState({
      questionText: '',
      codeSnippet: '',
      appliedTags: [],
      showCode: false,
    });
    this.refs.tagBar.setState({ searchText: '' });
  }
  handleEdit(event) {
    event.preventDefault();
    const question = this.props.question;
    question.questionText = this.state.questionText;
    question.codeSnippet = this.state.codeSnippet;
    question.tags = this.state.appliedTags;
    this.props.handleEdit(question);
  }

  render() {
    // options for dialog pop-up
    // there may be a better place to put these
    const dialogActions = [
      <FlatButton
      label="Cancel"
      onTouchTap={this.closeDialog}
      />,
      <FlatButton
      label="Yes, create tag"
      onTouchTap={() => {
        this.confirmNewTag();
        this.closeDialog();
      }}
      primary={true}
      />,
    ];

    const codeZone = (
      <CodeZone
        name="codeSnippet"
        display={this.state.showCode ? 'block' : 'none'}
        onChange={this.handleInputChange}
        codeSnippet={this.state.codeSnippet}
        value = {this.state.codeSnippet}
      />
    );

    return (
      <Paper className="admin-form" >
        <form onSubmit={this.props.handleEdit ? this.handleEdit : this.handleSubmit} >
          <div>
            <TextField
              name="questionText"
              className="question-text-form"
              fullWidth={true}
              value={this.state.questionText}
              multiLine={true}
              floatingLabelText="Ask a question..."
              onChange={this.handleInputChange} />
            <FlatButton onClick={this.toggleCode}
              label= {this.state.showCode ? 'Hide Code' : this.state.showButtonText} />
            {this.state.showCode ? codeZone : null}
            <br/>
            <AutoComplete
              ref="tagBar"
              floatingLabelText="Add tags..."
              filter={AutoComplete.fuzzyFilter}
              dataSource={allTags}
              onNewRequest={chosenRequest => this.handleTagAdd(chosenRequest)}
              maxSearchResults={5}/>
            <TagArray
              tags={this.state.appliedTags}
              handleTagDelete={this.handleTagDelete} />
            </div>
            <RaisedButton type="submit" className="submit-button" disabled={!this.state.questionText} label="Submit" />
        </form>
        <Dialog
          actions={dialogActions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.closeDialog}
          >Are you sure you want to create a new tag?
        </Dialog>
      </Paper>
    );
  }
}

export default QuestionFormComponent;
