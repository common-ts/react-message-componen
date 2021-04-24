import * as H from 'history';
import * as React from 'react';

export interface ErrorMessage {
  field: string;
  code: string;
  param?: string|number|Date;
  message?: string;
}
export interface HistoryProps {
  location: H.Location;
  history: H.History;
}
export interface MessageState {
  message: string;
}
export class MessageComponent<W extends HistoryProps, I extends MessageState> extends React.Component<W, I> {
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.name = this.name.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateFlatState = this.updateFlatState.bind(this);
    this.showError = this.showError.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.ref = React.createRef();
  }
  protected _name = 'user';
  protected ref: any;
  protected form: any;
  protected alertClass = '';
  protected running: boolean;

  protected back(event: any): void {
    if (event) {
      event.preventDefault();
    }
    this.props.history.goBack();
  }
  protected name(): string {
    return this._name;
  }
  protected updateFlatState(e: any): void {
    const ctrl = e.currentTarget;
    const objSet = {};
    const n = ctrl.name;
    objSet[n] = ctrl.value;
    this.setState(objSet);
  }
  protected updateState(e: any): void {
    const n = this.name();
    const ctrl = e.currentTarget;
    const ex = this.state[n];
    const model = Object.assign({}, ex);
    model[ctrl.name] = ctrl.value;
    const objSet = {};
    objSet[n] = model;
    this.setState(objSet);
  }
  protected showMessage = (msg: string) => {
    this.alertClass = 'alert alert-info';
    this.setState({ message: msg });
  }
  protected showError = (msg: string|ErrorMessage[]) => {
    this.alertClass = 'alert alert-error';
    if (typeof msg === 'string') {
      this.setState({ message: msg });
    } else if (Array.isArray(msg) && msg.length > 0) {
      this.setState({ message: msg[0].message });
    } else {
      const x = JSON.stringify(msg);
      this.setState({ message: x });
    }
  }
  protected hideMessage = () => {
    this.alertClass = '';
    this.setState({ message: '' });
  }
}
