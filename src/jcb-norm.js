import { LitElement, css, html } from 'lit'

export class Norm extends LitElement {

   static get properties() {
      return {
         domain: {type: Object},
         norm: { type: Object },
         value: { type: Number },
         colorInf: { type: String },
         colorNormal: { type: String },
         colorSup: { type: String },
      }
   }

   constructor() {
      super()
      // default values - before override by attributes
      this.domain = { inf: 0., sup: 100. }
      this.norm = { inf: 40., sup: 60. }
      this.value = 50.
      this.colorInf = '#51AEE9'
      this.colorNormal = '#9FCE65'
      this.colorSup = '#F6C242'
   }
      
   // domain.inf -> 0%, domain.sup -> 100%
   valueToPercentage(value) {
      return ((value - this.domain.inf) / (this.domain.sup - this.domain.inf) * 100.).toPrecision(3)
   }

   get normInf() {
      return this.norm.inf.toPrecision(3)
   }

   get normSup() {
      return this.norm.sup.toPrecision(3)
   }

   // Percentage value for norm.inf
   // domain.inf -> 0%, domain.sup -> 100%
   get normInfPercentage() {
      return this.valueToPercentage(this.norm.inf)
   }
   
   // Percentage value for norm.sup
   // domain.inf -> 0%, domain.sup -> 100%
   get normSupPercentage() {
      return this.valueToPercentage(this.norm.sup)
   }

   get normTypicalPercentage() {
      return this.valueToPercentage(this.norm.typical)
   }

   render() {
      console.log('domain', this.domain)
      console.log('norm', this.norm)
      return html`
         <!-- bar with color gradients -->
         <div style="height: 50%; position: relative; top: 25%; background: linear-gradient(to right, ${this.colorInf} 0%, ${this.colorNormal} ${this.normInfPercentage}%, ${this.colorNormal} ${this.normSupPercentage}%, ${this.colorSup} 100%);">
            <!-- inf norm text -->
            <span style="position: relative; top: -50%; left: ${this.normInfPercentage}%; color: ${this.colorInf};">${this.normInf}</span>
            <!-- typical norm text -->
            ${this.norm.typical
               ? html`<span style="position: relative; top: -50%; left: ${this.normTypicalPercentage}%; color: ${this.colorNormal};">${this.normTypicalPercentage}</span>`
               : ''}
            <!-- sup norm text -->
            <span style="position: relative; top: -50%; left: ${this.normSupPercentage}%; color: ${this.colorSup};">${this.normSup}</span>

            <!-- value triangle -->
            <polygon points="50 15, 100 100, 0 100"/>
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
      `
   }
}

window.customElements.define('jcb-norm', Norm)
