import { LitElement, css, html } from 'lit'

export class Norm extends LitElement {

   static get properties() {
      return {
         domain: {type: Object},
         norm: { type: Object },
         value: { type: Number },
         infColor: { type: String },
         normalColor: { type: String },
         supColor: { type: String },
         valueColor: { type: String },
         infText: { type: String },
         supText: { type: String },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.domain = { inf: 0., sup: 100. }
      this.norm = { inf: 40., sup: 60. }
      this.value = 50.
      this.infColor = '#51AEE9'
      this.normalColor = '#9FCE65'
      this.supColor = '#F6C242'
      this.valueColor = "#ED702D"
      this.infText = null
      this.supText = null
   }
      
   // domain.inf -> 0%, domain.sup -> 100%
   valueToPercentage(value) {
      return ((value - this.domain.inf) / (this.domain.sup - this.domain.inf) * 100.).toPrecision(3)
   }

   // values to display, with 3-digit precision and trailing zeros removed
   get normInf() {
      return this.norm.inf.toPrecision(3).replace(/(\.\d*?[1-9])0+$/, '$1'); 
   }
   get normSup() {
      return this.norm.sup.toPrecision(3).replace(/(\.\d*?[1-9])0+$/, '$1'); 
   }
   get normTypical() {
      return this.norm.typical.toPrecision(3).replace(/(\.\d*?[1-9])0+$/, '$1'); 
   }
   get val() {
      return this.value.toPrecision(3).replace(/(\.\d*?[1-9])0+$/, '$1'); 
   }

   // inf / sup / typical / val in percentage of the bar width
   get normInfPercentage() {
      return this.valueToPercentage(this.norm.inf)
   }
   get normSupPercentage() {
      return this.valueToPercentage(this.norm.sup)
   }
   get normTypicalPercentage() {
      return this.valueToPercentage(this.norm.typical)
   }
   get valuePercentage() {
      return this.valueToPercentage(this.value)
   }

   render() {
      return html`
         <!-- bar with color gradients -->
         <div style="height: 50%; position: relative; top: 25%; background: linear-gradient(to right, ${this.infColor} 0%, ${this.normalColor} ${this.normInfPercentage}%, ${this.normalColor} ${this.normSupPercentage}%, ${this.supColor} 100%);">

            <!-- inf norm text -->
            <span style="position: relative; top: -50%; left: ${this.normInfPercentage}%; color: ${this.infColor};">${this.normInf}</span>

            <!-- optional typical value text -->
            ${this.norm.typical
               ? html`<span style="position: relative; top: -50%; left: ${this.normTypicalPercentage}%; color: ${this.normalColor};">${this.normTypical}</span>`
               : ''}

            <!-- sup norm text -->
            <span style="position: relative; top: -50%; left: ${this.normSupPercentage}%; color: ${this.supColor};">${this.normSup}</span>

            <!-- value triangle -->
            <div class="triangle" style="position: relative; left: ${this.valuePercentage}%; border-bottom-color: ${this.valueColor};">
               <span style="position: relative; top: 25px; left: -10px; color: ${this.valueColor};">${this.val}</span>
            </div>

            <!-- optional text in inf part of norm -->
            ${this.infText
               ? html`<div style="position: relative; top: -100%; color: white; width: 100%; text-align: left;">${this.infText}</div>`
               : ''}
            <!-- optional text in sup part of norm -->
            ${this.supText
               ? html`<div style="position: relative; top: -100%; color: white; width: 100%; text-align: right;">${this.supText}</div>`
               : ''}
            </div>
      `
   }

   static get styles() {
      return css`
         /* :host selects the host element (<jcb-norm>, not its shadow dom) */
         :host {
            display: inline-block; /* by default a CE is inline and width & height do not apply */
            width: 100%; /* <jcb-norm> takes full parent width */
            height: 100%; /* <jcb-norm> takes full parent height */
            font-family: var(--jcb-norm-font-family, Arial);
            font-size: var(--jcb-norm-font-size, 14px);
         }
         .triangle {
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid red;
        }
      `
   }
}

window.customElements.define('jcb-norm', Norm)
