import ReactFireMixin from 'reactfire';

const ReactFire = ParentComponent => class extends ParentComponent {
  static displayName = 'ReactFire' +
    (ParentComponent.displayName || 'ExtendedComponent');

  constructor(props) {
    super(props);
    // properties should be:
    // componentWillMount, componentWillUnmount,
    // bindAsArray, bindAsObject, unbind

    for (let property in ReactFireMixin) {
      if (ReactFireMixin.hasOwnProperty(property)) {
        let value = ReactFireMixin[property];
        if (property in this) {
          let method = this[property].bind(this);
          let rfMethod = ReactFireMixin[property].bind(this);
          value = (function(...args) {
            method(...args);
            rfMethod(...args);
          });
        }
        Object.defineProperty(this, property, {value: value.bind(this)});
      }
    }
  }
};

export default ReactFire;
