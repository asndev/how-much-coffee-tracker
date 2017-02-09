import React from 'react';

// Starting with 'on' followed by a capital letter (onClick).
const handlerName = /^on[A-Z]/;

export default class BoundComponent extends React.Component {
    constructor(props) {
        super(props);
        // Set the scope for each handler class method.
        const properties =
          Object.getOwnPropertyNames(this.constructor.prototype);
        for (const propertyName of properties) {
            if (typeof this[propertyName] === 'function' &&
              handlerName.test(propertyName)) {
                this[propertyName] = this[propertyName].bind(this);
            }
        }
    }
}
