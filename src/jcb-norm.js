import { LitElement, css, html } from 'lit'

export class Norm extends LitElement {

   static get properties() {
      return {
         domain: {type: Object},
         norm: { type: Object },
         value: { type: Number },
         colorLow: { type: String },
         colorNormal: { type: String },
         colorHigh: { type: String },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.domain = { inf: 0., sup: 100. }
      this.norm = { d1: 40., d2: 60., dt1: 5., dt2: 5., h: 0. }
      this.value = 50.
      this.colorLow = '#51AEE9'
      this.colorNormal = '#9FCE65'
      this.colorHigh = '#F6C242'
   }
   
   get lowPercentage() {
      return (this.norm.inf - this.domain.inf) / (this.domain.sup - this.domain.inf) * 100.
   }
   
   get highPercentage() {
      return (this.norm.sup - this.domain.inf) / (this.domain.sup - this.domain.inf) * 100.
   }

   render() {
      return html`
         <div style="background: linear-gradient(to right, ${this.colorLow} 0%, ${this.colorNormal} ${this.lowPercentage.toPrecision(3)}%, ${this.colorNormal} ${this.highPercentage.toPrecision(3)}%, ${this.colorHigh} 100%);">
            <div id="myBar"></div>
            <div style="position: absolute; left: ${this.highPercentage}%">${this.highPercentage}</div>
            
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
         }
         
         #myBar {
            height: 10px;
         }
      `
   }
}

window.customElements.define('jcb-norm', Norm)
